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
    name     : 'Statuses',
    methods : [
        {
            name     : 'Create a Status',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/statuses/:sha',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'sha',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The SHA of the commit.'
                },
                {
                    name        : 'state',
                    required    : true,
                    type        : 'enum',
                    location    : 'body',
                    description : 'The state of the status. Can be one of pending, success, error, or failure.',
                    enumValues  : [
                        'pending',
                        'success',
                        'error',
                        'failure'
                    ]
                },
                {
                    name         : 'target_url',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The target URL to associate with this status. This URL will be linked from the GitHub UI to allow users to easily see the ‘source’ of the Status.'
                },
                {
                    name         : 'description',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'A short description of the status.'
                },
                {
                    name         : 'context',
                    required     : false,
                    defaultValue : 'default',
                    type         : 'string',
                    location     : 'body',
                    description  : 'A string label to differentiate this status from the status of other systems. Default: "default"'
                }
            ]
        },
        {
            name     : 'List Statuses for a specific Ref',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/commits/:ref/statuses',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'ref',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'Ref to list the statuses from. It can be a SHA, a branch name, or a tag name.'
                }
            ]
        },
        {
            name     : 'Get the combined Status for a specific Ref',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/commits/:ref/status',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'ref',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'Ref to fetch the status for. It can be a SHA, a branch name, or a tag name.'
                }
            ]
        }
    ]
};
