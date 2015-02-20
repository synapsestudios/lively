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

var paramState = {
    name         : 'state',
    required     : false,
    defaultValue : 'open',
    type         : 'enum',
    location     : 'query',
    description  : 'The state of the milestone.',
    enumValues   : [
        'open',
        'closed'
    ]
};

var paramSort = {
    name         : 'sort',
    required     : false,
    defaultValue : 'due_date',
    type         : 'enum',
    location     : 'query',
    description  : 'What to sort results by.',
    enumValues   : [
        'due_date',
        'completeness'
    ]
};

var paramDirection = {
    name         : 'direction',
    required     : false,
    defaultValue : 'asc',
    type         : 'enum',
    location     : 'query',
    description  : 'The direction of the sort.',
    enumValues   : [
        'asc',
        'desc'
    ]
};

var paramNumber = {
    name        : 'number',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The milestone number.'
};

module.exports = {
    name    : 'Milestones',
    endpoints : [
        {
            name     : 'List milestones for a repository',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/milestones',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramState,
                paramSort,
                paramDirection
            ]
        },
        {
            name     : 'Get a single milestone',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/milestones/:number',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'Create a milestone',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/milestones',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name         : 'title',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The title of the milestone.'
                },
                {
                    name         : 'state',
                    required     : false,
                    defaultValue : 'open',
                    type         : 'enum',
                    location     : 'body',
                    description  : 'The state of the milestone.',
                    enumValues   : [
                        'open',
                        'closed'
                    ]
                },
                {
                    name         : 'description',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'A description of the milestone.'
                },
                {
                    name         : 'due_on',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The milestone due date. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.'
                }
            ]
        },
{
            name     : 'Update a milestone',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo/milestones/:number',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber,
                {
                    name         : 'title',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The title of the milestone.'
                },
                {
                    name         : 'state',
                    required     : false,
                    defaultValue : 'open',
                    type         : 'enum',
                    location     : 'body',
                    description  : 'The state of the milestone.',
                    enumValues   : [
                        'open',
                        'closed'
                    ]
                },
                {
                    name         : 'description',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'A description of the milestone.'
                },
                {
                    name         : 'due_on',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The milestone due date. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.'
                }
            ]
        },
        {
            name     : 'Delete a milestone',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/milestones/:number',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        }
    ]
};
