/* global window */

'use strict';

var Application = require('./application');

window.app = new Application(require('./config'));
window.app.start();
