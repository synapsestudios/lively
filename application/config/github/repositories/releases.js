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
    type        : 'integer',
    location    : 'uri',
    description : 'The ID of the release'
};

module.exports = {
    name     : 'Releases',
    methods : [
        {
            name     : 'List releases for a repository',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/releases',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo
            ]
        },
        {
            name     : 'Get a single release',
            synopsis : '',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/releases/:id',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        },
        {
            name     : 'Create a release',
            synopsis : '',
            method   : 'POST',
            uri      : '/repos/:owner/:repo/releases',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                {
                    name        : 'tag_name',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The name of the tag.'
                },
                {
                    name        : 'target_commitish',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository’s default branch (usually master).'
                },
                {
                    name        : 'name',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The name of the release.'
                },
                {
                    name        : 'body',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'Text describing the contents of the tag.'
                },
                {
                    name        : 'draft',
                    required    : false,
                    type        : 'boolean',
                    location    : 'body',
                    description : 'true to create a draft (unpublished) release, false to create a published one. Default: false'
                },
                {
                    name        : 'prerelease',
                    required    : false,
                    type        : 'boolean',
                    location    : 'body',
                    description : 'true to identify the release as a prerelease. false to identify the release as a full release. Default: false'
                }
            ]
        },
        {
            name     : 'Edit a release',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo/releases/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId,
                {
                    name        : 'tag_name',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The name of the tag.'
                },
                {
                    name        : 'target_commitish',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository’s default branch (usually master).'
                },
                {
                    name        : 'name',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'The name of the release.'
                },
                {
                    name        : 'body',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'Text describing the contents of the tag.'
                },
                {
                    name        : 'draft',
                    required    : false,
                    type        : 'boolean',
                    location    : 'body',
                    description : 'true to create a draft (unpublished) release, false to create a published one. Default: false'
                },
                {
                    name        : 'prerelease',
                    required    : false,
                    type        : 'boolean',
                    location    : 'body',
                    description : 'true to identify the release as a prerelease. false to identify the release as a full release. Default: false'
                }
            ]
        },
        {
            name     : 'Delete a release',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/releases/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        },
        {
            name     : 'List assets for a release',
            synopsis : '',
            method   : 'GET',
            uri      : ' /repos/:owner/:repo/releases/:id/assets',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        },
        {
            name     : 'Get a single release asset',
            synopsis : 'If you want to download the asset’s binary content, pass a media type of "application/octet-stream". The API will either redirect the client to the location, or stream it directly if possible. API clients should handle both a 200 or 302 response.',
            method   : 'GET',
            uri      : '/repos/:owner/:repo/releases/assets/:id',
            oauth    : false,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        },
        {
            name     : 'Edit a release asset',
            synopsis : '',
            method   : 'PATCH',
            uri      : '/repos/:owner/:repo/releases/assets/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId,
                {
                    name        : 'name',
                    required    : true,
                    type        : 'string',
                    location    : 'body',
                    description : 'The file name of the asset.'
                },
                {
                    name        : 'label',
                    required    : false,
                    type        : 'string',
                    location    : 'body',
                    description : 'An alternate short description of the asset. Used in place of the filename.'
                }
            ]
        },
        {
            name     : 'Delete a release asset',
            synopsis : '',
            method   : 'DELETE',
            uri      : '/repos/:owner/:repo/releases/assets/:id',
            oauth    : true,
            params   : [
                paramOwner,
                paramRepo,
                paramId
            ]
        }
    ]
};
