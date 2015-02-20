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
    name      : 'Contents',
    endpoints : [
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
                    name         : 'ref',
                    required     : false,
                    defaultValue : 'master',
                    type         : 'string',
                    location     : 'uri',
                    description  : 'The name of the commit/branch/tag.'
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
                    name         : 'ref',
                    required     : false,
                    defaultValue : 'master',
                    type         : 'string',
                    location     : 'uri',
                    description  : 'The name of the commit/branch/tag.'
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
                    name         : 'branch',
                    required     : false,
                    defaultValue : 'master',
                    type         : 'string',
                    location     : 'body',
                    description  : 'The branch name.'
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
                    name         : 'branch',
                    required     : false,
                    defaultValue : 'master',
                    type         : 'string',
                    location     : 'body',
                    description  : 'The branch name.'
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
                    name         : 'branch',
                    required     : false,
                    defaultValue : 'master',
                    type         : 'string',
                    location     : 'body',
                    description  : 'The branch name.'
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
                    name         : 'archive_format',
                    required     : true,
                    defaultValue : 'tarball',
                    type         : 'enum',
                    location     : 'uri',
                    description  : 'Can be either tarball or zipball.',
                    enumValues   : [
                        'tarball',
                        'zipball'
                    ]
                },
                {
                    name         : 'ref',
                    required     : true,
                    defaultValue : 'master',
                    type         : 'string',
                    location     : 'uri',
                    description  : 'A valid Git reference.'
                }
            ]
        }
    ]
};
