#!/bin/bash

TOTAL_MEMORY=16777216
export EMCC_CFLAGS="-O2"
ZLIB_PKGVER=1.2.8
LIBTIFF_PKGVER=4.0.3

# build zlib
# wget http://zlib.net/current/zlib-${ZLIB_PKGVER}.tar.gz
tar xf zlib-${ZLIB_PKGVER}.tar.gz
cd zlib-${ZLIB_PKGVER}
emconfigure ./configure
emmake make
cd ..

# build libtiff
# wget http://download.osgeo.org/libtiff/tiff-${LIBTIFF_PKGVER}.tar.gz
tar xzvf tiff-${LIBTIFF_PKGVER}.tar.gz
cd tiff-${LIBTIFF_PKGVER}
# see: https://github.com/kripken/emscripten/issues/662
patch -p0 < ../tif_open.c.patch
patch -p0 < ../tiff.h.patch
emconfigure ./configure --enable-shared
emmake make
cd ..

emcc -o tiff.raw.js \
    -s TOTAL_MEMORY=$TOTAL_MEMORY \
    -s EXPORTED_FUNCTIONS="["\
"'_TIFFOpen',"\
"'_TIFFClose',"\
"'_TIFFGetField',"\
"'_TIFFReadRGBAImage',"\
"'_TIFFReadRGBAImageOriented',"\
"'_TIFFSetDirectory',"\
"'_TIFFCurrentDirectory',"\
"'_TIFFLastDirectory',"\
"'__TIFFmalloc',"\
"'__TIFFfree',"\
"'_GetField',"\
"'FS']" \
    export.c \
    tiff-${LIBTIFF_PKGVER}/libtiff/.libs/libtiff.a \
    zlib-${ZLIB_PKGVER}/libz.a

echo 'var TiffTag = {' > tiff_tag.ts
grep '^#define[[:space:]]\+TIFFTAG_[A-Za-z_]\+[[:space:]]\+' \
    tiff-4.0.3/libtiff/tiff.h \
    | sed -e "s@^\#define[[:space:]]*TIFFTAG_\([A-Za-z_]*\)[[:space:]]*\([A-Za-z0-9]*\).*@  \1 : \2,@g" \
    >> tiff_tag.ts
echo '};' >> tiff_tag.ts

tsc emscripten.d.ts cwrap.ts tiff_tag.ts tiff_api.ts -d
cat LICENSE tiff.raw.js > tiff.js
echo '' >> tiff.js
cat cwrap.js tiff_tag.js tiff_api.js >> tiff.js
mv tiff_api.d.ts tiff.d.ts
rm -f tiff_tag.d.ts cwrap.d.ts tiff_tag.js tiff_api.js cwrap.js

closure-compiler \
    --js=tiff.js \
    --js_output_file=tiff.min.js \
    --language_in ECMASCRIPT5 \
    --output_wrapper="(function() {%output%})();"
