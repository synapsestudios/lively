'use strict';

var Oauth2Store = require('./store/oauth2');

module.exports = {
    oauth2 : new Oauth2Store(),
};
