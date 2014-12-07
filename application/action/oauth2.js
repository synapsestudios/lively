'use strict';

var constants = require('../constants');

module.exports = {

    setApi : function(apiSlug)
    {
        this.dispatch(constants.SET_API, apiSlug);
    },

    setToken : function(data)
    {
        this.dispatch(constants.OAUTH2_SET_TOKEN, data);
    },

    setOptions : function(options)
    {
        this.dispatch(constants.OAUTH_SET_CLIENT_OPTIONS, options);
    }

};
