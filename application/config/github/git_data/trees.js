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

module.exports = {
    name     : 'Trees',
    methods : [
        {
            name     : 'Get a Tree',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/git/trees/:sha',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramSha,
                {
                    name         : 'recursive',
                    required     : false,
                    type         : 'integer',
                    defaultValue : 0,
                    location     : 'query',
                    description  : 'Set this value to `1` in order to get the tree recursively.'
                }
            ]
        },
        {
            name     : 'Create a Tree',
            synopsis : 'The tree creation API will take nested entries as well. If both a tree and a nested path modifying that tree are specified, it will overwrite the contents of that tree with the new path contents and write a new tree out.',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/git/trees/:sha',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramSha,
                {
                    name         : 'tree',
                    required     : true,
                    type         : 'array',
                    location     : 'body',
                    description  : 'An array of hashes. Objects (of `path`, `mode`, `type`, and `sha`) specifying a tree structure.' // @todo implement hash/array support
                },
                {
                    name         : 'base_tree',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The SHA1 of the tree you want to update with new data. If you don’t set this, the commit will be created on top of everything; however, it will only contain your change, the rest of your files will show up as deleted.'
                }
            ]
        }
    ]
};
