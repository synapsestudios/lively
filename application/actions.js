'use strict';

var oauth2Actions  = require('./action/oauth2');
var requestActions = require('./action/request');

module.exports = {
    oauth   : oauth2Actions,
    request : requestActions
};
