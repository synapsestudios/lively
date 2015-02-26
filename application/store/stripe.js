'use strict';

var _         = require('underscore');
var constants = require('../constants');
var Fluxxor   = require('fluxxor');

module.exports = Fluxxor.createStore({

    initialize : function(options)
    {
        this.state = {
            endpoint : {}
        };

        this.bindActions(
            constants.REQUEST_STRIPE_TOKEN, 'onRequestStripeToken',
            constants.REQUEST_STRIPE_TOKEN_SUCCESS, 'onRequestStripeTokenSuccess',
            constants.REQUEST_STRIPE_TOKEN_FAILURE, 'onRequestStripeTokenFailure'
        );
    },

    getState : function()
    {
        return _.extend({}, this.state);
    },

    onRequestStripeToken : function(data)
    {
        this.state.currentEndpoint = data.endpoint;

        this.state.endpoint[this.state.currentEndpoint] = {
            loading   : true,
            error     : false,
            token     : null,
            paramName : data.paramName
        };

        this.emit('change');
    },

    onRequestStripeTokenSuccess : function(response)
    {
        this.state.endpoint[this.state.currentEndpoint].token   = response.id;
        this.state.endpoint[this.state.currentEndpoint].loading = false;
        this.state.endpoint[this.state.currentEndpoint].error   = false;

        this.emit('change');
    },

    onRequestStripeTokenFailure : function()
    {
        this.state.endpoint[this.state.currentEndpoint].loading = false;
        this.state.endpoint[this.state.currentEndpoint].error   = true;

        this.emit('change');
    }
});
