'use strict';

var paramUsername = {
    name        : 'username',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The username of the user.'
};

module.exports = {
    name     : 'Followers',
    methods : [
        {
            name     : 'List a user’s followers',
            synopsis : '',
            method   : 'GET',
            uri      : '/users/:username/followers',
            oauth    : false,
            params   : [
                paramUsername
            ]
        },
        {
            name     : 'List the authenticated user’s followers',
            synopsis : '',
            method   : 'GET',
            uri      : '/user/followers',
            oauth    : true,
            params   : []
        },
        {
            name     : 'List who a user is following',
            synopsis : '',
            method   : 'GET',
            uri      : '/users/:username/following',
            oauth    : false,
            params   : [
                paramUsername
            ]
        },
        {
            name     : 'List who the authenticated user is following',
            synopsis : '',
            method   : 'GET',
            uri      : '/user/following',
            oauth    : true,
            params   : []
        },
        {
            name     : 'Check if you are following a user',
            synopsis : '',
            method   : 'GET',
            uri      : '/user/following/:username',
            oauth    : true,
            params   : [
                paramUsername
            ]
        },
        {
            name     : 'Check if one user follows another',
            synopsis : '',
            method   : 'GET',
            uri      : '/users/:username/following/:target_user',
            oauth    : false,
            params   : [
                paramUsername,
                {
                    name        : 'target_user',
                    required    : true,
                    type        : 'string',
                    location    : 'uri',
                    description : 'The username of the user.'
                }
            ]
        },
        {
            name     : 'Follow a user',
            synopsis : 'Note that you’ll need to set Content-Length to zero when calling out to this endpoint.',
            method   : 'PUT',
            uri      : '/user/following/:username',
            oauth    : true,
            params   : [
                paramUsername
            ]
        },
        {
            name     : 'Unfollow a user',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/user/following/:username',
            oauth    : true,
            params   : [
                paramUsername
            ]
        }
    ]
};
