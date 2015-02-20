'use strict';

var paramUser = {
    name         : 'user',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The name of the user.'
};

var paramOrg = {
    name         : 'org',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The name of the organization.'
};

var paramBillingEmail = {
    name         : 'billing_email',
    required     : false,
    type         : 'string',
    location     : 'body',
    description  : 'Billing email address. This address is not publicized.'
};

var paramCompany = {
    name         : 'company',
    required     : false,
    type         : 'string',
    location     : 'body',
    description  : 'The company name.'
};

var paramEmail = {
    name         : 'email',
    required     : false,
    type         : 'string',
    location     : 'body',
    description  : 'The publicly visible email address.'
};

var paramLocation = {
    name         : 'location',
    required     : false,
    type         : 'string',
    location     : 'body',
    description  : 'The location.'
};

var paramName = {
    name         : 'name',
    required     : false,
    type         : 'string',
    location     : 'body',
    description  : 'The shorthand name of the company.'
};

var paramDescription = {
    name         : 'description',
    required     : false,
    type         : 'string',
    location     : 'body',
    description  : 'The description of the company.'
};

module.exports = {
    name    : 'Organizations',
    endpoints : [
        {
            name     : 'List User Organizations (all)',
            synopsis : 'List all public organizations for an unauthenticated user. Lists private and public organizations for authenticated users.',
            method   : 'GET',
            uri      : '/users/:user/orgs',
            oauth    : false,
            params   : [
                paramUser
            ]
        },
        {
            name     : 'List User Organizations (mine)',
            synopsis : 'List public and private organizations for the authenticated user.',
            method   : 'GET',
            uri      : '/user/orgs',
            oauth    : true,
            params   : []
        },
        {
            name     : 'Get an Organization',
            synopsis : '',
            method   : 'GET',
            uri      : '/orgs/:org',
            oauth    : true,
            params   : [
                paramOrg
            ]
        },
        {
            name     : 'Edit an Organization',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/orgs/:org',
            oauth    : true,
            params   : [
                paramOrg,
                paramBillingEmail,
                paramCompany,
                paramEmail,
                paramLocation,
                paramName,
                paramDescription
            ]
        }
    ],
    resources : [
        require('./organizations/members'),
        require('./organizations/teams')
    ]
};
