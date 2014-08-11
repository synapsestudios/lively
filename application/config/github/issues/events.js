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

var paramIssueNumber = {
    name        : 'issue_number',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The issue number.'
};

module.exports = {
    name    : 'Issues Events',
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
        },
        {
            name     : 'Get a single event',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/issues/events/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'id',
                    required    : true,
                    type        : 'integer',
                    location    : 'uri',
                    description : 'The event ID'
                }
            ]
        }
    ]
};
