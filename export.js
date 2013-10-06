// export.js

var TIFFFileToRGBAData = cwrap('TIFFFileToRGBAData', 'number', [
  'string', 'number', 'number', 'number']);
var malloc = cwrap('malloc', 'number', ['number']);
var free = cwrap('free', 'number', ['number']);

var Tiff = (function () {
  function Tiff(arraybuffer) {
    this.buffer = arraybuffer;
  }
  Tiff.prototype['toDataURL'] = function () {
    var canvas = this.toCanvas();
    return canvas ? canvas.toDataURL() : '';
  };
  var fileid = 0;
  Tiff.prototype['toCanvas'] = function () {
    var widthPtr = malloc(4);
    var heightPtr = malloc(4);
    var rgbaArrayPtr = malloc(4);

    var filename = (++fileid) + '.tiff';
    var canvas = null;

    try {
      FS.createDataFile('/', filename, new Uint8Array(this.buffer),
                               true, false);
      var result = TIFFFileToRGBAData(filename, widthPtr, heightPtr, rgbaArrayPtr);
      if (result !== 0) { return null; }
      var width = getValue(widthPtr, 'i32*');
      var height = getValue(heightPtr, 'i32*');
      var rgbaArray = getValue(rgbaArrayPtr, 'i32*');

      canvas = document.createElement('canvas');
      var data = HEAPU8.subarray(rgbaArray, rgbaArray + width * height * 4);
      var context = canvas.getContext('2d');
      var imageData = context.createImageData(width, height);
      var pixelData = imageData.data;
      if ('set' in pixelData) {
        pixelData.set(data);
      } else {
        for (var i = 0, length = data.length; i < length; ++i) {
          pixelData[i] = data[i];
        }
      }
      canvas.width = width;
      canvas.height = height;
      context.putImageData(imageData, 0, 0);
    } finally {
      free(rgbaArray);
      FS.deleteFile(filename);
    }
    free(rgbaArrayPtr);
    free(heightPtr);
    free(widthPtr);
    return canvas;
  };
  return Tiff;
})();

if (typeof define === "function" && define.amd) {
  define('tiff', [], function () { return Tiff; });
} else if (typeof window === "object" && typeof window.document === "object") {
  window['Tiff'] = Tiff;
}
