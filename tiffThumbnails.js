/**
 * Find all img elements with data-pdf-thumbnail-file attribute,
 * then load pdf file given in the attribute,
 * then use pdf.js to draw the first page on a canvas,
 * then convert it to base64,
 * then set it as the img src.
 */
var createTiffThumbnails = function(){

    var nodesArray = Array.prototype.slice.call(document.querySelectorAll('img[data-tiff-thumbnail-file]'));

    nodesArray.forEach(function(element) {
        var filePath = element.getAttribute('data-tiff-thumbnail-file');
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open('GET', filePath);
        xhr.onload = function (e) {
            var tiff = new Tiff({buffer: xhr.response});
            var canvas = tiff.toCanvas();
            element.src = canvas.toDataURL();
        };
        xhr.send();
    });
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    createTiffThumbnails();
} else {
    document.addEventListener("DOMContentLoaded", createTiffThumbnails);
}
