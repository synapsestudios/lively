'use strict';

var paramOwner = {
    name        : 'owner',
    required    : true,
    type        : 'string',
    description : 'The owner of the repo.'
};

var paramRepo = {
    name        : 'repo',
    required    : true,
    type        : 'string',
    description : 'The name of the repo.'
};

var paramIssueNumber = {
    name        : 'issue_number',
    required    : true,
    type        : 'integer',
    description : 'The issue number.'
};

module.exports = {
    name    : 'Events',
    methods : [
        {
            name     : 'List events for an issue',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/issues/:issue_number/events',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramIssueNumber
            ]
        },
        {
            name     : 'List events for a repository',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/issues/events',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        }
    ]
};
