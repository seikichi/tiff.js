declare var loadModule: (options: Tiff.InitializeOptions) => typeof Module;

class Tiff {
  private _filename: string;
  private _tiffPtr: number;
  private static uniqueIdForFileName = 0;
  private static Module: typeof Module = null;

  public static initialize(options: Tiff.InitializeOptions): void {
    if (Tiff.Module !== null) { return; }
    Tiff.Module = loadModule(options);
  }

  constructor(params: Tiff.Params) {
    if (!params.url && !params.buffer) {
      throw new Tiff.Exception('Invalid parameter, need either .buffer or .url');
    }
    if (Tiff.Module === null) {
      Tiff.initialize({});
    }
    if (params.url) {
      this._filename = Tiff.createFileSystemObjectFromURL(params.url);
    } else {
      this._filename = Tiff.createFileSystemObjectFromBuffer(params.buffer);
    }
    this._tiffPtr = Tiff.Module.ccall('TIFFOpen', 'number', [
      'string', 'string'], [ this._filename, 'r']);
    if (this._tiffPtr === 0) {
      throw new Tiff.Exception('The function TIFFOpen returns NULL')
    }
  }

  width(): number {
    return this.getField(Tiff.Tag.IMAGEWIDTH);
  }

  height(): number {
    return this.getField(Tiff.Tag.IMAGELENGTH);
  }

  currentDirectory(): number {
    return Tiff.Module.ccall('TIFFCurrentDirectory', 'number',
                             ['number'], [this._tiffPtr]);
  }

  lastDirectory(): number {
    return Tiff.Module.ccall('TIFFLastDirectory', 'number',
                             ['number'], [this._tiffPtr]);
  }

  setDirectory(index: number): void {
    return Tiff.Module.ccall('TIFFSetDirectory', 'number',
                             ['number', 'number'], [this._tiffPtr, index]);
  }

  getField(tag: number): number {
    var value: number = Module.ccall('GetField', 'number', ['number', 'number'], [
      this._tiffPtr, tag]);
    return value;
  }

  readRGBAImage(): ArrayBuffer {
    var width = this.width();
    var height = this.height();
    var raster: number = Tiff.Module.ccall('_TIFFmalloc', 'number',
                                           ['number'], [width * height * 4])
    var result: number = Tiff.Module.ccall('TIFFReadRGBAImageOriented', 'number', [
      'number', 'number', 'number', 'number', 'number', 'number'], [
      this._tiffPtr, width, height, raster, 1, 0
    ]);

    if (result === 0) {
      throw new Tiff.Exception('The function TIFFReadRGBAImageOriented returns NULL');
    }
    // copy the subarray, not create new sub-view
    var data = <ArrayBuffer>(<any>Tiff.Module.HEAPU8.buffer).slice(
      raster,
      raster + width * height * 4
    );
    Tiff.Module.ccall('free', 'number', ['number'], [raster]);
    return data;
  }

  toCanvas(): HTMLCanvasElement {
    var width = this.width();
    var height = this.height();
    var raster: number = Tiff.Module.ccall('_TIFFmalloc', 'number',
                                           ['number'], [width * height * 4])
    var result: number = Tiff.Module.ccall('TIFFReadRGBAImageOriented', 'number', [
      'number', 'number', 'number', 'number', 'number', 'number'], [
      this._tiffPtr, width, height, raster, 1, 0
    ]);

    if (result === 0) {
      throw new Tiff.Exception('The function TIFFReadRGBAImageOriented returns NULL');
    }
    var image = Tiff.Module.HEAPU8.subarray(raster, raster + width * height * 4);

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    var imageData = context.createImageData(width, height);
    (<any>imageData).data.set(image);
    context.putImageData(imageData, 0, 0);
    Tiff.Module.ccall('free', 'number', ['number'], [raster]);
    return canvas;
  }

  toDataURL(): string {
    return this.toCanvas().toDataURL();
  }

  close(): void {
    Tiff.Module.ccall('TIFFClose', 'number', ['number'], [this._tiffPtr]);
  }

  private static createUniqueFileName(): string {
    Tiff.uniqueIdForFileName += 1;
    return String(Tiff.uniqueIdForFileName) + '.tiff';
  }

  private static createFileSystemObjectFromURL(url: string): string {
    var filename = Tiff.createUniqueFileName();
    Tiff.Module.FS.createLazyFile('/', url, filename, true, false);
    return filename;
  }

  private static createFileSystemObjectFromBuffer(buffer: ArrayBuffer): string {
    var filename = Tiff.createUniqueFileName();
    Tiff.Module.FS.createDataFile('/', filename, new Uint8Array(buffer), true, false);
    return filename;
  }
}

module Tiff {
  export interface InitializeOptions {
    TOTAL_MEMORY?: number;
  }

  export interface Params {
    url?: string;
    buffer?: ArrayBuffer;
  }

  export class Exception {
    name: string = 'Tiff.Exception';
    constructor(public message: string) {}
  }

  export var Tag: typeof TiffTag = TiffTag;
}

// for closure compiler
Tiff.prototype['width'] = Tiff.prototype.width;
Tiff.prototype['height'] = Tiff.prototype.height;
Tiff.prototype['currentDirectory'] = Tiff.prototype.currentDirectory;
Tiff.prototype['lastDirectory'] = Tiff.prototype.lastDirectory;
Tiff.prototype['setDirectory'] = Tiff.prototype.setDirectory;
Tiff.prototype['getField'] = Tiff.prototype.getField;
Tiff.prototype['readRGBAImage'] = Tiff.prototype.readRGBAImage;
Tiff.prototype['close'] = Tiff.prototype.close;
Tiff['Exception'] = Tiff.Exception;
Tiff['initialize'] = Tiff.initialize;

// export to node, amd, window or worker
declare var process: any;
declare var require: any;
declare var module: any;
declare var define: any;
declare var self: any;

if (typeof process === 'object' && typeof require === 'function') { // NODE
  module['exports'] = Tiff;
} else if (typeof define === "function" && define.amd) { // AMD
  define('tiff', <any>[], () => Tiff);
} else if (typeof window === 'object') { // WEB
  window['Tiff'] = Tiff;
} else if (typeof importScripts === 'function') { // WORKER
  self['Tiff'] = Tiff;
}
