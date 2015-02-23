'use strict';

module.exports = {
    name      : 'Meta',
    synopsis  : 'This endpoint provides information about GitHub.com, the service. Or, if you access this endpoint on your organization’s GitHub Enterprise installation, this endpoint provides information about that installation.',
    endpoints : [
        {
            name     : 'Meta',
            synopsis : '',
            method   : 'GET',
            uri      : '/meta',
            oauth    : false,
            params   : []
        }
    ]
};
