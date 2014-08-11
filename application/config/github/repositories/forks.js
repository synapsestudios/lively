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
    name     : 'Forks',
    methods : [
        {
            name     : 'List forks',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/forks',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'sort',
                    required    : false,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The sort order. Can be either newest, oldest, or stargazers. Default: newest'
                }
            ]
        },
        {
            name     : 'Create a fork',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/forks',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'organization',
                    required    : false,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The organization login. The repository will be forked into this organization.'
                }
            ]
        }
    ]
};
