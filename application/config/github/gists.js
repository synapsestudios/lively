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

var paramId = {
    name        : 'id',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The ID of the gist.'
};

var paramSHA = {
    name        : 'sha',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The SHA for the specific revision of the gist.'
};

module.exports = {
    name     : 'Gists',
    synopsis : 'You can read public gists and create them for anonymous users without a token; however, to read or write gists on a user’s behalf the **gist** OAuth scope is required.',
    endpoints : [
        {
            name     : 'List gists',
            synopsis : 'List the authenticated user’s gists or if called anonymously, this will return all public gists',
            method   : 'GET',
            uri      : '/gists',
            oauth    : false,
            params   : [
                paramSince
            ]
        },
        {
            name     : 'List a user’s gists',
            synopsis : '',
            method   : 'GET',
            uri      : '/users/:user/gists',
            oauth    : false,
            params   : [
                paramUser,
                paramSince
            ]
        },
        {
            name     : 'List all public gists',
            synopsis : '',
            method   : 'GET',
            uri      : '/gists/public',
            oauth    : false,
            params   : [
                paramSince
            ]
        },
        {
            name     : 'List the authenticated user’s starred gists',
            synopsis : '',
            method   : 'GET',
            uri      : '/gists/starred',
            oauth    : true,
            params   : [
                paramSince
            ]
        },
        {
            name     : 'Get a single gist',
            synopsis : '',
            method   : 'GET',
            uri      : '/gists/:id',
            oauth    : false,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Get a specific revision of a gist',
            synopsis : '',
            method   : 'GET',
            uri      : '/gists/:id/:sha',
            oauth    : false,
            params   : [
                paramId,
                paramSHA
            ]
        },
        {
            name     : 'Create a gist',
            synopsis : 'Note: Don\'t name your files "gistfile" with a numerical suffix. This is the format of the automatic naming scheme that Gist uses internally.',
            method   : 'POST',
            uri      : '/gists',
            oauth    : true,
            params   : [
                {
                    name        : 'files',
                    required    : true,
                    type        : 'hash with variable keys',
                    location    : 'body',
                    description : 'Files that make up this gist.' // @todo add hash support
                },
                {
                    name        : 'description',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'A description of the gist.'
                },
                {
                    name         : 'public',
                    required     : false,
                    defaultValue : false,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Indicates whether the gist is public.'
                }
            ]
        },
        {
            name     : 'Edit a gist',
            synopsis : '**Note**: All files from the previous version of the gist are carried over by default if not included in the hash. Deletes can be performed by including the filename with a `null` hash.',
            method   : 'PATCH',
            uri      : '/gists/:id',
            oauth    : true,
            params   : [
                paramId,
                {
                    name        : 'description',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'A description of the gist.'
                },
                {
                    name        : 'files',
                    required    : false,
                    type        : 'hash with variable keys',
                    location    : 'body',
                    description : 'Files that make up this gist.' // @todo add hash support
                },
               {
                    name        : 'content',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'Updated file contents.'
                },
               {
                    name        : 'filename',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'New name for this file.'
                }
            ]
        },
        {
            name     : 'List gist commits',
            synopsis : '',
            method   : 'GET',
            uri      : '/gists/:id/commits',
            oauth    : false,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Star a gist',
            synopsis : '',
            method   : 'PUT',
            uri      : '/gists/:id/star',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Unstar a gist',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/gists/:id/star',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Check if a gist is starred',
            synopsis : '',
            method   : 'GET',
            uri      : '/gists/:id/star',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Fork a gist',
            synopsis : '',
            method   : 'POST',
            uri      : '/gists/:id/forks',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'List gist forks',
            synopsis : '',
            method   : 'GET',
            uri      : '/gists/:id/forks',
            oauth    : false,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Delete a gist',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/gists/:id',
            oauth    : true,
            params   : [
                paramId
            ]
        }
    ],
    resources : [
        require('./gists/comments')
    ]
};
