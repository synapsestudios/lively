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

var paramUsername = {
    name        : 'username',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The username of the user.'
};

module.exports = {
    name     : 'Collaborators',
    endpoints : [
        {
            name     : 'List collaborators',
            synopsis : 'When authenticating as an organization owner of an organization-owned repository, all organization owners are included in the list of collaborators. Otherwise, only users with access to the repository are returned in the collaborators list.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/collaborators',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Check if a user is a collaborator',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/collaborators/:username',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramUsername
            ]
        },
        {
            name     : 'Add user as a collaborator',
            synopsis : 'Note that you\'ll need to set Content-Length to zero when calling out to this endpoint.',
            method   : 'PUT',
            uri      : '/repos/:owner/:repo/collaborators/:username',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramUsername
            ]
        },
        {
            name     : 'Remove user as a collaborator',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/collaborators/:username',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramUsername
            ]
        }
    ]
};
