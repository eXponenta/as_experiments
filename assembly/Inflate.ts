const WINDOW_SIZE: u32 = 32768;
const WINDOW_SHIFT_POSITION: u32 = 65536;
const MAX_WINDOW_SIZE: u32 = WINDOW_SHIFT_POSITION + 258; /* plus max copy len */

export const enum ERROR_CODES {
	NONE = 0,
	ZLIB_UNKNOW_HEADER = 1,
	ZLIB_INVALID_FCHECK = 2,
	ZLIB_INVALID_FDICT = 3,
	BLOCK_INVALID_TYPE = 4,
	BLOCK_INVALID_LEN = 5,

	ZLIB_UNVALID_ENCODING = 6,
}

export const enum InflateState {
	INIT = 0,
	BLOCK_0 = 1,
	BLOCK_1 = 2,
	BLOCK_2_PRE = 3,
	BLOCK_2 = 4,
	DONE = 5,
	ERROR = 6,
	VERIFY_HEADER = 7,
	CLOSED = 8
}

@unmanaged
class HuffmanTable {
	constructor(public codes: Uint32Array, public maxBits: u32) {}
}

@unmanaged
class DeflateCopyState {
	constructor(
		public state: u8 = 0,
		public len: u32 = 0,
		public lenBits: u32 = 0,
		public dist: u32 = 0,
		public distBits: u32 = 0
	) {}
}

class DeflateBlock2State {
	numLiteralCodes: u32 = 0;
	numDistanceCodes: u32 = 0;
	codeLengthTable: HuffmanTable | null = null;
	bitLengths: Uint8Array | null = null;
	codesRead: u32 = 0;
	dupBits: u32 = 0;
}

const codeLengthOrder: StaticArray<u8> = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

var distanceCodes: Uint16Array;
var distanceExtraBits: Uint8Array;
var fixedDistanceTable: HuffmanTable;
var lengthCodes: Uint16Array;
var lengthExtraBits: Uint8Array;
var fixedLiteralTable: HuffmanTable;

var areTablesInitialized: boolean = false;

function initializeTables(): void {
	if(areTablesInitialized) return;
	areTablesInitialized = true;

	distanceCodes = new Uint16Array(30);
	distanceExtraBits = new Uint8Array(30);
	let code: u32 = 1;
	for (let i = 0, j = 0; i < 30; ++i) {
		distanceCodes[i] = code;

		j += i > 2 ? 1 : 0;

		let bit: u32 = ~~((j / 2) | 0);

		distanceExtraBits[i] = bit;
		code += 1 << bit;
	}

	var bitLengths = new Uint8Array(288);
	for (let i = 0; i < 32; ++i) {
		bitLengths[i] = 5;
	}
	fixedDistanceTable = makeHuffmanTable(bitLengths.subarray(0, 32));

	lengthCodes = new Uint16Array(29);
	lengthExtraBits = new Uint8Array(29);

	code = 3;
	for (let i:u32 = 0, j:u32 = 0; i < 29; ++i) {
		lengthCodes[i] = code - (i === 28 ? 1 : 0);

		j += i > 4 ? 1 : 0;

		let bit = ~~((j / 4) % 6);

		lengthExtraBits[i] = bit;
		code += 1 << bit;
	}
	for (let i = 0; i < 288; ++i) {
		bitLengths[i] = i < 144 || i > 279 ? 8 : i < 256 ? 9 : 7;
	}
	fixedLiteralTable = makeHuffmanTable(bitLengths);
}

function getMax(bitLengths: Uint8Array): u8 {
	let m: u8 = 0;
	let c: u8 = 0;
	for (let i = 0; i < bitLengths.length; i++) {
		c = unchecked(bitLengths[i]);
		if (c > m) m = c;
	}
	return m;
}

function makeHuffmanTable(bitLengths: Uint8Array): HuffmanTable {
	var maxBits: u8 = getMax(bitLengths);
	var numLengths: u32 = bitLengths.length;
	var size: u32 = 1 << maxBits;
	var codes = new Uint32Array(size);

	// avoiding len == 0: using max number of bits
	var dummyCode = (maxBits << 16) | 0xffff;
	for (let j: u32 = 0; j < size; j++) {
		codes[j] = dummyCode;
	}

	for (let code: u32 = 0, len: u8 = 1, skip = 2; len <= maxBits; code <<= 1, ++len, skip <<= 1) {
		for (let val: u32 = 0; val < numLengths; ++val) {
			if (bitLengths[val] === len) {
				let lsb: u32 = 0;
				for (let i: u8 = 0; i < len; ++i) lsb = lsb * 2 + ((code >> i) & 1);
				for (let i: u32 = lsb; i < size; i += skip) codes[i] = (<u32>len << 16) | val;
				++code;
			}
		}
	}

	return new HuffmanTable(codes, maxBits);
}

export class BasicInflate {
	private _buffer: Uint8Array = new Uint8Array(1);
	private _bufferSize: u32 = 0;
	private _bufferPosition: u32 = 0;
	private _bitBuffer: u32 = 0;
	private _bitLength: u32 = 0;
	private _window: Uint8Array = new Uint8Array(MAX_WINDOW_SIZE);
	private _windowPosition: u32 = 0;
	private _isFinalBlock: boolean = false;
	private _literalTable: HuffmanTable | null = null;
	private _distanceTable: HuffmanTable | null = null;
	private _block0Read: u32 = 0;
	private _block2State: DeflateBlock2State = new DeflateBlock2State();
	private _copyState: DeflateCopyState = new DeflateCopyState(0, 0, 0, 0, 0);

	public _state: InflateState = InflateState.VERIFY_HEADER;
	public _errorCode: ERROR_CODES = ERROR_CODES.NONE;

	private _target: Uint8Array | null = null;
	private _pos: u32 = 0;

	constructor() {
		initializeTables();
	}

	public onData(buff: Uint8Array): void {

		assert(buff.length + this._pos <= this._target!.length,
			"Buffer overflow! Target: "
			.concat(this._target!.length.toString())
			.concat(" expected:".concat(buff.length.toString()))
		);

		this._target!.set(buff, this._pos);
		this._pos += buff.byteLength;
	}

	private _processZLibHeader(buffer: Uint8Array, start: u32, end: u32): u32 {
		/* returns -1 - bad header, 0 - not enough data, 1+ - number of bytes processed */
		if (start + 2 > end) {
			return 0;
		}
		var header: u16 = (<u16>buffer[start] << 8) | <u16>buffer[start + 1];

		if ((header & 0x0f00) !== 0x0800) {
			this._errorCode = ERROR_CODES.ZLIB_UNKNOW_HEADER;
			return 0;
		} else if (header % 31 !== 0) {
			this._errorCode = ERROR_CODES.ZLIB_INVALID_FCHECK;
			return 0;
		} else if ((header & 0x20) !== 0) {
			this._errorCode = ERROR_CODES.ZLIB_INVALID_FDICT;
			return 0;
		}

		return 2;
	}

	public init(target: Uint8Array, checkHeader: bool): void {
		this.close();

		this._target = target;
		this._state = checkHeader ? InflateState.VERIFY_HEADER : InflateState.INIT;
		this._pos = 0;
	}

	public push(data: Uint8Array): void {
		assert(this._state !== InflateState.CLOSED, "init is required after close!");

		if (<u32>this._buffer.length < this._bufferSize + data.length) {
			var newBuffer = new Uint8Array(this._bufferSize + data.length);
			if (this._buffer) {
				newBuffer.set(this._buffer);
			}
			this._buffer = newBuffer;
		}
		this._buffer.set(data, this._bufferSize);
		this._bufferSize += data.length;
		this._bufferPosition = 0;

		var incomplete: bool = false;
		do {
			var lastPosition:u32 = this._windowPosition;

			if (this._state === InflateState.INIT) {
				incomplete = this._decodeInitState();
				if (incomplete) {
					break;
				}
			}

			//trace("Jump state:", 2, <f64>this._state, <f64> lastPosition);

			switch (this._state) {
				case InflateState.BLOCK_0:
					incomplete = this._decodeBlock0();
					break;
				case InflateState.BLOCK_2_PRE:
					incomplete = this._decodeBlock2Pre();
					if (incomplete) {
						break;
					}
				/* fall through */
				case InflateState.BLOCK_1:
				case InflateState.BLOCK_2:
					incomplete = this._decodeBlock();
					break;
				case InflateState.ERROR:
				case InflateState.DONE:
					// skipping all data
					this._bufferPosition = this._bufferSize;
					break;
				case InflateState.VERIFY_HEADER:
					var processed = this._processZLibHeader(this._buffer, this._bufferPosition, this._bufferSize);
					if (processed > 0) {
						this._bufferPosition += processed;
						this._state = InflateState.INIT;
					} else if (processed === 0) {
						incomplete = true;
					} else if(this._errorCode !== 0) {
						this._state = InflateState.ERROR;
					}
					break;
			}

			var decoded = this._windowPosition - lastPosition;
			if (decoded > 0) {
				this.onData(this._window.subarray(lastPosition, this._windowPosition));
			}
			if (this._windowPosition >= WINDOW_SHIFT_POSITION) {
				this._window.copyWithin(0, this._windowPosition - WINDOW_SIZE, this._windowPosition);

				this._windowPosition = WINDOW_SIZE;
			}
		} while (!incomplete && this._bufferPosition < this._bufferSize);

		if (this._bufferPosition < this._bufferSize) {
			// shift buffer
			this._buffer.copyWithin(0, this._bufferPosition, this._bufferSize);
			this._bufferSize -= this._bufferPosition;
		} else {
			this._bufferSize = 0;
		}
	}

	public close(): void {
		this._state = InflateState.CLOSED;
		this._pos = 0;
		this._errorCode = ERROR_CODES.NONE;
		this._bufferPosition = 0;
		this._bufferSize = 0;
		this._windowPosition = 0;
	}

	private _decodeInitState(): bool {
		if (this._isFinalBlock) {
			this._state = InflateState.DONE;
			return false;
		}

		var buffer = this._buffer,
			bufferSize = this._bufferSize;
		var bitBuffer = this._bitBuffer,
			bitLength = this._bitLength;
		var state: InflateState = InflateState.INIT;
		var position = this._bufferPosition;
		if (((bufferSize - position) << 3) + bitLength < 3) {
			return true;
		}
		if (bitLength < 3) {
			bitBuffer |= (<u32>buffer[position++]) << bitLength;
			bitLength += 8;
		}
		var type:u8 = <u8>(bitBuffer & 7);
		bitBuffer >>= 3;
		bitLength -= 3;
		switch (type >> 1) {
			case 0:
				bitBuffer = 0;
				bitLength = 0;
				if (bufferSize - position < 4) {
					return true;
				}

				var length:u16 = <u16>buffer[position] | (<u16>buffer[position + 1] << 8);
				var length2:u16 = <u16>buffer[position + 2] | (<u16>buffer[position + 3] << 8);
				position += 4;
				if ((length ^ length2) !== 0xffff) {
					this._errorCode = ERROR_CODES.BLOCK_INVALID_LEN;
					state = InflateState.ERROR;
					break;
				}

				if (length === 0) {
					state = InflateState.INIT;
				} else {
					this._block0Read = length;
					state = InflateState.BLOCK_0;
				}
				break;
			case 1:
				state = InflateState.BLOCK_1;
				this._literalTable = fixedLiteralTable;
				this._distanceTable = fixedDistanceTable;
				break;
			case 2:
				if (((bufferSize - position) << 3) + bitLength < 14 + 3 * 4) {
					return true;
				}
				while (bitLength < 14) {
					bitBuffer |= (<u32>buffer[position++]) << bitLength;
					bitLength += 8;
				}
				var numLengthCodes: u32 = ((bitBuffer >> 10) & 15) + 4;
				if (((bufferSize - position) << 3) + bitLength < 14 + 3 * numLengthCodes) {
					return true;
				}

				var numLiteralCodes: u32 = (bitBuffer & 31) + 257;
				var numDistanceCodes: u32 = ((bitBuffer >> 5) & 31) + 1;

				bitBuffer >>= 14;
				bitLength -= 14;
				var codeLengths = new Uint8Array(19);
				let i: u32 = 0;
				for (i = 0; i < numLengthCodes; ++i) {
					if (bitLength < 3) {
						bitBuffer |= (<u32>buffer[position++]) << bitLength;
						bitLength += 8;
					}
					codeLengths[codeLengthOrder[i]] = bitBuffer & 7;
					bitBuffer >>= 3;
					bitLength -= 3;
				}
				for (; i < 19; i++) {
					codeLengths[codeLengthOrder[i]] = 0;
				}

				this._block2State.numLiteralCodes = numLiteralCodes;
				this._block2State.numDistanceCodes = numDistanceCodes;
				this._block2State.bitLengths = new Uint8Array(numLiteralCodes + numDistanceCodes);
				this._block2State.codeLengthTable = makeHuffmanTable(codeLengths);

				state = InflateState.BLOCK_2_PRE;
				break;
			default:
				this._errorCode = ERROR_CODES.BLOCK_INVALID_TYPE;
				state = InflateState.ERROR;
				return false;
		}

		this._isFinalBlock = !!(type & 1);
		this._state = state;
		this._bufferPosition = position;
		this._bitBuffer = bitBuffer;
		this._bitLength = bitLength;
		return false;
	}

	private _decodeBlock0(): bool {
		var position: u32 = this._bufferPosition;
		var windowPosition: u32 = this._windowPosition;
		var toRead = this._block0Read;
		var leftInWindow: u32 = MAX_WINDOW_SIZE - windowPosition;
		var leftInBuffer: u32 = this._bufferSize - position;
		var incomplete: bool = leftInBuffer < toRead;
		var canFit: u32 = min(min(leftInWindow, leftInBuffer), toRead);
		this._window.set(this._buffer.subarray(position, position + canFit), windowPosition);
		this._windowPosition = windowPosition + canFit;
		this._bufferPosition = position + canFit;
		this._block0Read = toRead - canFit;

		if (toRead === canFit) {
			this._state = InflateState.INIT;
			return false;
		}

		return incomplete && leftInWindow < leftInBuffer;
	}

	private _readBits(size: u32): u32 {
		var bitBuffer: u32 = this._bitBuffer;
		var bitLength: u32 = this._bitLength;
		if (size > bitLength) {
			var pos: u32 = this._bufferPosition;
			var end: u32 = this._bufferSize;
			do {
				if (pos >= end) {
					this._bufferPosition = pos;
					this._bitBuffer = bitBuffer;
					this._bitLength = bitLength;
					return -1;
				}
				bitBuffer |= (<u32>this._buffer[pos++]) << bitLength;
				bitLength += 8;
			} while (size > bitLength);
			this._bufferPosition = pos;
		}
		this._bitBuffer = bitBuffer >> size;
		this._bitLength = bitLength - size;
		return bitBuffer & ((1 << size) - 1);
	}

	private _readCode(codeTable: HuffmanTable): i32 {
		var bitBuffer: u32 = this._bitBuffer;
		var bitLength: u32 = this._bitLength;
		var maxBits: u32 = codeTable.maxBits;
		if (maxBits > bitLength) {
			var pos: u32 = this._bufferPosition;
			var end: u32 = this._bufferSize;
			do {
				if (pos >= end) {
					this._bufferPosition = pos;
					this._bitBuffer = bitBuffer;
					this._bitLength = bitLength;
					return -1;
				}
				bitBuffer |= (<u32>this._buffer[pos++]) << bitLength;
				bitLength += 8;
			} while (maxBits > bitLength);
			this._bufferPosition = pos;
		}

		var code: u32 = codeTable.codes[bitBuffer & ((1 << maxBits) - 1)];
		var len: u32 = code >> 16;

		if (code & 0x8000) {
			this._errorCode = ERROR_CODES.ZLIB_UNVALID_ENCODING;
			this._state = InflateState.ERROR;
			return -1;
		}

		this._bitBuffer = bitBuffer >> len;
		this._bitLength = bitLength - len;
		return code & 0xffff;
	}

	private _decodeBlock2Pre(): bool {
		var block2State: DeflateBlock2State = this._block2State;
		var numCodes: u32 = block2State.numLiteralCodes + block2State.numDistanceCodes;
		var bitLengths = block2State.bitLengths;
		var i: u32 = block2State.codesRead;
		var prev: u32 = i > 0 ? bitLengths![i - 1] : 0;
		var codeLengthTable = block2State.codeLengthTable;
		var j: u32 = 0;
		let dupBits: u32 = 0;

		if (block2State.dupBits > 0) {
			j = this._readBits(block2State.dupBits);
			if (j < 0) {
				return true;
			}
			while (j--) {
				bitLengths![i++] = prev;
			}
			block2State.dupBits = 0;
		}

		while (i < numCodes) {
			var sym = this._readCode(codeLengthTable!);
			if (sym < 0) {
				block2State.codesRead = i;
				return true;
			} else if (sym < 16) {
				bitLengths![i++] = prev = sym;
				continue;
			}
			switch (sym) {
				case 16:
					dupBits = 2;
					j = 3;
					sym = prev;
					break;
				case 17:
					dupBits = 3;
					j = 3;
					sym = 0;
					break;
				case 18:
					dupBits = 7;
					j = 11;
					sym = 0;
					break;
			}

			while (j--) {
				bitLengths![i++] = sym;
			}

			j = this._readBits(dupBits);

			if (j < 0) {
				block2State.codesRead = i;
				block2State.dupBits = dupBits;
				return true;
			}
			while (j--) {
				bitLengths![i++] = sym;
			}
			prev = sym;
		}
		this._literalTable = makeHuffmanTable(bitLengths!.subarray(0, block2State.numLiteralCodes));
		this._distanceTable = makeHuffmanTable(bitLengths!.subarray(block2State.numLiteralCodes));
		this._state = InflateState.BLOCK_2;
		//this._block2State = null;
		return false;
	}

	private _decodeBlock(): bool {
		var literalTable = this._literalTable,
			distanceTable = this._distanceTable;
		var output = this._window,
			pos = this._windowPosition;
		var copyState = this._copyState;
		let i: u32, j: u32, sym: u32;
		let len: u32, lenBits: u32, dist: u32, distBits: u32;

		//trace("Copy state",1, <f64>copyState.state);

		if (copyState.state !== 0) {
			// continuing len/distance operation
			switch (copyState.state) {
				case 1:
					j = 0;
					if ((j = this._readBits(copyState.lenBits)) < 0) {
						return true;
					}
					copyState.len += j;
					copyState.state = 2;
				/* fall through */
				case 2:
					if ((sym = this._readCode(distanceTable!)) < 0) {
						return true;
					}
					copyState.distBits = distanceExtraBits[sym];
					copyState.dist = distanceCodes[sym];
					copyState.state = 3;
				/* fall through */
				case 3:
					j = 0;
					if (copyState.distBits > 0 && (j = this._readBits(copyState.distBits)) < 0) {
						return true;
					}
					dist = copyState.dist + j;
					len = copyState.len;
					i = pos - dist;
					while (len--) {
						output[pos++] = output[i++];
					}
					copyState.state = 0;
					if (pos >= WINDOW_SHIFT_POSITION) {
						this._windowPosition = pos;
						return false;
					}
					break;
			}
		}

		do {
			sym = this._readCode(literalTable!);
			//trace("Code:", 1, <f64>sym);

			if (sym < 0) {
				this._windowPosition = pos;
				return true;
			} else if (sym < 256) {
				output[pos++] = sym;
			} else if (sym > 256) {
				this._windowPosition = pos;
				sym -= 257;
				lenBits = lengthExtraBits[sym];
				len = lengthCodes[sym];
				j = lenBits === 0 ? 0 : this._readBits(lenBits);
				if (j < 0) {
					copyState.state = 1;
					copyState.len = len;
					copyState.lenBits = lenBits;
					return true;
				}
				len += j;
				sym = this._readCode(distanceTable!);
				if (sym < 0) {
					copyState.state = 2;
					copyState.len = len;
					return true;
				}
				distBits = distanceExtraBits[sym];
				dist = distanceCodes[sym];
				j = distBits === 0 ? 0 : this._readBits(distBits);
				if (j < 0) {
					copyState.state = 3;
					copyState.len = len;
					copyState.dist = dist;
					copyState.distBits = distBits;
					return true;
				}
				dist += j;
				i = pos - dist;
				while (len--) {
					output[pos++] = output[i++];
				}
			} else {
				this._state = InflateState.INIT;
				break; // end of block
			}
		} while (pos < WINDOW_SHIFT_POSITION);

		this._windowPosition = pos;
		return false;
	}
}

let inflator: BasicInflate;

export function getInstance(): BasicInflate {
	if(inflator !== null)
		return inflator;

	inflator = new BasicInflate();
	return inflator;
}
