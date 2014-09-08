'use strict';

var date = new Date();

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
    name     : 'Repo Commits',
    methods : [
        {
            name     : 'List commits on a repository',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/commits',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name         : 'sha',
                    required     : false,
                    type         : 'string',
                    location     : 'uri',
                    description  : 'SHA or branch to start listing commits from.'
                },
                {
                    name         : 'path',
                    required     : false,
                    type         : 'string',
                    location     : 'uri',
                    description  : 'Only commits containing this file path will be returned.'
                },
                {
                    name         : 'author',
                    required     : false,
                    type         : 'string',
                    location     : 'uri',
                    description  : 'GitHub login or email address by which to filter by commit author.'
                },
                {
                    name         : 'since',
                    required     : false,
                    defaultValue : date.toISOString(),
                    type         : 'string',
                    location     : 'uri',
                    description  : 'Only commits after this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.'
                },
                {
                    name         : 'until',
                    required     : false,
                    defaultValue : date.toISOString(),
                    type         : 'string',
                    location     : 'uri',
                    description  : 'Only commits before this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.'
                }
            ]
        },
        {
            name     : 'Get a single commit',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/commits/:sha',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'sha',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The SHA of the commit.'
                }
            ]
        },
        {
            name     : 'Compare two commits',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/compare/:base...:head',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'base...head',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'Note: Both :base and :head can be either branch names in :repo or branch names in other repositories in the same network as :repo. For the latter case, use the format user:branch'
                }
            ]
        }
    ]
};
