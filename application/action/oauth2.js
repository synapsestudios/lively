'use strict';

var constants = require('../constants');

module.exports = {

    setOptions : function(data)
    {
        this.dispatch(constants.OAUTH2_SET_OPTIONS, data);
    },

    setToken : function(data)
    {
        this.dispatch(constants.OAUTH2_SET_TOKEN, data);
    },

    request : function(method, path, data, cb)
    {

    },

    oauth2Request : function(method, path, data, cb)
    {

    },

};
