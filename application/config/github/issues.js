'use strict';

var paramFilter = {
    name         : 'filter',
    required     : false,
    defaultValue : 'assigned',
    type         : 'enum',
    location     : 'query',
    description  : 'Indicates which sorts of issues to return.',
    enumValues   : [
        'assigned',
        'created',
        'mentioned',
        'subscribed',
        'all'
    ]
};

var paramState = {
    name         : 'state',
    required     : false,
    defaultValue : 'open',
    type         : 'enum',
    location     : 'query',
    description  : 'Indicates the state of the issues to return.',
    enumValues   : [
        'open',
        'closed',
        'all'
    ]
};

var paramLabels = {
    name         : 'labels',
    required     : false,
    type         : 'string',
    location     : 'query',
    description  : 'A list of comma separated label names. Example: `bug,ui,@high`'
};

var paramSort = {
    name         : 'sort',
    required     : false,
    defaultValue : 'created',
    type         : 'enum',
    location     : 'query',
    description  : 'What to sort results by.',
    enumValues   : [
        'created',
        'updated',
        'comments'
    ]
};

var paramDirection = {
    name         : 'direction',
    required     : false,
    defaultValue : 'desc',
    type         : 'enum',
    location     : 'query',
    description  : 'The direction of the sort.',
    enumValues   : [
        'desc',
        'asc'
    ]
};

var paramSince = {
    name         : 'since',
    required     : false,
    type         : 'string',
    location     : 'query',
    description  : 'Only issues updated at or after this time are returned. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.'
};

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

var paramMilestone = {
    name         : 'milestone',
    required     : false,
    defaultValue : '*',
    type         : 'mixed',
    location     : 'query',
    description  : 'If an integer is passed, it should refer to a milestone number. If the string `*` is passed, issues with any milestone are accepted. If the string `none` is passed, issues without milestones are returned.'
};

var paramAssignee = {
    name         : 'assignee',
    required     : false,
    defaultValue : '*',
    type         : 'string',
    location     : 'query',
    description  : 'Can be the name of a user. Pass in `none` for issues with no assigned user, and `*` for issues assigned to any user.'
};

var paramNumber = {
    name        : 'number',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The issue number.'
};

var paramOrg = {
    name        : 'org',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The name of the organization.'
};

module.exports = {
    name    : 'Issues',
    methods : [
        {
            name     : 'List issues (all)',
            synopsis : 'List all issues across all the authenticated user’s visible repositories including owned repositories, member repositories, and organization repositories.',
            method   : 'GET',
            uri      : '/issues',
            oauth    : true,
            params   : [
                paramFilter,
                paramState,
                paramLabels,
                paramSort,
                paramDirection,
                paramSince
            ]
        },
        {
            name     : 'List issues (mine)',
            synopsis : 'List all issues across owned and member repositories for the authenticated user.',
            method   : 'GET',
            uri      : '/user/issues',
            oauth    : true,
            params   : [
                paramFilter,
                paramState,
                paramLabels,
                paramSort,
                paramDirection,
                paramSince
            ]
        },
        {
            name     : 'List issues (org)',
            synopsis : 'List all issues for a given organization for the authenticated user.',
            method   : 'GET',
            uri      : '/orgs/:org/issues',
            oauth    : true,
            params   : [
                paramOrg,
                paramFilter,
                paramState,
                paramLabels,
                paramSort,
                paramDirection,
                paramSince
            ]
        },
        {
            name     : 'List issues for a repository',
            synopsis : 'List all issues for a given repository.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/issues',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramMilestone,
                paramState,
                paramAssignee,
                paramLabels,
                paramSort,
                paramDirection,
                paramSince
            ]
        },
        {
            name     : 'Get a single issue',
            synopsis : 'Get a single issue from a given repository. **Note**: Every pull request is an issue, but not every issue is a pull request. If the issue is not a pull request, the response omits the `pull_request` attribute.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/issues/:number',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'Create an issue',
            synopsis : 'Any user with pull access to a repository can create an issue.',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/issues',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name         : 'title',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The title of the issue.'
                },
                {
                    name         : 'body',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The contents of the issue.'
                },
                {
                    name         : 'assignee',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'Login for the user that this issue should be assigned to. *NOTE: Only users with push access can set the assignee for new issues. The assignee is silently dropped otherwise.*'
                },
                {
                    name         : 'milestone',
                    required     : false,
                    type         : 'integer',
                    location     : 'body',
                    description  : 'Milestone to associate this issue with. *NOTE: Only users with push access can set the milestone for new issues. The milestone is silently dropped otherwise.*'
                },
                {
                    name         : 'labels',
                    required     : false,
                    type         : 'array',
                    location     : 'body',
                    description  : 'Labels to associate with this issue. This should be an `array` of `strings`. *NOTE: Only users with push access can set labels for new issues. Labels are silently dropped otherwise.*'
                }
            ]
        },
        {
            name     : 'Edit an issue',
            synopsis : 'Issue owners and users with push access can edit an issue.',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo/issues/:number',
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
                    description  : 'The title of the issue.'
                },
                {
                    name         : 'body',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The contents of the issue.'
                },
                {
                    name         : 'assignee',
                    required     : false,
                    type         : 'string',
                    location     : 'body',
                    description  : 'Login for the user that this issue should be assigned to.'
                },
                {
                    name         : 'state',
                    required     : false,
                    type         : 'enum',
                    location     : 'body',
                    description  : 'State of the issue.',
                    enumValues   : [
                        'open',
                        'closed'
                    ]
                },
                {
                    name         : 'milestone',
                    required     : false,
                    type         : 'integer',
                    location     : 'body',
                    description  : 'Milestone to associate this issue with. *NOTE: Only users with push access can set the milestone for issues. The milestone is silently dropped otherwise.*'
                },
                {
                    name         : 'labels',
                    required     : false,
                    type         : 'array',
                    location     : 'body',
                    description  : 'Labels to associate with this issue. This should be an `array` of `strings`. Pass one or more Labels to *replace* the set of Labels on this Issue. Send an empty array (`[]`) to clear all Labels from the Issue. *NOTE: Only users with push access can set labels for issues. Labels are silently dropped otherwise.*'
                }
            ]
        }
    ]
};
