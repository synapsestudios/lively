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

var paramId = {
    name        : 'id',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The ID of the hook'
};

module.exports = {
    name     : 'Hooks',
    methods : [
        {
            name     : 'List hooks',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/hooks',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Get single hook',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/hooks/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        },
        {
            name     : 'Create a hook',
            synopsis : 'Note: Repositories can have more than one webhook configured, but all other services can have at most one configuration. Creating hooks for a service that already has one configured will update the existing hook.',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/hooks',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'name',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'Required. The name of the service that is being called. (See /hooks for the list of valid hook names.)'
                },
                {
                    name        : 'config',
                    required    : true,
                    type        : 'hash with variable keys',
                    location    : 'body',
                    description : 'Key/value pairs to provide settings for this hook. These settings vary between the services and are defined in the github-services repository. Booleans are stored internally as “1” for true, and “0” for false. Any JSON true/false values will be converted automatically.'
                },
                {
                    name         : 'events',
                    required     : false,
                    defaultValue : ['push'],
                    type         : 'array[string]',
                    location     : 'body',
                    description  : 'Determines what events the hook is triggered for.'
                },
                {
                    name        : 'active',
                    required    : false,
                    type        : 'boolean',
                    location    : 'body',
                    description : 'Determines whether the hook is actually triggered on pushes.'
                }
            ]
        },
        {
            name     : 'Test a push hook',
            synopsis : 'This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated.',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/hooks/:id/tests',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        },
        {
            name     : 'Ping a hook',
            synopsis : 'This will trigger a ping event to be sent to the hook.',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/hooks/:id/pings',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        },
        {
            name     : 'Delete a hook',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/hooks/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        }
    ]
};
