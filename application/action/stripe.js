/* globals Stripe */
'use strict';

var constants = require('../constants');

module.exports = {
    requestToken : function(key, paramName, endpointName)
    {
        var flux = this;

        flux.dispatch(constants.REQUEST_STRIPE_TOKEN, {
            endpoint  : endpointName,
            paramName : paramName
        });

        Stripe.setPublishableKey(key);

        Stripe.card.createToken({
            "number"    : '4242424242424242',
            "exp_month" : 12,
            "exp_year"  : new Date().getFullYear() + 1,
            "cvc"       : '123'
        }, function(status, response) {
            if (status !== 200) {
                flux.dispatch(constants.REQUEST_STRIPE_TOKEN_FAILURE);
            } else {
                flux.dispatch(constants.REQUEST_STRIPE_TOKEN_SUCCESS, response);
            }
        });
    }
};
