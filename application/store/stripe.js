/* globals document */
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

        this.stripeScriptIncluded = false;

        this.bindActions(
            constants.SET_API, 'onSetApi',
            constants.REQUEST_STRIPE_TOKEN, 'onRequestStripeToken',
            constants.REQUEST_STRIPE_TOKEN_SUCCESS, 'onRequestStripeTokenSuccess',
            constants.REQUEST_STRIPE_TOKEN_FAILURE, 'onRequestStripeTokenFailure'
        );
    },

    getState : function()
    {
        return _.extend({}, this.state);
    },

    onSetApi : function()
    {
        // Include remote stripe library if stripe key is set
        this.waitFor(['ConfigStore'], function(configStore) {
            var configState, stripeScriptTag;

            if (this.stripeScriptIncluded) {
                return false;
            }

            configState = configStore.getState();

            if (configState.stripe_key) {
                stripeScriptTag = document.createElement('script');
                stripeScriptTag.type = 'text/javascript';
                stripeScriptTag.src = 'https://js.stripe.com/v2/';
                document.body.appendChild(stripeScriptTag);

                this.stripeScriptIncluded = true;
            }
        });
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
