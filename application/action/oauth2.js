'use strict';

var constants = require('../constants');

module.exports = {

    setApi : function(apiSlug)
    {
        this.dispatch(constants.SET_API, apiSlug);
    },

    setToken : function(data)
    {
        this.dispatch(constants.SET_TOKEN, data);
    }
};
