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

var paramMessage = {
    name        : 'message',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The commit message.'
};

var paramTree = {
    name        : 'tree',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The SHA of the tree object this commit points to.'
};

var paramParents = {
    name        : 'parents',
    required    : true,
    type        : 'array',
    location    : 'uri',
    description : 'The SHAs of the commits that were the parents of this commit. If omitted or empty, the commit will be written as a root commit. For a single parent, an array of one SHA should be provided; for a merge commit, an array of more than one should be provided.'
};

module.exports = {
    name     : 'Git Data Commits',
    methods : [
        {
            name     : 'Get a Commit',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/git/commits/:sha',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramSha
            ]
        },
        {
            name     : 'Create a Commit',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/git/commits',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramMessage,
                paramTree,
                paramParents,
                {
                    name         : 'author',
                    required     : false,
                    type         : 'hash',
                    location     : 'body',
                    description  : 'If the author section is omitted, it will be filled in with the authenticated user\'s information and the current date.',
                    params       : [
                        {
                            name        : 'name',
                            type        : 'string',
                            required    : false,
                            location    : 'body',
                            description : 'The name of the author (or commiter) of the commit'
                        },
                        {
                            name        : 'email',
                            type        : 'string',
                            required    : false,
                            location    : 'body',
                            description : 'The email of the author (or commiter) of the commit'
                        },
                        {
                            name        : 'date',
                            type        : 'string',
                            required    : false,
                            location    : 'body',
                            description : 'Indicates when this commit was authored (or committed). This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.'
                        }
                    ]
                },
                {
                    name         : 'committer',
                    required     : false,
                    type         : 'hash',
                    location     : 'body',
                    description  : 'The committer section is optional and will be filled with the author data if omitted.',
                    params       : [
                        {
                            name        : 'name',
                            type        : 'string',
                            required    : false,
                            location    : 'body',
                            description : 'The name of the author (or commiter) of the commit'
                        },
                        {
                            name        : 'email',
                            type        : 'string',
                            required    : false,
                            location    : 'body',
                            description : 'The email of the author (or commiter) of the commit'
                        },
                        {
                            name        : 'date',
                            type        : 'string',
                            required    : false,
                            location    : 'body',
                            description : 'Indicates when this commit was authored (or committed). This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.'
                        }
                    ]
                }
            ]
        }
    ]
};
