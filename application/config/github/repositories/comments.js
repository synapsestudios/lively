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

var paramUsername = {
    name        : 'username',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The username of the user.'
};

var paramId = {
    name        : 'id',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The ID of the comment'
};

module.exports = {
    name     : 'Comments',
    methods : [
        {
            name     : 'List commit comments for a repository',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/comments',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List comments for a single commit',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/commits/:ref/comments',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'ref',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The commit ref'
                }
            ]
        },
        {
            name     : 'Create a commit comment',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/commits/:sha/comments',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'sha',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The SHA of the commit to comment on.'
                },
                {
                    name        : 'body',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The contents of the comment.'
                },
                {
                    name        : 'path',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'Relative path of the file to comment on.'
                },
                {
                    name        : 'position',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'Line index in the diff to comment on.'
                }
            ]
        },
        {
            name     : 'Get a single commit comment',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/comments/:id',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        },
        {
            name     : 'Update a commit comment',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo/comments/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId,
                {
                    name        : 'body',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The contents of the comment.'
                }
            ]
        },
        {
            name     : 'Delete a commit comment',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/comments/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        }
    ]
};
