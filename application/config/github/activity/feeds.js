'use strict';

module.exports = {
    name     : 'Feeds',
    methods : [
        {
            name     : 'List feeds',
            synopsis : 'GitHub provides several timeline resources in Atom format. The Feeds API lists all the feeds available to the authenticating user',
            method   : 'GET',
            uri      : '/feeds',
            oauth    : true,
            params   : []
        }
    ]
};
