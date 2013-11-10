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
        var width = tiff.width());
        var height = tiff.height());
        console.log('width:', width);
        console.log('height:', height);
        var arrayBuffer = tiff.readRGBAImage();

        var canvas = createCanvasFromArrayBuffer(arrayBuffer, width, height);
        document.body.append(canvas);
    };
    xhr.send();

    function createCanvasFromArrayBuffer(buffer, width, height) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        var imageData = context.createImageData(width, height);
        imageData.data.set(new Uint8Array(buffer));
        context.putImageData(imageData, 0, 0);
        return canvas;
    }

## Note
- This library does not support JPEG-based compressed TIFF image files
-- I failed to link a JPEG library ...
    
## License
LibTIFF is LibTIFF Software License, zlib and additional code are zlib License.
