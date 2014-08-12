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

var paramPath = {
    name        : 'path',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The path of the content.'
};

module.exports = {
    name     : 'Contents',
    methods : [
        {
            name     : 'Get the README',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/commits',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'ref',
                    required    : false,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The name of the commit/branch/tag. Default: the repository’s default branch (usually master)'
                }
            ]
        },
        {
            name     : 'Get contents',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/contents/:path',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramPath,
                {
                    name        : 'ref',
                    required    : false,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The name of the commit/branch/tag. Default: the repository’s default branch (usually master)'
                }
            ]
        },
        {
            name     : 'Create a file',
            synopsis : '',
            method   : 'PUT',
            uri      : '/repos/:owner/:repo/contents/:path',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramPath,
                {
                    name        : 'message',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The commit message.'
                },
                {
                    name        : 'content',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The new file content, Base64 encoded.'
                },
                {
                    name        : 'branch',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The branch name. Default: the repository’s default branch (usually master)'
                }
            ]
        },
        {
            name     : 'Update a file',
            synopsis : '',
            method   : 'PUT',
            uri      : '/repos/:owner/:repo/contents/:path',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramPath,
                {
                    name        : 'message',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The commit message.'
                },
                {
                    name        : 'content',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The new file content, Base64 encoded.'
                },
                {
                    name        : 'sha',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The blob SHA of the file being replaced.'
                },
                {
                    name        : 'branch',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The branch name. Default: the repository’s default branch (usually master)'
                }
            ]
        },
        {
            name     : 'Delete a file',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/contents/:path',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramPath,
                {
                    name        : 'message',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The commit message.'
                },
                {
                    name        : 'sha',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The blob SHA of the file being replaced.'
                },
                {
                    name        : 'branch',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The branch name. Default: the repository’s default branch (usually master)'
                }
            ]
        },
        {
            name     : 'Get archive link',
            synopsis : 'This method will return a 302 to a URL to download a tarball or zipball archive for a repository. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/:archive_format/:ref',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'archive_format',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'Can be either tarball or zipball. Default: tarball'
                },
                {
                    name        : 'ref',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'A valid Git reference. Default: the repository’s default branch (usually master)'
                }
            ]
        }
    ]
};
