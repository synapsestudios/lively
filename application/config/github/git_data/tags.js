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
    name     : 'Tags',
    synopsis : 'This tags API only deals with tag objects - so only annotated tags, not lightweight tags.',
    methods : [
        {
            name     : 'Get a Tag',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/git/tags/:sha',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramSha
            ]
        },
        {
            name     : 'Create a Tag Object',
            synopsis : 'Note that creating a tag object does not create the reference that makes a tag in Git. If you want to create an annotated tag in Git, you have to do this call to create the tag object, and then create the `refs/tags/[tag]` reference. If you want to create a lightweight tag, you only have to create the tag reference - this call would be unnecessary.',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/git/tags',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'tag',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The tag.'
                },
                {
                    name        : 'message',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The message.'
                },
                {
                    name        : 'object',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The SHA of the git object this is tagging.'
                },
                {
                    name        : 'type',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The type of the object we’re tagging. Normally this is a `commit` but it can also be a `tree` or a `blob`.'
                },
                {
                    name        : 'tagger',
                    required    : false,
                    type        : 'hash',
                    location    : 'body',
                    description : 'A hash with information about the individual creating the tag.' // @todo support hashes
                }
            ]
        }
    ]
};
