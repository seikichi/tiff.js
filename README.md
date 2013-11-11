# tiff.js
tiff.js is a port of the LibTIFF by compiling the LibTIFF C code with Emscripten.

## [Demo](http://seikichi.github.io/tiff.js/)
- [views TIFF files](http://seikichi.github.io/tiff.js/basic.html)
- [views a TIFF file using a web worker](http://seikichi.github.io/tiff.js/worker.html)
- [views a multipage TIFF file](http://seikichi.github.io/tiff.js/multipage.html)

## Usage
Use tiff.min.js:

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', "url/of/a/tiff/image/file.tiff");
    xhr.onload = function (e) {
        var tiff = new Tiff({buffer: xhr.response});
        var canvas = tiff.toCanvas();
        document.body.append(canvas);
    };
    xhr.send();

## API
see tiff.d.ts

## Note
- This library does not support JPEG-based compressed TIFF files
-- I failed to link a JPEG library ... ;-p
- When you load large tiff file, you will see the error message "Cannot enlarge memory arrays in asm.js"
-- in such case, please call 'Tiff.initialize({TOTAL_MEMORY: ... })' before you create a Tiff instance
- This JavaScript library uses only some parts of the LibTIFF features
-- To be more precise, I use following functions only
-- TIFFOpen, TIFFClose, TIFFGetField, TIFFReadRGBAImage, TIFFSetDirectory, TIFFCurrentDirectory, TIFFReadDirectory
    
## License
The LibTIFF is LibTIFF Software License, zlib and additional code are zlib License.
