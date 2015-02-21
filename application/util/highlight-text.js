/* global window, document */
'use strict';

/**
 * Highlight the text in the given DOM node
 *
 * @param  {DOM Element} domNode The DOM Element whose text to highlight
 */
module.exports = function (domNode) {
    var range, selection;

    selection = window.getSelection();
    range     = document.createRange();

    range.selectNodeContents(domNode);
    selection.removeAllRanges();
    selection.addRange(range);
};
