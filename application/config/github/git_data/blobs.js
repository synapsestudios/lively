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

var paramSha = {
    name        : 'sha',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The name of the SHA.'
};

var paramContent = {
    name        : 'content',
    required    : true,
    type        : 'string',
    location    : 'body',
    description : 'The content of the blob.'
};

var paramEncoding = {
    name        : 'encoding',
    required    : true,
    type        : 'string',
    location    : 'body',
    description : 'The encoding of the blob.'
};

module.exports = {
    name     : 'Blobs',
    synopsis : 'Since blobs can be any arbitrary binary data, the input and responses for the blob API takes an encoding parameter that can be either `utf-8` or `base64`. If your data cannot be losslessly sent as a UTF-8 string, you can base64 encode it.',
    methods : [
        {
            name     : 'Get a Blob',
            synopsis : 'This API supports blobs up to 100 megabytes in size.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/git/blobs/:sha',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramSha
            ]
        },
        {
            name     : 'Create a Blob',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/git/blobs',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramContent,
                paramEncoding
            ]
        },
    ]
};
