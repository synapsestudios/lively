'use strict';

var fs               = require('fs');
var marked           = require('marked');
var listFeedsSummary = fs.readFileSync(__dirname + '/list-feeds-summary.md').toString();

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

var paramOrg = {
    name        : 'org',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The name of the organization.'
};

var paramUsername = {
    name        : 'username',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The name of the user.'
};


module.exports = {
    name     : 'Feeds',
    synopsis : '',
    methods : [
        {
            name     : 'List Feeds',
            synopsis : marked(listFeedsSummary),
            method   : 'GET',
            uri      : '/feeds',
            oauth    : false
        }
    ]
};
