'use strict';

var paramOwner = {
    name        : 'owner',
    required    : true,
    type        : 'string',
    description : 'The owner of the repo.'
};

var paramRepo = {
    name        : 'repo',
    required    : true,
    type        : 'string',
    description : 'The name of the repo.'
};

module.exports = {
    name    : 'Assignees',
    methods : [
        {
            name     : 'List assignees',
            synopsis : 'This call lists all the available assignees (owner + collaborators) to which issues may be assigned.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/assignees',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Check assignee',
            synopsis : 'You may also check to see if a particular user is an assignee for a repository. If the given `assignee` login belongs to an assignee for the repository, a `204` header with no content is returned. Otherwise a `404` status code is returned.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/assignees/:assignee',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name: 'assignee',
                    required: true,
                    type: 'string',
                    description: 'The assignee being looked up.'
                }
            ]
        }
    ]
};