'use strict';

var paramId = {
    name        : 'id',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The ID of the key.'
};

var paramUsername = {
    name        : 'username',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The username of the user.'
};

module.exports = {
    name     : 'Public Keys',
    endpoints : [
        {
            name     : 'List public keys for a user',
            synopsis : 'Lists the verified public keys for a user. This is accessible by anyone.',
            method   : 'GET',
            uri      : '/users/:username/keys',
            oauth    : false,
            params   : [
                paramUsername
            ]
        },
        {
            name     : 'List your public keys',
            synopsis : 'Lists the current user’s keys.',
            method   : 'GET',
            uri      : '/user/keys',
            oauth    : true,
            params   : []
        },
        {
            name     : 'Get a single public key',
            synopsis : 'View extended details for a single public key.',
            method   : 'GET',
            uri      : '/user/keys/:id',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Create a public key',
            synopsis : '',
            method   : 'POST',
            uri      : '/user/keys',
            oauth    : true,
            params   : [
                {
                    name        : 'title',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The title of the key.'
                },
                {
                    name        : 'key',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The content of the key.'
                }
            ]
        },
        {
            name     : 'Delete a public key',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/user/keys/:id',
            oauth    : true,
            params   : [
                paramId
            ]
        }
    ]
};
