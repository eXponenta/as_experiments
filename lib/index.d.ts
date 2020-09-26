export interface IImageOptions {
    offset: number;
    length: number;
    width: number;
    height: number;
}
export interface IBindingOptions {
    useView: boolean;
}
export interface IColorMapedOptions extends IImageOptions {
    tableSize: number;
    hasAlpha: boolean;
}
export interface IModule {
    uploadBuffer(buffer: Uint8Array): number;
    dispose(): void;
    parse24BPP_P(opt: IImageOptions, botp: IBindingOptions): Uint8ClampedArray;
    parseColorMapped_P(opt: IColorMapedOptions, botp: IBindingOptions): Uint8ClampedArray;
}
export declare function loadModule(urlOrArray: string | ArrayBuffer): Promise<IModule>;
