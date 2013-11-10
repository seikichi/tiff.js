#include "tiffio.h"

// helper function
int GetField(TIFF *tiff, uint32 field) {
  int value = 0;
  TIFFGetField(tiff, field, &value);
  return value;
}
