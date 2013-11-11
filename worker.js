self.onmessage = function (event) {
  importScripts("tiff.min.js");
  var data = event.data;
  if (data.memory) {
    Tiff.initialize({ TOTAL_MEMORY: data.memory });
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', data.url, false);
  xhr.responseType = 'arraybuffer';
  xhr.send(null);
  var tiff = new Tiff({buffer: xhr.response});
  // Note: we can't call the function tiff.toCanvas() or tiff.toDataURL() in here
  //       because the scripts in web worker can't touch DOM objects.
  var image = tiff.readRGBAImage();
  self.postMessage({ image: image, width: tiff.width(), height: tiff.height() }, [image]);
};
