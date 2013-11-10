var malloc: (size: number) => number = cwrap('malloc', 'number', ['number']);
var free: (ptr: number) => void = cwrap('malloc', 'number', ['number']);

var GetField: (tiffPtr: number, field: number) => number
  = cwrap('GetField', 'number', ['number', 'number']);

var TIFFOpen: (filename: string, mode: string) => number
  = cwrap('TIFFOpen', 'number', ['string', 'string']);
var TIFFClose: (tiffPtr: number) => void
  = cwrap('TIFFClose', 'number', ['number']);
var TIFFGetField: (tiffPtr: number, field: number, valuePtr: number) => number
  = cwrap('TIFFGetField', 'number', ['number', 'numner', 'number']);
var TIFFReadRGBAImage: (tiffPtr: number,
                        width: number,
                        height: number,
                        rasterPtr: number,
                        stopOnError: number) => number
  = cwrap('TIFFReadRGBAImage', 'number', [
    'number', 'number', 'number', 'number', 'number']);
var TIFFReadRGBAImageOriented: (tiffPtr: number,
                                width: number,
                                height: number,
                                rasterPtr: number,
                                orientation: number,
                                stopOnError: number) => number
  = cwrap('TIFFReadRGBAImageOriented', 'number', [
    'number', 'number', 'number', 'number', 'number', 'number']);
var TIFFSetDirectory: (tiffPtr: number, index: number) => void
  = cwrap('TIFFSetDirectory', 'number', ['number', 'number']);
var TIFFCurrentDirectory: (tiffPtr: number) => number
  = cwrap('TIFFCurrentDirectory', 'number', ['number']);
var TIFFLastDirectory: (tiffPtr: number) => number
  = cwrap('TIFFLastDirectory', 'number', ['number']);
var _TIFFmalloc: (size: number) => number
  = cwrap('_TIFFmalloc', 'number', ['number']);
var _TIFFfree: (ptr: number) => void
  = cwrap('_TIFFfree', 'number', ['number']);
