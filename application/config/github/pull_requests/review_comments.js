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

var paramNumber = {
    name        : 'number',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The issue number.'
};

var paramId = {
    name        : 'id',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The ID of the comment.'
};

var paramSort = {
    name         : 'sort',
    required     : false,
    defaultValue : 'created',
    type         : 'enum',
    location     : 'query',
    description  : 'Can be either `created` or `updated`.',
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
    description  : 'Can be either `asc` or `desc`. Ignored without `sort` parameter.',
    enumValues   : [
        'desc',
        'asc'
    ]
};

var paramSince = {
    name         : 'since',
    required     : false,
    type         : 'string',
    location     : 'query',
    description  : 'Only comments updated at or after this time are returned. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.'
};

module.exports = {
    name      : 'Review Comments',
    synopsis  : 'Pull Request Review Comments are comments on a portion of the unified diff. These are separate from Commit Comments (which are applied directly to a commit, outside of the Pull Request view), and Issue Comments (which do not reference a portion of the unified diff).',
    endpoints : [
        {
            name     : 'List comments on a pull request',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/pulls/:number/comments',
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
            uri      : '/repos/:owner/:repo/pulls/comments',
            oauth    : false,
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
            uri      : '/repos/:owner/:repo/pulls/comments/:number',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'Create a comment',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/pulls/:number/comments',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber,
                {
                    name         : 'body',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The text of the comment.'
                },
                {
                    name         : 'commit_id',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The SHA of the commit to comment on.'
                },
                {
                    name         : 'path',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The relative path of the file to comment on.'
                },
                {
                    name         : 'position',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The line index in the diff to comment on.'
                }
            ]
        },
        {
            name     : 'Reply to a comment',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/pulls/:number/comments',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber,
                {
                    name         : 'body',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The text of the comment.'
                },
                {
                    name         : 'in_reply_to',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The comment id to reply to.'
                }
            ]
        },
        {
            name     : 'Edit a comment',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo/pulls/comments/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId,
                {
                    name         : 'body',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The text of the comment.'
                }
            ]
        },
        {
            name     : 'Delete a comment',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/pulls/comments/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        }
    ]
};
