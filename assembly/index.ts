import { BasicInflate } from "./Inflate";
export { BasicInflate };
export * from "./imageProcessing";

export const Uint8Array_ID = idof<Uint8Array>();

let inflate: BasicInflate | null = null;
let buffer: Uint8Array;

export function initInflator(): void {
	inflate = new BasicInflate();
}

export function uploadBuffer(b: Uint8Array): void {
	if (inflate === null) {
		initInflator();
	}
	buffer = b;
}

export function decodePart(start: u32, len: u32, result: u32): Uint8Array {
	const target = new Uint8Array(result);
	const source = Uint8Array.wrap(buffer.buffer, start, len);

	inflate!.init(target, true);
	inflate!.push(source);

	return target;
}

export function getErrorCode(): i32 {
	return inflate!._errorCode;
}

export function getStatus(): i32 {
	return inflate!._state;
}
