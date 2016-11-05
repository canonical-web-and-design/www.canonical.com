/* Setup namespace
 */

if (typeof utilities !== 'undefined') {
  throw TypeError("Namespace 'utilities' not available");
}

var utilities = {};

/**
 * Convert an HTML string into a tree of DOM elements
 */
utilities.createElementFromHtml = function(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.childNodes[0];
};
