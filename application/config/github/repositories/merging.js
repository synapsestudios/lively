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

module.exports = {
    name     : 'Merging',
    methods : [
        {
            name     : 'Perform a Merge',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/merges',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'base',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The name of the base branch that the head will be merged into.'
                },
                {
                    name        : 'head',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The head to merge. This can be a branch name or a commit SHA1.'
                },
                {
                    name        : 'commit_message',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'Commit message to use for the merge commit. If omitted, a default message will be used.'
                }
            ]
        }
    ]
};
