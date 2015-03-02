'use strict';

var oauth2Actions  = require('./action/oauth2');
var requestActions = require('./action/request');
var stripeActions  = require('./action/stripe');

module.exports = {
    oauth   : oauth2Actions,
    request : requestActions,
    stripe  : stripeActions
};
