var fs = require('fs');
var Tiff = require('./tiff');

if (process.argv.length <= 2) {
  console.log('usage: node tiff-info.js image.tiff');
  process.exit();
}

var filename = process.argv[2];

fs.readFile(filename, function (err, data) {
  if (err) { throw err; }
  var tiff = new Tiff({buffer: data});
  console.log('width:', tiff.width());
  console.log('height:', tiff.height());
  console.log('currentDirectory:', tiff.currentDirectory());
  console.log('countDirectory:', tiff.countDirectory());
  tiff.close();
});
