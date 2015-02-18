'use strict';

var _          = require('underscore');
var dispatcher = require('synapse-common/lib/dispatcher');

module.exports = {

    componentWillMount : function()
    {
        this.eventSubscriptions = [];
    },

    componentWillUnmount : function()
    {
        _.each(this.eventSubscriptions, function(subscription) {
            dispatcher.removeListener(subscription.event, subscription.subscriber);
        });
    },

    subscribe : function(event, subscriber)
    {
        this.eventSubscriptions.push({
            event      : event,
            subscriber : subscriber
        });

        dispatcher.on(event, subscriber);
    }
};
