'use strict';

var paramOwner = {
    name        : 'owner',
    required    : true,
    type        : 'string',
    description : 'The owner of the repo.'
};

var paramRepo = {
    name        : 'repo',
    required    : true,
    type        : 'string',
    description : 'The name of the repo.'
};

var paramNumber = {
    name        : 'number',
    required    : true,
    type        : 'integer',
    description : 'The issue number.'
};

var paramSort = {
    name         : 'sort',
    required     : false,
    defaultValue : 'created',
    type         : 'enum',
    description  : 'What to sort results by.',
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
    description  : 'The direction of the sort. Ignored without the `sort` parameter.',
    enumValues   : [
        'desc',
        'asc'
    ]
};

var paramSince = {
    name         : 'since',
    required     : false,
    type         : 'string',
    description  : 'Only comments updated at or after this time are returned. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.'
};

var paramId = {
    name         : 'id',
    required     : true,
    type         : 'integer',
    description  : 'The ID of the comment'
}

var paramBody = {
    name         : 'body',
    required     : true,
    type         : 'string',
    description  : 'The contents of the comment'
}

module.exports = {
    name    : 'Comments',
    methods : [
        {
            name     : 'List comments on an issue',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/issues/:number/comments',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'List comments in a repository',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/issues/comments',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramSort,
                paramDirection,
                paramSince
            ]
        },
        {
            name     : 'Get a single comment',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/issues/comments/:id',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        },
        {
            name     : 'Create a comment',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/issues/:number/comments',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber,
                paramBody
            ]
        },
        {
            name     : 'Edit a comment',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo/issues/comments/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId,
                paramBody
            ]
        },
        {
            name     : 'Delete a comment',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/issues/comments/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        }
    ]
};
