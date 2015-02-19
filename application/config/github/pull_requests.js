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

var paramState = {
    name         : 'state',
    required     : false,
    defaultValue : 'open',
    type         : 'enum',
    location     : 'query',
    description  : 'Either `open`, `closed`, or `all` to filter by state.',
    enumValues   : [
        'open',
        'closed',
        'all'
    ]
};

var paramHead = {
    name         : 'head',
    required     : false,
    type         : 'string',
    location     : 'query',
    description  : 'Filter pulls by head user and branch name in the format of `user:ref-name`. Example: `github:new-script-format`.'
};

var paramBase = {
    name         : 'base',
    required     : false,
    type         : 'string',
    location     : 'query',
    description  : 'Filter pulls by base branch name. Example: `gh-pages`.'
};

var paramSort = {
    name         : 'sort',
    required     : false,
    defaultValue : 'created',
    type         : 'enum',
    location     : 'query',
    description  : 'What to sort results by. Can be either `created`, `updated`, `popularity` (comment count) or `long-running` (age, filtering by pulls updated in the last month).',
    enumValues   : [
        'created',
        'updated',
        'popularity',
        'long-running'
    ]
};

var paramDirection = {
    name         : 'direction',
    required     : false,
    defaultValue : '`desc` when sort is `created` or sort is not specified, otherwise `asc`.',
    type         : 'enum',
    location     : 'query',
    description  : 'The direction of the sort. Can be either `asc` or `desc`.',
    enumValues   : [
        'desc',
        'asc'
    ]
};

var paramNumber = {
    name        : 'number',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The issue number.'
};

module.exports = {
    name     : 'Pull Requests',
    synopsis : 'The Pull Request API allows you to list, view, edit, create, and even merge pull requests. Comments on pull requests can be managed via the Issue Comments API.',
    methods : [
        {
            name     : 'List pull requests',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/pulls',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramState,
                paramHead,
                paramBase,
                paramSort,
                paramDirection
            ]
        },
        {
            name     : 'Get a single pull request',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/pulls/:number',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'Create a pull request',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/pulls',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name         : 'title',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The title of the pull request.'
                },
                {
                    name         : 'head',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace head with a user like this: `username:branch`.'
                },
                {
                    name         : 'base',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The name of the branch you want your changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository.'
                },
                {
                    name         : 'body',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The contents of the pull request.'
                }
            ]
        },
        {
            name     : 'Create a pull request from issue',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/pulls',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name         : 'issue',
                    required     : true,
                    type         : 'integer',
                    location     : 'body',
                    description  : 'The issue number in this repository to turn into a Pull Request.'
                },
                {
                    name         : 'head',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace head with a user like this: `username:branch`.'
                },
                {
                    name         : 'base',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The name of the branch you want your changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository.'
                }
            ]
        },
        {
            name     : 'Update a pull request',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo/pulls/:number',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber,
                {
                    name         : 'title',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The title of the pull request.'
                },
                {
                    name         : 'body',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The contents of the pull request.'
                },
                {
                    name         : 'state',
                    required     : false,
                    type         : 'enum',
                    location     : 'body',
                    description  : 'State of this Pull Request. Either `open` or `closed`.',
                    enumValues   : [
                        'open',
                        'closed'
                    ]
                }
            ]
        },
        {
            name     : 'List commits on a pull request',
            synopsis : 'Note: The response includes a maximum of 250 commits. If you are working with a pull request larger than that, you can use the Commit List API to enumerate all commits in the pull request.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/pulls/:number/commits',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'List pull requests files',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/pulls/:number/files',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'Get if a pull request has been merged',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/pulls/:number/merge',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'Merge a pull request (Merge Button)',
            synopsis : '',
            method   : 'PUT',
            uri      : '/repos/:owner/:repo/pulls/:number/merge',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber,
                {
                    name         : 'commit_message',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The message that will be used for the merge commit.'
                }
            ]
        }
    ],
    resources : [
        require('./pull_requests/review_comments')
    ]
};
