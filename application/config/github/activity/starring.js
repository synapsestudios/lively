'use strict';

var paramOwner = {
    name        : 'owner',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The owner of the repo.'
};

var paramRepo = {
    name         : 'repo',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The name of the repo.'
};

var paramUsername = {
    name         : 'username',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The username of the user.'
};

var paramSort = {
    name         : 'sort',
    required     : false,
    type         : 'enum',
    defaultValue : 'created',
    location     : 'uri',
    description  : 'One of created (when the repository was starred) or updated (when it was last pushed to).',
    enumValues   : [
        'created',
        'updated'
    ]
};

var paramDirection = {
    name         : 'direction',
    required     : false,
    defaultValue : 'desc',
    type         : 'enum',
    location     : 'query',
    description  : 'The direction of the sort.',
    enumValues   : [
        'asc',
        'desc'
    ]
};

module.exports = {
    name     : 'Starring',
    methods : [
        {
            name     : 'List Stargazers',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/stargazers',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List repositories being starred by a user.',
            synopsis : '',
            method   : 'GET',
            uri      : '/users/:username/starred',
            oauth    : false,
            params   : [
                paramUsername,
                paramSort,
                paramDirection
            ]
        },
        {
            name     : 'List repositories being starred by the authenticated user.',
            synopsis : '',
            method   : 'GET',
            uri      : '/user/starred',
            oauth    : true,
            params   : [
                paramSort,
                paramDirection
            ]
        },
        {
            name     : 'Check if you are starring a repository',
            synopsis : 'Requires for the user to be authenticated.',
            method   : 'GET',
            uri      : '/user/starred/:owner/:repo',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Star a repository',
            synopsis : 'Requires for the user to be authenticated.',
            method   : 'PUT',
            uri      : '/user/starred/:owner/:repo',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Unstar a repository',
            synopsis : 'Requires for the user to be authenticated.',
            method   : 'DELETE',
            uri      : '/user/starred/:owner/:repo',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        }
    ]
};
