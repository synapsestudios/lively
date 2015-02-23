'use strict';

var acceptHeader = {
    name        : 'Accept',
    required    : false,
    description : 'This endpoint is currently in a migration period allowing applications to opt in to the Organization Webhooks API. To access this API method during the migration period, you must provide a custom media type in the Accept header.',
    location    : 'header',
    type        : 'enum',
    enumValues  : ['application/vnd.github.sersi-preview+json']
};

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
    description  : 'The id of the webhook.'
};

module.exports = {
    name      : 'Webhooks',
    synopsis  : 'Organization webhooks allow you to receive HTTP POST payloads whenever certain events happen within the organization. Subscribing to these events makes it possible to build integrations that react to actions on GitHub.com.',
    endpoints : [
        {
            name     : 'List hooks',
            synopsis : '',
            method   : 'GET',
            uri      : '/orgs/:org/hooks',
            oauth    : true,
            params   : [
                acceptHeader,
                paramOrg
            ]
        },
        {
            name     : 'Get single hook',
            synopsis : '',
            method   : 'GET',
            uri      : '/orgs/:org/hooks/:id',
            oauth    : true,
            params   : [
                acceptHeader,
                paramOrg,
                paramId
            ]
        },
        {
            name     : 'Create a hook',
            synopsis : '',
            method   : 'POST',
            uri      : '/orgs/:org/hooks',
            oauth    : true,
            params   : [
                acceptHeader,
                paramOrg,
                {
                    name        : 'name',
                    required    : true,
                    description : 'Must be passed as “web”.',
                    location    : 'body',
                    type        : 'enum',
                    enumValues  : [
                        'web'
                    ]
                },
                {
                    name        : 'config',
                    required    : true,
                    description : 'Key/value pairs to provide settings for this webhook.',
                    location    : 'body',
                    type        : 'hash',
                    params      : [
                        {
                            name        : 'url',
                            type        : 'string',
                            required    : true,
                            location    : 'body',
                            description : 'The URL to which the payloads will be delivered.'
                        },
                        {
                            name         : 'content_type',
                            type         : 'enum',
                            required     : false,
                            location     : 'body',
                            defaultValue : 'form',
                            description  : 'The media type used to serialize the payloads.',
                            enumValues   : [
                                'form',
                                'json'
                            ]
                        },
                        {
                            name        : 'secret',
                            type        : 'string',
                            required    : false,
                            location    : 'body',
                            description : 'If provided, payloads will be delivered with an X-Hub-Signature header. The value of this header is computed as the HMAC hex digest of the body, using the secret as the key.'
                        },
                        {
                            name        : 'insecure_ssl',
                            type        : 'string',
                            required    : false,
                            location    : 'body',
                            description : 'Determines whether the SSL certificate of the host for url will be verified when delivering payloads. Supported values include "0" (verification is performed) and "1" (verification is not performed). The default is "0". We strongly recommend not setting this to “1” as you are subject to man-in-the-middle and other attacks.'
                        },
                    ]
                },
                {
                    name         : 'events',
                    required     : false,
                    description  : 'Determines what events the hook is triggered for.',
                    location     : 'body',
                    type         : 'array[string]'
                },
                {
                    name         : 'active',
                    required     : false,
                    description  : 'Determines whether the hook is actually triggered on pushes.',
                    location     : 'body',
                    type         : 'boolean'
                }
            ]
        },
        {
            name     : 'Edit a hook',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/orgs/:org/hooks/:id',
            oauth    : true,
            params   : [
                acceptHeader,
                paramOrg,
                paramId,
                {
                    name        : 'config',
                    required    : true,
                    description : 'Key/value pairs to provide settings for this webhook.',
                    location    : 'body',
                    type        : 'hash',
                    params      : [
                        {
                            name        : 'url',
                            type        : 'string',
                            required    : true,
                            location    : 'body',
                            description : 'The URL to which the payloads will be delivered.'
                        },
                        {
                            name         : 'content_type',
                            type         : 'enum',
                            required     : false,
                            location     : 'body',
                            defaultValue : 'form',
                            description  : 'The media type used to serialize the payloads.',
                            enumValues   : [
                                'form',
                                'json'
                            ]
                        },
                        {
                            name        : 'secret',
                            type        : 'string',
                            required    : false,
                            location    : 'body',
                            description : 'If provided, payloads will be delivered with an X-Hub-Signature header. The value of this header is computed as the HMAC hex digest of the body, using the secret as the key.'
                        },
                        {
                            name        : 'insecure_ssl',
                            type        : 'string',
                            required    : false,
                            location    : 'body',
                            description : 'Determines whether the SSL certificate of the host for url will be verified when delivering payloads. Supported values include "0" (verification is performed) and "1" (verification is not performed). The default is "0". We strongly recommend not setting this to “1” as you are subject to man-in-the-middle and other attacks.'
                        },
                    ]
                },
                {
                    name         : 'events',
                    required     : false,
                    description  : 'Determines what events the hook is triggered for.',
                    location     : 'body',
                    type         : 'array[string]'
                },
                {
                    name         : 'active',
                    required     : false,
                    description  : 'Determines whether the hook is actually triggered on pushes.',
                    location     : 'body',
                    type         : 'boolean'
                }
            ]
        },
        {
            name     : 'Ping a hook',
            synopsis : 'This will trigger a ping event to be sent to the hook.',
            method   : 'POST',
            uri      : '/orgs/:org/hooks/:id/pings',
            oauth    : true,
            params   : [
                acceptHeader,
                paramOrg,
                paramId
            ]
        },
        {
            name     : 'Delete a hook',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/orgs/:org/hooks/:id',
            oauth    : true,
            params   : [
                acceptHeader,
                paramOrg,
                paramId
            ]
        }
    ]
};
