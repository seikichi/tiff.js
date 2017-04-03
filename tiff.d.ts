/// <reference path="emscripten.d.ts"/>

declare var loadModule: (options: Tiff.InitializeOptions) => typeof Module;
declare class Tiff {
    private _filename;
    private _tiffPtr;
    private static uniqueIdForFileName;
    private static Module;
    static initialize(options: Tiff.InitializeOptions): void;
    constructor(params: Tiff.Params);
    width(): number;
    height(): number;
    currentDirectory(): number;
    countDirectory(): number;
    setDirectory(index: number): void;
    getField(tag: number): number;
    readRGBAImage(): ArrayBuffer;
    toCanvas(): HTMLCanvasElement;
    toDataURL(): string;
    close(): void;
    private static createUniqueFileName();
    private static createFileSystemObjectFromBuffer(buffer);
}
declare module Tiff {
    export interface InitializeOptions {
        TOTAL_MEMORY?: number;
    }
    export interface Params {
        buffer: ArrayBuffer;
    }
    export class Exception {
        message: string;
        name: string;
        constructor(message: string);
    }
    export var Tag: any;
}
declare var process: any;
declare var require: any;
declare var module: any;
declare var define: any;
declare var self: any;

export = Tiff;