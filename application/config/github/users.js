'use strict';

module.exports = {
    name     : 'Users',
    methods : [
        {
            name     : 'Get a single user',
            synopsis : '',
            method   : 'GET',
            uri      : '/users/:username',
            oauth    : false,
            params   : [
                {
                    name        : 'username',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The username of the user.'
                }
            ]
        },
        {
            name     : 'Get the authenticated user',
            synopsis : '',
            method   : 'GET',
            uri      : '/user',
            oauth    : true,
            params   : []
        },
        {
            name     : 'Update the authenticated user',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/user',
            oauth    : true,
            params   : [
                {
                    name        : 'name',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The new name of the user'
                },
                {
                    name        : 'email',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'Publicly visible email address.'
                },
                {
                    name        : 'blog',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The new blog URL of the user.'
                },
                {
                    name        : 'company',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The new company of the user.'
                },
                {
                    name        : 'location',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The new location of the user.'
                },
                {
                    name        : 'hireable',
                    required    : false,
                    type        : 'boolean',
                    location    : 'body',
                    description : 'The new hiring availability of the user.'
                },
                {
                    name        : 'bio',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The new short biography of the user.'
                }
            ]
        },
        {
            name     : 'Get all users',
            synopsis : 'This provides a dump of every user, in the order that they signed up for GitHub. Note: Pagination is powered exclusively by the since parameter. Use the Link header to get the URL for the next page of users.',
            method   : 'GET',
            uri      : '/users',
            oauth    : false,
            params   : [
                {
                    name        : 'since',
                    required    : false,
                    type        : 'integer',
                    location    : 'uri',
                    description : 'The integer ID of the last User that you’ve seen.'
                }
            ]
        }
    ]
};
