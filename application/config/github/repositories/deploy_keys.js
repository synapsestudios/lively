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

var paramId = {
    name        : 'id',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The ID of the comment'
};


module.exports = {
    name      : 'Deploy Keys',
    endpoints : [
        {
            name     : 'List deploy keys',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/keys',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Get a deploy key',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/keys/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        },
        {
            name     : 'Add a new deploy key',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/keys',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Remove a deploy key',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/keys/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        }
    ]
};
