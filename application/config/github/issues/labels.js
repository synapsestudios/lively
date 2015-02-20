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

var paramName = {
    name        : 'name',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The name of the label.'
};

var paramNameBody = {
    name        : 'name',
    required    : true,
    type        : 'string',
    location    : 'body',
    description : 'The name of the label.'
};

var paramColor = {
    name        : 'color',
    required    : true,
    type        : 'string',
    location    : 'body',
    description : 'A 6 character hex code, without the leading #, identifying the color.'
};

var paramNumber = {
    name        : 'number',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The issue number.'
};

var paramMilestoneNumber = {
    name        : 'number',
    required    : true,
    type        : 'integer',
    location    : 'uri',
    description : 'The milestone number.'
};

module.exports = {
    name      : 'Labels',
    endpoints : [
        {
            name     : 'List all labels for this repository',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/labels',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Get a single label',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/labels/:name',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramName
            ]
        },
        {
            name     : 'Create a label',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/labels',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNameBody,
                paramColor
            ]
        },
        {
            name     : 'Update a label',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo/labels/:name',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramName,
                paramColor
            ]
        },
        {
            name     : 'Delete a label',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/labels/:name',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramName
            ]
        },
        {
            name     : 'List labels on an issue',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/issues/:number/labels',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'Add labels to an issue',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/issues/:number/labels',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'Remove labels from an issue',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/issues/:number/labels/:name',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber,
                paramName
            ]
        },
        {
            name     : 'Replace all labels for an issue',
            synopsis : 'Sending an empty array (`[]`) will remove all Labels from the Issue.',
            method   : 'PUT',
            uri      : '/repos/:owner/:repo/issues/:number/labels',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'Remove all labels from an issue',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/issues/:number/labels',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramNumber
            ]
        },
        {
            name     : 'Get labels for every issue in a milestone',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/milestones/:number/labels',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramMilestoneNumber
            ]
        }
    ]
};
