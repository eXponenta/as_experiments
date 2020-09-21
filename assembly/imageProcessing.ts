import { BasicInflate, getInstance, InflateState } from "./Inflate";

function roundToMultipleOfFour(x: u32): u32 {
	return (x + 3) & ~0x3;
}

export function parseColorMapped(
	data: Uint8Array,
	width: u32,
	height: u32,
	tableSize: u32,
	hasAlpha: bool
): Uint8Array {
	const padding: u32 = roundToMultipleOfFour(width) - width;
	const colorTableLength: u32 = tableSize + 1;
	const colorTableEntrySize: u32 = hasAlpha ? 4 : 3;
	const colorTableSize: u32 = colorTableLength * colorTableEntrySize;
	const outputDataSize = colorTableSize + (width + padding) * height;
	const bytes: Uint8Array = new Uint8Array(outputDataSize);

	const inflator: BasicInflate = getInstance();

	inflator.init(bytes, true);
	inflator.push(data);

	assert(
		inflator._state !== InflateState.ERROR,
		"Error when decode (errorCode):".concat(inflator._errorCode.toString())
	);

	const view = new Uint32Array(width * height);

	let p: u32 = colorTableSize,
		i: u32 = 0,
		offset: u32 = 0;

	for (var y: u32 = 0; y < height; y++) {
		for (var x: u32 = 0; x < width; x++) {
			offset = u32(unchecked(bytes[p++])) * colorTableEntrySize;

			view[i++] =
				((hasAlpha ? u32(unchecked(bytes[offset + 3])) : 0xff) << 24) |
				(u32(unchecked(bytes[offset + 2])) << 16) |
				(u32(unchecked(bytes[offset + 1])) << 8) |
				(u32(unchecked(bytes[offset + 0])) >>> 0);
		}
		p += padding;
	}

	return Uint8Array.wrap(view.buffer);
}

/**
 * Returns a Uint8ClampedArray of RGBA values.
 */
export function parse24BPP(data: Uint8Array, width: u32, height: u32, tableSize: u32, hasAlpha: bool): Uint8Array {
	// Even without alpha, 24BPP is stored as 4 bytes, probably for alignment reasons.
	const dataSize = height * width * 4;
	const bytes = new Uint8Array(dataSize);
	const inflator: BasicInflate = getInstance();

	inflator.init(bytes, true);
	inflator.push(data);

	assert(
		inflator._state !== InflateState.ERROR,
		"Error when decode (errorCode):".concat(inflator._errorCode.toString())
	);

	//bytes are in ARGB format, so we need to convert to RGBA
	const view = Uint32Array.wrap(bytes.buffer);

	// in => PMA ARGB, out => NPMA RGBA
	// ?
	// Unpremultiply
	for (let i: u32 = 0, l = <u32>view.length; i < l; i++) {
		let c: u32 = unchecked(view[i]);
		let a: u8 = u8(c); // A
		let factor: f32 = a ? 0xff / f32(a) : 1;

		let b: f32 = f32((c >> 24) & 0xff) * factor; // B
		let g: f32 = f32((c >> 16) & 0xff) * factor; // G
		let r: f32 = f32((c >> 8) & 0xff) * factor; // R

		unchecked((view[i] = ((<u8>a) << 24) | ((<u8>b) << 16) | ((<u8>g) << 8) | (<u8>r)));
	}

	//assert (p * 4 === dataSize, "We should be at the end of the data buffer now.");
	return bytes;
}
