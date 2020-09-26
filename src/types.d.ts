declare module ASModule {
  type i8 = number;
  type i16 = number;
  type i32 = number;
  type i64 = BigInt;
  type isize = number;
  type u8 = number;
  type u16 = number;
  type u32 = number;
  type u64 = BigInt;
  type usize = number;
  type f32 = number;
  type f64 = number;
  type bool = any;
  export function __alloc(size: usize, id: u32): usize;
  export function __retain(ptr: usize): usize;
  export function __release(ptr: usize): void;
  export function __collect(): void;
  export var __rtti_base: usize;
  export var Uint8Array_ID: u32;
  export function initInflator(): void;
  export function uploadBuffer(b: usize): void;
  export function decodePart(start: u32, len: u32, result: u32): usize;
  export function getErrorCode(): i32;
  export function getStatus(): i32;
  export function parse24BPP_P(point: u32, len: u32, width: u32, height: u32, tableSize: u32, hasAlpha: bool): usize;
  export function parseColorMapped_P(point: u32, len: u32, width: u32, height: u32, tableSize: u32, hasAlpha: bool): usize;
  export class BasicInflate {
    _state: i32;
    _errorCode: i32;
    constructor();
    onData(buff: usize): void;
    init(target: usize, checkHeader: bool): void;
    push(data: usize): void;
    close(): void;
  }
  export function parseColorMapped(data: usize, width: u32, height: u32, tableSize: u32, hasAlpha: bool): usize;
  export function parse24BPP(data: usize, width: u32, height: u32, tableSize: u32, hasAlpha: bool): usize;
}
export default ASModule;
