import * as AS from "@assemblyscript/loader";
import ASModule from "./types";

export interface IImageOptions {
	offset: number;
	length: number;
	width: number;
	height: number;
}

export interface IBindingOptions {
	useView: boolean
}

export interface IColorMapedOptions extends IImageOptions {
	tableSize: number;
	hasAlpha: boolean;
}

export interface IModule {
	uploadBuffer(buffer: Uint8Array): number;
	dispose():void;
	parse24BPP_P(opt: IImageOptions, botp: IBindingOptions): Uint8ClampedArray;
	parseColorMapped_P(opt: IColorMapedOptions, botp: IBindingOptions): Uint8ClampedArray;
}

function bindExports(exports: typeof ASModule & AS.ASUtil): IModule {
	let mainBufferPtr = -1;

	const {
		__allocArray,
		__release,
		__getUint8ClampedArray,
		__getUint8ClampedArrayView,
		parse24BPP_P: p24,
		parseColorMapped_P: pCM,
		Uint8Array_ID,
		uploadBuffer
	} = exports;

	const ptrs = [];

	return {
		uploadBuffer(buffer: Uint8Array): number {
			mainBufferPtr = __allocArray(Uint8Array_ID, buffer);
			uploadBuffer(mainBufferPtr);
			return mainBufferPtr;
		},
		parse24BPP_P(opt: IImageOptions, {useView = false}: IBindingOptions = null): Uint8ClampedArray
		{
			if(mainBufferPtr === -1) {
				throw `Buffer should be uploaded before decoding`;
			}

			if(!(opt.width * opt.height)) {
				throw `Invalid dimensions ${opt.width}x${opt.height}`;
			}

			if(!opt.length) {
				throw `Invalid lenght ${opt.length}`
			}

			const ptr = p24(opt.offset | 0, opt.length | 0, opt.width | 0, opt.length | 0, 0, true);

			if( useView ) {
				ptrs.push(ptr);
				return __getUint8ClampedArrayView(ptr);
			}

			const arr = __getUint8ClampedArray(ptr);
			__release(ptr);

			return arr;
		},
		parseColorMapped_P(opt: IColorMapedOptions, {useView = false}: IBindingOptions = null): Uint8ClampedArray
		{
			if(mainBufferPtr === -1) {
				throw `Buffer should be uploaded before decoding`;
			}

			if(!(opt.width * opt.height)) {
				throw `Invalid dimensions ${opt.width}x${opt.height}`;
			}

			if(!opt.length) {
				throw `Invalid lenght ${opt.length}`
			}

			if(!opt.tableSize || opt.tableSize < 3) {
				throw `Invalid table size: ${opt.tableSize}`;
			}

			const ptr = pCM(opt.offset | 0, opt.length | 0, opt.width | 0, opt.length | 0, opt.tableSize | 0, !!opt.hasAlpha);

			if( useView ) {
				ptrs.push(ptr);
				return __getUint8ClampedArrayView(ptr);
			}

			const arr = __getUint8ClampedArray(ptr);
			__release(ptr);

			return arr;
		},
		dispose() {
			if(mainBufferPtr > -1) {
				__release(mainBufferPtr);
			}

			for(const p of ptrs) __release(p);

			mainBufferPtr = -1;
			ptrs.length = 0;
		}
	}
}

export function loadModule(urlOrArray: string | ArrayBuffer): Promise<IModule> {
	const f =
		typeof urlOrArray === 'string'
		? fetch(urlOrArray).then((e)=> e.arrayBuffer())
		: Promise.resolve(urlOrArray as ArrayBuffer);

	return f
		.then(buff => AS.instantiate<typeof ASModule>(buff))
		.then(({exports}) => bindExports(exports))
}
