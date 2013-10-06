# tiff.js
tiff.js is a port of LibTIFF by compiling the LibTIFF C code with Emscripten.

See [demo](http://moon.kmc.gr.jp/~seikichi/tiffjs/1.html).

## Usage
Use tiff.min.js:

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', "tiff-image-url");
    xhr.onload = function (e) {
        var canvas = new Tiff(xhr.response).toCanvas();
        // do something nice
    };
    xhr.send();

When you load large tiff file,
you will see the error message "Cannot enlarge memory arrays in asm.js" ([example](http://moon.kmc.gr.jp/~seikichi/tiffjs/2.html)).
In that case, use tiff.memory\_growth.min.js (which is build with with "-s ALLOW\_MEMORY\_GROWTH=1" option)
or set TiffSetting.TOTAL\_MEMORY as follow (set TiffSetting.TOTAL\_MEMORY before you load the tiff.min.js, [example](http://moon.kmc.gr.jp/~seikichi/tiffjs/3.html))

    <script type="text/javascript">
        var TiffSetting = { TOTAL_MEMORY: 16777216 * 10 };
    </script>
    <script src="path/to/tiff.min.js"></script>

## License
LibTIFF is LibTIFF Software License, zlib is zlib License, additional code is MIT.
