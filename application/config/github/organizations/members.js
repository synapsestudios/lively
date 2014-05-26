'use strict';

var paramOrg = {
    name         : 'org',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The name of the organization.'
};

var paramFilter = {
    name         : 'filter',
    required     : false,
    defaultValue : 'all',
    type         : 'enum',
    location     : 'query',
    description  : 'Filter members returned in the list.',
    enumValues   : [
        'all',
        '2fa_disabled'
    ]
};

var paramUser = {
    name         : 'user',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The name of the user.'
};

module.exports = {
    name    : 'Members',
    methods : [
        {
            name     : 'Members list',
            synopsis : 'List all users who are members of an organization. A member is a user that belongs to at least 1 team in the organization. If the authenticated user is also an owner of this organization then both concealed and public members will be returned. If the requester is not an owner of the organization the query will be redirected to the public members list.',
            method   : 'GET',
            uri      : '/orgs/:org/members',
            oauth    : false,
            params   : [
                paramOrg,
                paramFilter
            ]
        },
        {
            name     : 'Check membership',
            synopsis : 'Check if a user is, publicly or privately, a member of the organization.',
            method   : 'GET',
            uri      : '/orgs/:org/members/:user',
            oauth    : false,
            params   : [
                paramOrg,
                paramUser
            ]
        },
        {
            name     : 'Remove a member',
            synopsis : 'Removing a user from this list will remove them from all teams and they will no longer have any access to the organization’s repositories.',
            method   : 'DELETE',
            uri      : '/orgs/:org/members/:user',
            oauth    : true,
            params   : [
                paramOrg,
                paramUser
            ]
        },
        {
            name     : 'Public members list',
            synopsis : 'Members of an organization can choose to have their membership publicized or not.',
            method   : 'GET',
            uri      : '/orgs/:org/public_members',
            oauth    : false,
            params   : [
                paramOrg
            ]
        },
        {
            name     : 'Check public membership',
            synopsis : '',
            method   : 'GET',
            uri      : '/orgs/:org/public_members/:user',
            oauth    : false,
            params   : [
                paramOrg,
                paramUser
            ]
        },
        {
            name     : 'Publicize a user’s membership',
            synopsis : 'The user can publicize their own membership. (A user cannot publicize the membership for another user.)',
            method   : 'PUT',
            uri      : '/orgs/:org/public_members/:user',
            oauth    : true,
            params   : [
                paramOrg,
                paramUser
            ]
        },
        {
            name     : 'Conceal a user’s membership',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/orgs/:org/public_members/:user',
            oauth    : true,
            params   : [
                paramOrg,
                paramUser
            ]
        }
    ]
};
