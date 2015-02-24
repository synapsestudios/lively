/* global window */
'use strict';

var React    = require('react');
window.React = React; // React Dev Tools requires this
var routes   = require('./routes');
var Router   = require('react-router');
var flux     = require('./flux');

require('./ui/scss/app');

require('../media/images/logos/livelydocs-logomark.png');
require('../media/images/css-images/overlay-pattern.png');
require('../media/images/css-images/background.svg');

require('../media/fonts/SourceSansPro/sourcesanspro-regular-webfont.woff');
require('../media/fonts/SourceSansPro/sourcesanspro-semibold-webfont.woff');
require('../media/fonts/SourceSansPro/sourcesanspro-regular-webfont.ttf');
require('../media/fonts/SourceSansPro/sourcesanspro-semibold-webfont.ttf');
require('../media/fonts/Inconsolata/inconsolata-webfont.woff');
require('../media/fonts/Inconsolata/inconsolata-webfont.ttf');
require('../media/fonts/FontAwesome/fontawesome-webfont.woff');
require('../media/fonts/FontAwesome/fontawesome-webfont.ttf');

React.initializeTouchEvents(true);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.withContext({flux : flux}, function () {
        React.render(React.createElement(Handler, null), window.document.body);
    });
});
