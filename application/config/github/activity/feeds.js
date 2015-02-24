'use strict';

var listFeedsSummary = require('./list-feeds-summary.md');

module.exports = {
    name      : 'Feeds',
    endpoints : [
        {
            name     : 'List feeds',
            synopsis : listFeedsSummary,
            method   : 'GET',
            uri      : '/feeds',
            oauth    : false,
            params   : []
        }
    ]
};
