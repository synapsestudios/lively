'use strict';

var ConfigStore  = require('./store/api-config');
var Oauth2Store  = require('./store/oauth2');
var RequestStore = require('./store/request');
var StripeStore  = require('./store/stripe');

module.exports = {
    ConfigStore  : new ConfigStore(),
    OAuthStore   : new Oauth2Store(),
    RequestStore : new RequestStore(),
    StripeStore  : new StripeStore()
};
