#!/bin/bash

export EMCC_CFLAGS="-O2"

# build zlib
ZLIB_PKGVER=1.2.8
wget http://zlib.net/current/zlib-${ZLIB_PKGVER}.tar.gz
tar xf zlib-${ZLIB_PKGVER}.tar.gz
cd zlib-${ZLIB_PKGVER}
emconfigure ./configure
emmake make
cd ..

# build libtiff
LIBTIFF_PKGVER=4.0.3
wget ftp://ftp.remotesensing.org/pub/libtiff/tiff-${LIBTIFF_PKGVER}.tar.gz
tar xzvf tiff-${LIBTIFF_PKGVER}.tar.gz
cd tiff-${LIBTIFF_PKGVER}
# see: https://github.com/kripken/emscripten/issues/662
patch -p0 < ../tif_open.c.patch
patch -p0 < ../tiff.h.patch
emconfigure ./configure --enable-shared
emmake make
cd ..

emcc -c export.c
emcc -s EXPORTED_FUNCTIONS="['_TIFFFileToRGBAData','FS']" \
    -o tmp1.js \
    export.o \
    tiff-${LIBTIFF_PKGVER}/libtiff/.libs/libtiff.a \
    zlib-${ZLIB_PKGVER}/libz.a

cat LICENSE tmp1.js export.js > tmp2.js
cat LICENSE > tiff.min.js
echo 'var TiffSetting;' >> tiff.min.js
closure --js=tmp2.js \
    --output_wrapper="(function(window,Module){%output%})(window,TiffSetting||{});" >> tiff.min.js
rm tmp?.js
