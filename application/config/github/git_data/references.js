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

var paramRef = {
    name        : 'ref',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The `ref` in the URL must be formatted as `heads/branch`, not just `branch`. For example, the call to get the data for a branch named `skunkworkz/featureA` would be: `GET /repos/:owner/:repo/git/refs/heads/skunkworkz/featureA`'
};

module.exports = {
    name     : 'References',
    methods : [
        {
            name     : 'Get a Reference',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/git/refs/:ref',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramRef
            ]
        },
        {
            name     : 'Get all References',
            synopsis : 'This will return an array of all the references on the system, including things like notes and stashes if they exist on the server. Anything in the namespace, not just `heads` and `tags`, though that would be the most common. You can also request a sub-namespace. For example, to get all the tag references, you can call: `GET /repos/:owner/:repo/git/refs/tags`',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/git/refs',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Create a Reference',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/git/refs',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'ref',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The name of the fully qualified reference (ie: `refs/heads/master`). If it doesn’t start with ‘refs’ and have at least two slashes, it will be rejected.'
                },
                {
                    name        : 'sha',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The SHA1 value to set this reference to.'
                }
            ]
        },
        {
            name     : 'Update a Reference',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo/git/refs/:ref',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramRef,
                {
                    name        : 'sha',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The SHA1 value to set this reference to.'
                },
                {
                    name         : 'ref',
                    required     : false,
                    defaultValue : false,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Indicates whether to force the update or to make sure the update is a fast-forward update. Leaving this out or setting it to `false` will make sure you’re not overwriting work. Default: `false`'
                }
            ]
        },
        {
            name     : 'Delete a Reference',
            synopsis : 'Example: Deleting a branch: `DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a`. Example: Deleting a tag: `DELETE /repos/octocat/Hello-World/git/refs/tags/v1.0`',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/git/refs/:ref',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramRef
            ]
        }
    ]
};
