var loadModule = function (options) {
  var Module = {};
  if ('TOTAL_MEMORY' in options) {
    Module['TOTAL_MEMORY'] = options['TOTAL_MEMORY'];
  }
