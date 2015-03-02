'use strict';

var _         = require('underscore');
var constants = require('../constants');
var Fluxxor   = require('fluxxor');
var config    = require('../config');

module.exports = Fluxxor.createStore({

    initialize : function(options)
    {
        this.state = {};

        this.bindActions(
            constants.SET_API, 'onSetApi'
        );
    },

    onSetApi : function(apiSlug)
    {
        this.state = config.apis[apiSlug];

        this.emit('change');
    },

    getState : function()
    {
        return _.extend({}, this.state);
    }
});
