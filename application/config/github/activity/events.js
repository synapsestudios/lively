'use strict';

var paramOwner = {
    name        : 'owner',
    required    : true,
    type        : 'text',
    location    : 'uri',
    description : 'The owner of the repo.'
};

var paramRepo = {
    name        : 'repo',
    required    : true,
    type        : 'text',
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
    description : 'The username of the user.'
};

module.exports = {
    name      : 'Events',
    synopsis  : 'This is a read-only API to the GitHub events. These events power the various activity streams on the site.',
    endpoints : [
        {
            name     : 'List public events',
            synopsis : '',
            method   : 'GET',
            uri      : '/events',
            oauth    : false,
            params   : []
        },
        {
            name     : 'List repository events',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/events',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List issue events for a repository',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/issues/events',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List public events for a network of repositories',
            synopsis : '',
            method   : 'GET',
            uri      : '/networks/:owner/:repo/events',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List public events for an organization',
            synopsis : '',
            method   : 'GET',
            uri      : '/orgs/:org/events',
            oauth    : false,
            params   : [
                paramOrg
            ]
        },
        {
            name     : 'List events that a user has received',
            synopsis : 'These are events that you’ve received by watching repos and following users. If you are authenticated as the given user, you will see private events. Otherwise, you’ll only see public events.',
            method   : 'GET',
            uri      : '/users/:username/received_events',
            oauth    : false,
            params   : [
                paramUsername
            ]
        },
        {
            name     : 'List public events that a user has received',
            synopsis : '',
            method   : 'GET',
            uri      : '/users/:username/received_events/public',
            oauth    : false,
            params   : [
                paramUsername
            ]
        },
        {
            name     : 'List events performed by a user',
            synopsis : 'If you are authenticated as the given user, you will see your private events. Otherwise, you’ll only see public events.',
            method   : 'GET',
            uri      : '/users/:username/events',
            oauth    : false,
            params   : [
                paramUsername
            ]
        },
        {
            name     : 'List public events performed by a user',
            synopsis : '',
            method   : 'GET',
            uri      : '/users/:username/events/public',
            oauth    : false,
            params   : [
                paramUsername
            ]
        },
        {
            name     : 'List events for an organization',
            synopsis : 'This is the user’s organization dashboard. You must be authenticated as the user to view this.',
            method   : 'GET',
            uri      : '/users/:username/events/orgs/:org',
            oauth    : true,
            params   : [
                paramUsername,
                paramOrg
            ]
        }
    ]
};
