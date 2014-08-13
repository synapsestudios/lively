'use strict';

var paramOwner = {
    name        : 'owner',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The owner of the repo.'
};

var paramRepo = {
    name        : 'repo',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The name of the repo.'
};

module.exports = {
    name     : 'Pages',
    methods : [
        {
            name     : 'Get information about a Pages site',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/pages',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List Pages builds',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/pages/builds',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List latest Pages build',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/pages/builds/latest',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        }
    ]
};
