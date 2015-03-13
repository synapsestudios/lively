'use strict';

module.exports = {
    name      : 'Feeds',
    endpoints : [
        {
            name     : 'List feeds',
            method   : 'GET',
            uri      : '/feeds',
            oauth    : false,
            params   : []
        }
    ]
};
