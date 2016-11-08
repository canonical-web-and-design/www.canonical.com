

//Provides basic templating for strings
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

YUI().use('node', 'cookie', 'event-resize', 'event', 'jsonp', 'json-parse', function(Y) {
});
