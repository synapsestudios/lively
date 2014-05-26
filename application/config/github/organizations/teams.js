'use strict';

var paramOrg = {
    name         : 'org',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The name of the organization.'
};

var paramId = {
    name         : 'id',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The id of the team.'
};

var paramName = {
    name        : 'name',
    required    : true,
    type        : 'string',
    location    : 'body',
    description : 'The name of the team.'
};

var paramRepoNames = {
    name        : 'repo_names',
    required    : false,
    type        : 'mixed',
    location    : 'body',
    description : 'The repositories to add the team to. This must be an `array` of `strings`.'
};

var paramPermission = {
    name         : 'permission',
    required     : false,
    defaultValue : 'pull',
    type         : 'enum',
    location     : 'body',
    description  : 'The permission to grant the team',
    enumValues   : [
        'pull',
        'push',
        'admin'
    ]
};

var paramUser = {
    name         : 'user',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The name of the user.'
};

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
    name     : 'Teams',
    synopsis : 'All actions against teams require at a minimum an authenticated user who is a member of the Owners team in the `:org` being managed. Additionally, OAuth users require the “read:org” scope.', 
    methods : [
        {
            name     : 'List teams',
            synopsis : '',
            method   : 'GET',
            uri      : '/orgs/:org/teams',
            oauth    : true,
            params   : [
                paramOrg
            ]
        },
        {
            name     : 'List teams',
            synopsis : '',
            method   : 'GET',
            uri      : '/teams/:id',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Create team',
            synopsis : 'In order to create a team, the authenticated user must be an owner of `:org`.',
            method   : 'POST',
            uri      : '/orgs/:org/teams',
            oauth    : true,
            params   : [
                paramOrg,
                paramName,
                paramRepoNames,
                paramPermission
            ]
        },
        {
            name     : 'Edit team',
            synopsis : 'In order to edit a team, the authenticated user must be an owner of the org that the team is associated with.',
            method   : 'PATCH',
            uri      : '/teams/:id',
            oauth    : true,
            params   : [
                paramId,
                paramName,
                paramPermission
            ]
        },
        {
            name     : 'Delete team',
            synopsis : 'In order to delete a team, the authenticated user must be an owner of the org that the team is associated with.',
            method   : 'DELETE',
            uri      : '/teams/:id',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'List team members',
            synopsis : 'In order to list members in a team, the authenticated user must be a member of the team.',
            method   : 'GET',
            uri      : '/teams/:id/members',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Get team member',
            synopsis : 'In order to get if a user is a member of a team, the authenticated user must be a member of the team.',
            method   : 'GET',
            uri      : '/teams/:id/members/:user',
            oauth    : true,
            params   : [
                paramId,
                paramUser
            ]
        },
        {
            name     : 'Add team member',
            synopsis : 'In order to add a user to a team, the authenticated user must have ‘admin’ permissions to the team or be an owner of the org that the team is associated with.',
            method   : 'PUT',
            uri      : '/teams/:id/members/:user',
            oauth    : true,
            params   : [
                paramId,
                paramUser
            ]
        },
        {
            name     : 'Remove team member',
            synopsis : 'In order to remove a user from a team, the authenticated user must have ‘admin’ permissions to the team or be an owner of the org that the team is associated with. NOTE: This does not delete the user, it just remove them from the team.',
            method   : 'DELETE',
            uri      : '/teams/:id/members/:user',
            oauth    : true,
            params   : [
                paramId,
                paramUser
            ]
        },
        {
            name     : 'List team repos',
            synopsis : '',
            method   : 'GET',
            uri      : '/teams/:id/repos',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Check if a team manages a repository',
            synopsis : '',
            method   : 'GET',
            uri      : '/teams/:id/repos/:owner/:repo',
            oauth    : true,
            params   : [
                paramId,
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Add team repository',
            synopsis : 'In order to add a repository to a team, the authenticated user must be an owner of the org that the team is associated with. Also, the repository must be owned by the organization, or a direct fork of a repository owned by the organization.',
            method   : 'PUT',
            uri      : '/teams/:id/repos/:org/:repo',
            oauth    : true,
            params   : [
                paramId,
                paramOrg,
                paramRepo
            ]
        },
        {
            name     : 'Remove team repository',
            synopsis : 'In order to remove a repository from a team, the authenticated user must be an owner of the org that the team is associated with. Also, since the Owners team always has access to all repositories in the organization, repositories cannot be removed from the Owners team. NOTE: This does not delete the repository, it just removes it from the team.',
            method   : 'DELETE',
            uri      : '/teams/:id/repos/:owner/:repo',
            oauth    : true,
            params   : [
                paramId,
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'List user teams',
            synopsis : 'List all of the teams across all of the organizations to which the authenticated user belongs. This method requires `user` or `repo` scope when authenticating via OAuth.',
            method   : 'GET',
            uri      : '/user/teams',
            oauth    : true,
            params   : []
        }
    ]
};
