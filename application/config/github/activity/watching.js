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

var paramUsername = {
    name        : 'username',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The username of the user.'
};

module.exports = {
    name      : 'Watching',
    endpoints : [
        {
            name     : 'List Watchers',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/subscribers',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List repositories being watched by a user.',
            synopsis : '',
            method   : 'GET',
            uri      : '/users/:username/subscriptions',
            oauth    : false,
            params   : [
                paramUsername
            ]
        },
        {
            name     : 'List repositories being watched by the authenticated user.',
            synopsis : '',
            method   : 'GET',
            uri      : '/user/subscriptions',
            oauth    : true,
            params   : []
        },
        {
            name     : 'Get a Repository Subscription',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/subscription',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Set a Repository Subscription',
            synopsis : '',
            method   : 'PUT',
            uri      : '/repos/:owner/:repo/subscription',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'subscribed',
                    required    : true,
                    type        : 'boolean',
                    location    : 'uri',
                    description : 'Determines if notifications should be received from this repository.'
                },
                {
                    name        : 'ignored',
                    required    : true,
                    type        : 'boolean',
                    location    : 'uri',
                    description : 'Determines if all notifications should be blocked from this repository.'
                }
            ]
        },
        {
            name     : 'Delete a Repository Subscription',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/subscription',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Check if you are watching a repository (LEGACY)',
            synopsis : 'Requires for the user to be authenticated.',
            method   : 'GET',
            uri      : '/user/subscriptions/:owner/:repo',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Watch a repository (LEGACY)',
            synopsis : 'Requires for the user to be authenticated.',
            method   : 'PUT',
            uri      : '/user/subscriptions/:owner/:repo',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Stop watching a repository (LEGACY)',
            synopsis : 'Requires for the user to be authenticated.',
            method   : 'DELETE',
            uri      : '/user/subscriptions/:owner/:repo',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        }
    ]
};
