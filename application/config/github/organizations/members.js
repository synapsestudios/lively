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
    name      : 'Members',
    endpoints : [
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
        },
        {
            name     : 'Get organization membership',
            synopsis : 'In order to get a user’s membership with an organization, the authenticated user must be an organization admin.',
            method   : 'GET',
            uri      : '/orgs/:org/memberships/:user',
            oauth    : true,
            params   : [
                paramOrg,
                paramUser,
                {
                    name        : 'Accept',
                    required    : false,
                    description : 'This endpoint is currently in a migration period allowing applications to opt in to the Organization Permissions API. To access this API method during the migration period, you must provide a custom media type in the Accept header.',
                    location    : 'header',
                    type        : 'enum',
                    enumValues  : ['application/vnd.github.moondragon+json']
                }
            ]
        },
        {
            name     : 'Add or update organization membership',
            synopsis : 'In order to create or update a user’s membership with an organization, the authenticated user must be an organization admin.',
            method   : 'PUT',
            uri      : '/orgs/:org/memberships/:user',
            oauth    : true,
            params   : [
                paramOrg,
                paramUser,
                {
                    name        : 'role',
                    required    : true,
                    description : 'The role to give the user in the organization. Can be one of: admin - The user will become an administrator of the organization. member - The user will become a non-admin member of the organization. Use this only to demote an existing admin to a non-admin.',
                    location    : 'body',
                    type        : 'enum',
                    enumValues  : [
                        'admin',
                        'member'
                    ]
                },
                {
                    name        : 'Accept',
                    required    : false,
                    description : 'This endpoint is currently in a migration period allowing applications to opt in to the Organization Permissions API. To access this API method during the migration period, you must provide a custom media type in the Accept header.',
                    location    : 'header',
                    type        : 'enum',
                    enumValues  : ['application/vnd.github.moondragon+json']
                }
            ]
        },
        {
            name     : 'Remove organization membership',
            synopsis : 'In order to remove a user’s membership with an organization, the authenticated user must be an organization admin.',
            method   : 'DELETE',
            uri      : '/orgs/:org/memberships/:user',
            oauth    : true,
            params   : [
                paramOrg,
                paramUser,
                {
                    name        : 'Accept',
                    required    : false,
                    description : 'This endpoint is currently in a migration period allowing applications to opt in to the Organization Permissions API. To access this API method during the migration period, you must provide a custom media type in the Accept header.',
                    location    : 'header',
                    type        : 'enum',
                    enumValues  : ['application/vnd.github.moondragon+json']
                }
            ]
        },
        {
            name     : 'List your organization memberships',
            synopsis : '',
            method   : 'GET',
            uri      : '/user/memberships/orgs',
            oauth    : true,
            params   : [
                {
                    name         : 'state',
                    required     : false,
                    type         : 'string',
                    location     : 'query',
                    description  : 'Indicates the state of the memberships to return. Can be either active or pending. If not specified, both active and pending memberships are returned.'
                }
            ]
        },
        {
            name     : 'Get your organization membership',
            synopsis : '',
            method   : 'GET',
            uri      : '/user/memberships/orgs/:org',
            oauth    : true,
            params   : [
                paramOrg
            ]
        },
        {
            name     : 'Edit your organization membership',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/user/memberships/orgs/:org',
            oauth    : true,
            params   : [
                paramOrg,
                {
                    name         : 'state',
                    required     : true,
                    type         : 'string',
                    location     : 'body',
                    description  : 'The state that the membership should be in. Only "active" will be accepted.'
                }
            ]
        }
    ]
};
