import { BasicInflate, getInstance } from "./Inflate";
export { BasicInflate };
import { parseColorMapped, parse24BPP} from "./imageProcessing";

export const Uint8Array_ID = idof<Uint8Array>();

let inflate: BasicInflate | null = null;
let buffer: Uint8Array;

export function initInflator(): void {
	inflate = getInstance()
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

/**
 * Parse 24BPP image from buffer offset and length
 */
export function parse24BPP_P(point: u32, len: u32, width: u32, height: u32, tableSize: u32, hasAlpha: bool): Uint8Array
{
	const sub = buffer.subarray(point, point + len);
	return parse24BPP(sub, width, height, tableSize, hasAlpha);
}

/**
 * Parse colormaped image from buffer offset and length
 */
export function parseColorMapped_P(point: u32, len: u32, width: u32, height: u32, tableSize: u32, hasAlpha: bool): Uint8Array
{
	const sub = buffer.subarray(point, point + len);
	return parseColorMapped(sub, width, height, tableSize, hasAlpha);
}

export {
	parseColorMapped, parse24BPP
}
