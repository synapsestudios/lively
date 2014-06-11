'use strict';

var paramUser = {
    name        : 'user',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The user.'
};

var paramSince = {
    name         : 'since',
    required     : false,
    type         : 'string',
    location     : 'query',
    description  : 'A timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. Only gists updated at or after this time are returned.'
};

var paramGistId = {
    name        : 'gist_id',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The ID of the gist.'
};

var paramId = {
    name        : 'id',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The ID of the gist comment.'
};

module.exports = {
    name     : 'GistsComments',
    methods : [
        {
            name     : 'List comments on a gist',
            synopsis : '',
            method   : 'GET',
            uri      : '/gists/:gist_id/comments',
            oauth    : false,
            params   : [
                paramGistId
            ]
        },
        {
            name     : 'Get a single comment',
            synopsis : '',
            method   : 'GET',
            uri      : '/gists/:gist_id/comments/:id',
            oauth    : false,
            params   : [
                paramGistId,
                paramId
            ]
        },
        {
            name     : 'Create a comment',
            synopsis : '',
            method   : 'POST',
            uri      : '/gists/:gist_id/comments',
            oauth    : true,
            params   : [
                paramGistId,
                {
                    name        : 'body',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The comment text.'
                }
            ]
        },
        {
            name     : 'Edit a comment',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/gists/:gist_id/comments/:id',
            oauth    : true,
            params   : [
                paramGistId,
                paramId,
                {
                    name        : 'body',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The comment text.'
                }
            ]
        },
        {
            name     : 'Delete a comment',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/gists/:gist_id/comments/:id',
            oauth    : true,
            params   : [
                paramGistId,
                paramId
            ]
        }
    ]
};
