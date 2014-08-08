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

var paramId = {
    name        : 'id',
    required    : true,
    type        : 'string',
    location    : 'uri',
    description : 'The ID of the thread.'
};

var paramAll = {
    name        : 'all',
    required    : false,
    type        : 'boolean',
    location    : 'uri',
    description : 'If true, show notifications marked as read. Default: false'
};

var paramParticipating = {
    name        : 'participating',
    required    : false,
    type        : 'boolean',
    location    : 'uri',
    description : 'If true, only shows notifications in which the user is directly participating or mentioned. Default: false'
};

var paramSince = {
    name        : 'since',
    required    : false,
    type        : 'string',
    location    : 'uri',
    description : 'Filters out any notifications updated before the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Default: Time.now'
};

var paramLastReadAt = {
    name        : 'last_read_at',
    required    : false,
    type        : 'string',
    location    : 'uri',
    description : 'Describes the last point that notifications were checked. Anything updated since this time will not be updated. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Default: Time.now'
};

module.exports = {
    name     : 'Notifications',
    methods : [
        {
            name     : 'List your notifications',
            synopsis : 'List all notifications for the current user, grouped by repository.',
            method   : 'GET',
            uri      : '/notifications',
            oauth    : true,
            params   : [
                paramAll,
                paramParticipating,
                paramSince
            ]
        },
        {
            name     : 'List your notifications in a repository',
            synopsis : 'List all notifications for the current user.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/notifications',
            oauth    : true,
            params   : [
                paramAll,
                paramParticipating,
                paramSince
            ]
        },
        {
            name     : 'Mark as read',
            synopsis : 'Marking a notification as “read” removes it from the default view on GitHub.com.',
            method   : 'PUT',
            uri      : '/notifications',
            oauth    : true,
            params   : [
                paramLastReadAt
            ]
        },
        {
            name     : 'Mark notifications as read in a repository',
            synopsis : 'Marking all notifications in a repository as “read” removes them from the default view on GitHub.com.',
            method   : 'PUT',
            uri      : '/repos/:owner/:repo/notifications',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'View a single thread',
            synopsis : '',
            method   : 'GET',
            uri      : '/notifications/threads/:id',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Mark a thread as read',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/notifications/threads/:id',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Get a Thread Subscription',
            synopsis : 'This checks to see if the current user is subscribed to a thread.',
            method   : 'GET',
            uri      : 'GET /notifications/threads/:id/subscription',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Set a Thread Subscription',
            synopsis : 'This lets you subscribe to a thread, or ignore it. Subscribing to a thread is unnecessary if the user is already subscribed to the repository. Ignoring a thread will mute all future notifications (until you comment or get @mentioned).',
            method   : 'PUT',
            uri      : '/notifications/threads/:id/subscription',
            oauth    : true,
            params   : [
                paramId
            ]
        },
        {
            name     : 'Delete a Thread Subscription',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/notifications/threads/:id/subscription',
            oauth    : true,
            params   : [
                paramId
            ]
        }
    ]
};
