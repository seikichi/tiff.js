#include "tiffio.h"
#include <stdlib.h>

int TIFFFileToRGBAData(const char *filename,
                       int *width,
                       int *height,
                       uint32 **rgba) {
  size_t i;
  TIFF* tif = TIFFOpen(filename, "r");
  if (!tif) { return -1; }
  TIFFGetField(tif, TIFFTAG_IMAGEWIDTH, width);
  TIFFGetField(tif, TIFFTAG_IMAGELENGTH, height);

  size_t npixels = (*width) * (*height);
  *rgba = (uint32*)_TIFFmalloc(npixels * sizeof(uint32));
  if (rgba == NULL ||
      !TIFFReadRGBAImageOriented(tif, *width, *height,
                                 *rgba, ORIENTATION_TOPLEFT, 0)) {
    TIFFClose(tif);
    return -1;
  }
  TIFFClose(tif);
  return 0;
}
