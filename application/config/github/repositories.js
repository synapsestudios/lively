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

var paramOrg = {
    name        : 'org',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The name of the organization.'
};

module.exports = {
    name     : 'Repositories',
    methods : [
        {
            name     : 'List your repositories',
            synopsis : 'List repositories for the authenticated user. Note that this does not include repositories owned by organizations which the user can access. You can list user organizations and list organization repositories separately.',
            method   : 'GET',
            uri      : '/user/repos',
            oauth    : true,
            params   : [
                {
                    name         : 'type',
                    required     : false,
                    defaultValue : 'all',
                    type         : 'enum',
                    location     : 'uri',
                    description  : 'Can be one of all, owner, public, private, member. Default: all',
                    enumValues   : [
                        'all',
                        'owner',
                        'public',
                        'private',
                        'member'
                    ]
                },
                {
                    name         : 'sort',
                    required     : false,
                    defaultValue : 'full_name',
                    type         : 'enum',
                    location     : 'uri',
                    description  : 'Can be one of created, updated, pushed, full_name. Default: full_name',
                    enumValues   : [
                        'created',
                        'updated',
                        'pushed',
                        'full_name'
                    ]
                },
                {
                    name         : 'direction',
                    required     : false,
                    defaultValue : 'desc',
                    type         : 'enum',
                    location     : 'uri',
                    description  : 'Can be one of asc or desc. Default: when using full_name: asc; otherwise desc',
                    enumValues   : [
                        'asc',
                        'desc'
                    ]
                }
            ]
        },
        {
            name     : 'List user repositories',
            synopsis : 'List public repositories for the specified user.',
            method   : 'GET',
            uri      : '/users/:username/repos',
            oauth    : false,
            params   : [
                paramUsername,
                {
                    name         : 'type',
                    required     : false,
                    defaultValue : 'owner',
                    type         : 'enum',
                    location     : 'uri',
                    description  : 'Can be one of all, owner, member. Default: owner',
                    enumValues   : [
                        'all',
                        'owner',
                        'member'
                    ]
                },
                {
                    name         : 'sort',
                    required     : false,
                    defaultValue : 'full_name',
                    type         : 'enum',
                    location     : 'uri',
                    description  : 'Can be one of created, updated, pushed, full_name. Default: full_name',
                    enumValues   : [
                        'created',
                        'updated',
                        'pushed',
                        'full_name'
                    ]
                },
                {
                    name         : 'direction',
                    required     : false,
                    defaultValue : 'desc',
                    type         : 'enum',
                    location     : 'uri',
                    description  : 'Can be one of asc or desc. Default: when using full_name: asc, otherwise desc',
                    enumValues   : [
                        'asc',
                        'desc'
                    ]
                }
            ]
        },
        {
            name     : 'List organization repositories',
            synopsis : 'List repositories for the specified org.',
            method   : 'GET',
            uri      : '/orgs/:org/repos',
            oauth    : false,
            params   : [
                paramOrg,
                {
                    name         : 'type',
                    required     : false,
                    defaultValue : 'all',
                    type         : 'enum',
                    location     : 'uri',
                    description  : 'Can be one of all, public, private, forks, sources, member. Default: all',
                    enumValues   : [
                        'all',
                        'forks',
                        'public',
                        'private',
                        'member',
                        'sources'
                    ]
                }
            ]
        },
        {
            name     : 'List all public repositories',
            synopsis : 'This provides a dump of every public repository, in the order that they were created. Note: Pagination is powered exclusively by the since parameter. Use the Link header to get the URL for the next page of repositories.',
            method   : 'GET',
            uri      : '/repositories',
            oauth    : false,
            params   : [
                {
                    name        : 'since',
                    required    : false,
                    type        : 'integer',
                    location    : 'uri',
                    description : 'The integer ID of the last Repository that you’ve seen.'
                }
            ]
        },
        {
            name     : 'Create a new repository for the authenticated user.',
            synopsis : '',
            method   : 'POST',
            uri      : '/user/repos',
            oauth    : true,
            params   : [
                {
                    name         : 'name',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The name of the repository'
                },
                {
                    name         : 'description',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'A short description of the repository'
                },
                {
                    name         : 'homepage',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'A URL with more information about the repository'
                },
                {
                    name         : 'private',
                    required     : false,
                    defaultValue : false,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to create a private repository, or false to create a public one. Creating private repositories requires a paid GitHub account. Default: false'
                },
                {
                    name         : 'has_issues',
                    required     : false,
                    defaultValue : true,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to enable issues for this repository, false to disable them. Default: true'
                },
                {
                    name         : 'has_wiki',
                    required     : false,
                    defaultValue : true,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to enable the wiki for this repository, false to disable it. Default: true'
                },
                {
                    name         : 'has_downloads',
                    required     : false,
                    defaultValue : true,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to enable downloads for this repository, false to disable them. Default: true'
                },
                {
                    name         : 'team_id',
                    required     : false,
                    type         : 'integer',
                    location     : 'body',
                    description  : 'The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization.'
                },
                {
                    name         : 'auto_init',
                    required     : false,
                    defaultValue : false,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Pass true to create an initial commit with empty README. Default: false'
                },
                {
                    name         : 'gitignore_template',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, “Haskell”. Ignored if the auto_init parameter is not provided.'
                },
                {
                    name         : 'license_template',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'Desired LICENSE template to apply. Use the name of the template without the extension. For example, “mit” or “mozilla”. Ignored if the auto_init parameter is not provided.'
                }
            ]
        },
        {
            name     : 'Create a new repository in this organization.',
            synopsis : 'The authenticated user must be a member of the specified organization.',
            method   : 'POST',
            uri      : '/orgs/:org/repos',
            oauth    : true,
            params   : [
                paramOrg,
                {
                    name         : 'name',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The name of the repository'
                },
                {
                    name         : 'description',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'A short description of the repository'
                },
                {
                    name         : 'homepage',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'A URL with more information about the repository'
                },
                {
                    name         : 'private',
                    required     : false,
                    defaultValue : false,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to create a private repository, or false to create a public one. Creating private repositories requires a paid GitHub account. Default: false'
                },
                {
                    name         : 'has_issues',
                    required     : false,
                    defaultValue : true,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to enable issues for this repository, false to disable them. Default: true'
                },
                {
                    name         : 'has_wiki',
                    required     : false,
                    defaultValue : true,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to enable the wiki for this repository, false to disable it. Default: true'
                },
                {
                    name         : 'has_downloads',
                    required     : false,
                    defaultValue : true,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to enable downloads for this repository, false to disable them. Default: true'
                },
                {
                    name         : 'team_id',
                    required     : false,
                    type         : 'integer',
                    location     : 'body',
                    description  : 'The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization.'
                },
                {
                    name         : 'auto_init',
                    required     : false,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Pass true to create an initial commit with empty README. Default: false'
                },
                {
                    name         : 'gitignore_template',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, “Haskell”. Ignored if the auto_init parameter is not provided.'
                },
                {
                    name         : 'license_template',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'Desired LICENSE template to apply. Use the name of the template without the extension. For example, “mit” or “mozilla”. Ignored if the auto_init parameter is not provided.'
                }
            ]
        },
        {
            name     : 'Get',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Edit',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name         : 'name',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The name of the repository'
                },
                {
                    name         : 'description',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'A short description of the repository'
                },
                {
                    name         : 'homepage',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'A URL with more information about the repository'
                },
                {
                    name         : 'private',
                    required     : false,
                    defaultValue : false,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to make the repository private, or false to make it public. Creating private repositories requires a paid GitHub account. Default: false'
                },
                {
                    name         : 'has_issues',
                    required     : false,
                    defaultValue : true,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to enable issues for this repository, false to disable them. Default: true'
                },
                {
                    name         : 'has_wiki',
                    required     : false,
                    defaultValue : true,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to enable the wiki for this repository, false to disable it. Default: true'
                },
                {
                    name         : 'has_downloads',
                    required     : false,
                    defaultValue : true,
                    type         : 'boolean',
                    location     : 'body',
                    description  : 'Either true to enable downloads for this repository, false to disable them. Default: true'
                },
                {
                    name         : 'default_branch',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'Updates the default branch for this repository.'
                }
            ]
        },
        {
            name     : 'List contributors',
            synopsis : 'List contributors to the specified repository, sorted by the number of commits per contributor in descending order.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/contributors',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'anon',
                    required    : false,
                    type        : 'boolean',
                    location    : 'body',
                    description : 'Set to true to include anonymous contributors in results.'
                }
            ]
        },
        {
            name     : 'List languages',
            synopsis : 'List languages for the specified repository. The value on the right of a language is the number of bytes of code written in that language.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/languages',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List teams',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/teams',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List tags',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/tags',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List branches',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/branches',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Get branch',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/branches/:branch',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'branch',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The name of the branch.'
                }
            ]
        },
        {
            name     : 'Delete a Repository',
            synopsis : 'Deleting a repository requires admin access. If OAuth is used, the delete_repo scope is required.',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        }
    ]
};
