'use strict';

var Oauth2Store  = require('./store/oauth2');
var RequestStore = require('./store/request');

module.exports = {
    OAuthStore   : new Oauth2Store(),
    RequestStore : new RequestStore()
};
