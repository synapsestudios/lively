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
    name      : 'Statistics',
    endpoints : [
        {
            name     : 'Get contributors list with additions, deletions, and commit counts',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/stats/contributors',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Get the last year of commit activity data',
            synopsis : 'Returns the last year of commit activity grouped by week. The days array is a group of commits per day, starting on Sunday.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/stats/commit_activity',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Get the number of additions and deletions per week',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/stats/code_frequency',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Get the weekly commit count for the repository owner and everyone else',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/stats/participation',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Get the number of commits per hour in each day',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/stats/punch_card',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        }
    ]
};
