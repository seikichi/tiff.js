class Tiff {
  private static uniqueIdForFileName = 0;
  private _filename: string;
  private _tiffPtr: number;

  constructor(params: Tiff.Params) {
    if (!params.url && !params.buffer) {
      throw new Tiff.Exception('Invalid parameter, need either .buffer or .url');
    }
    if (params.url) {
      this._filename = Tiff.createFileSystemObjectFromURL(params.url);
    } else {
      this._filename = Tiff.createFileSystemObjectFromBuffer(params.buffer);
    }
    this._tiffPtr = TIFFOpen(this._filename, 'r');
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
    return TIFFCurrentDirectory(this._tiffPtr);
  }

  lastDirectory(): number {
    return TIFFLastDirectory(this._tiffPtr);
  }

  setDirectory(index: number): void {
    TIFFSetDirectory(this._tiffPtr, index);
  }

  getField(tag: number): number {
    var value: number = GetField(this._tiffPtr, tag);
    return value;
  }

  readRGBAImage(): ArrayBuffer {
    var width = this.width();
    var height = this.height();
    var raster = _TIFFmalloc(width * height * 4);
    var result = TIFFReadRGBAImageOriented(
      this._tiffPtr, width, height, raster, 1, 0);
    if (result === 0) {
      throw new Tiff.Exception('The function TIFFReadRGBAImageOriented returns NULL');
    }
    var data = <ArrayBuffer>(<any>HEAP8.buffer).slice(
      raster,
      raster + width * height * 4
    );
    _TIFFfree(raster);
    return data;
  }

  close(): void {
    TIFFClose(this._tiffPtr);
  }

  private static createUniqueFileName(): string {
    Tiff.uniqueIdForFileName += 1;
    return String(Tiff.uniqueIdForFileName) + '.tiff';
  }

  private static createFileSystemObjectFromURL(url: string): string {
    var filename = Tiff.createUniqueFileName();
    FS.createLazyFile('/', url, filename, true, false);
    return filename;
  }

  private static createFileSystemObjectFromBuffer(buffer: ArrayBuffer): string {
    var filename = Tiff.createUniqueFileName();
    FS.createDataFile('/', filename, new Uint8Array(buffer), true, false);
    return filename;
  }
}

module Tiff {
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
