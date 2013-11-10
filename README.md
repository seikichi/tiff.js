# tiff.js
tiff.js is a port of LibTIFF by compiling the LibTIFF C code with Emscripten.

See [demo](http://seikichi.github.io/tiff.js).

## Usage
Use tiff.min.js:

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', "tiff-image-url");
    xhr.onload = function (e) {
        var tiff = new Tiff({buffer: xhr.response});
        console.log('width:', tiff.width());
        console.log('height:', tiff.height());
        var arrayBuffer = tiff.readRGBAImage();
        // Let's do something nice
    };
    xhr.send();

## Note
- This library does not support JPEG-based compressed TIFF image files
-- I failed to link a JPEG library ...
    
## License
LibTIFF is LibTIFF Software License, zlib and additional code are zlib License.
