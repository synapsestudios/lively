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
    name     : 'Deployments',
    methods : [
        {
            name     : 'List Deployments',
            synopsis : 'Simple filtering of deployments is available via query parameters.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/deployments',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name         : 'sha',
                    required     : false,
                    defaultValue : 'none',
                    type         : 'string',
                    location     : 'query',
                    description  : 'The short or long sha that was recorded at creation time.'
                },
                {
                    name         : 'ref',
                    required     : false,
                    defaultValue : 'none',
                    type         : 'string',
                    location     : 'query',
                    description  : 'The name of the ref. This can be a branch, tag, or sha.'
                },
                {
                    name         : 'task',
                    required     : false,
                    defaultValue : 'none',
                    type         : 'string',
                    location     : 'query',
                    description  : 'The name of the task for the deployment. e.g. deploy or deploy:migrations.'
                },
                {
                    name         : 'environment',
                    required     : false,
                    defaultValue : 'none',
                    type         : 'string',
                    location     : 'query',
                    description  : 'The name of the environment that was deployed to. e.g. staging or production.'
                }
            ]
        },
        {
            name     : 'Create Deployment',
            synopsis : 'Deployments offer a few configurable parameters with sane defaults.',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/deployments',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name         : 'ref',
                    required     : true,
                    defaultValue : '',
                    type         : 'string',
                    location     : 'body',
                    description  : 'The ref to deploy. This can be a branch, tag, or sha.'
                },
                {
                    name         : 'task',
                    required     : false,
                    defaultValue : 'deploy',
                    type         : 'string',
                    location     : 'body',
                    description  : 'Optional parameter to specify a task to execute, e.g. deploy or deploy:migrations.'
                },
                {
                    name         : 'auto_merge',
                    required     : false,
                    defaultValue : 'true',
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Optional parameter to merge the default branch into the requested ref if it is behind the default branch.'
                },
                {
                    name         : 'required_contexts',
                    required     : false,
                    defaultValue : '',
                    type         : 'array',
                    location     : 'body',
                    description  : 'Optional array of status contexts verified against commit status checks. If this parameter is omitted from the parameters then all unique contexts will be verified before a deployment is created. To bypass checking entirely pass an empty array. Defaults to all unique contexts.'
                },
                {
                    name         : 'payload',
                    required     : false,
                    defaultValue : '',
                    type         : 'string',
                    location     : 'body',
                    description  : 'Optional JSON payload with extra information about the deployment.'
                },
                {
                    name         : 'environment',
                    required     : false,
                    defaultValue : 'production',
                    type         : 'string',
                    location     : 'body',
                    description  : 'Optional name for the target deployment environment (e.g., production, staging, qa).'
                },
                {
                    name         : 'description',
                    required     : false,
                    defaultValue : '',
                    type         : 'string',
                    location     : 'body',
                    description  : 'Optional short description.'
                }
            ]
        },
        {
            name     : 'List Deployment Statuses',
            synopsis : 'Users with pull access can view deployment statuses for a deployment.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/deployments/:id/statuses',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name         : 'id',
                    required     : true,
                    defaultValue : '',
                    type         : 'integer',
                    location     : 'uri',
                    description  : 'The Deployment ID to list the statuses from.'
                }
            ]
        },
        {
            name     : 'Create a Deployment Status',
            synopsis : 'Users with push access can create deployment statuses for a given deployment.',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/deployments/:id/statuses',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name         : 'id',
                    required     : true,
                    defaultValue : '',
                    type         : 'integer',
                    location     : 'uri',
                    description  : 'The Deployment ID for which to create the status.'
                },
                {
                    name         : 'state',
                    required     : true,
                    defaultValue : '',
                    type         : 'enum',
                    location     : 'body',
                    description  : 'The state of the status. Can be one of pending, success, error, or failure.',
                    enumValues   : [
                        null,
                        'pending',
                        'success',
                        'error',
                        'failure'
                    ]
                },
                {
                    name         : 'target_url',
                    required     : false,
                    defaultValue : '',
                    type         : 'string',
                    location     : 'body',
                    description  : 'The target URL to associate with this status. This URL should contain output to keep the user updated while the task is running or serve as historical information for what happened in the deployment.'
                },
                {
                    name         : 'description',
                    required     : false,
                    defaultValue : '',
                    type         : 'string',
                    location     : 'body',
                    description  : 'A short description of the status.'
                }
            ]
        }
    ]
};
