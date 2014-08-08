'use strict';

var fs      = require('fs');
var marked  = require('marked');
var summary = fs.readFileSync(__dirname + '/github/summary.md').toString();

module.exports = {
    'name'    : 'GitHub v3 API',
    'logo'    : '/images/logos/github-mark.png',
    'summary' : marked(summary),
    'api'     : {
        'hostname' : 'api.github.com',
        'port'     : 443,
        'secure'   : true
    },
    'oauth2' : {
        'type'         : 'authorization-code',
        'hostname'     : 'github.com',
        'port'         : 443,
        'secure'       : true,
        'authorizeUrl' : '/login/oauth/authorize',
        'tokenUrl'     : '/login/oauth/access_token',
        'tokenParam'   : 'token'
    },
    'resources' : {
        'Activity' : [
            require('./github/activity/events'),
            require('./github/activity/feeds'),
            require('./github/activity/notifications'),
            require('./github/activity/starring'),
            require('./github/activity/watching')
        ],

        'Gists' : [
            require('./github/gists'),
            require('./github/gists/comments')
        ],

        'Git Data' : [
            require('./github/git_data/blobs'),
            require('./github/git_data/commits'),
            require('./github/git_data/references'),
            require('./github/git_data/tags'),
            require('./github/git_data/trees')
        ],

        'Issues' : [
            require('./github/issues'),
            require('./github/issues/assignees'),
            require('./github/issues/comments'),
            require('./github/issues/events'),
            require('./github/issues/labels'),
            require('./github/issues/milestones')
        ],

        'Miscellaneous' : [
            require('./github/miscellaneous/emojis'),
            require('./github/miscellaneous/gitignore'),
            require('./github/miscellaneous/markdown'),
            require('./github/miscellaneous/meta'),
            require('./github/miscellaneous/rate_limit')
        ],

        'Organizations': [
            require('./github/organizations'),
            require('./github/organizations/members'),
            require('./github/organizations/teams')
        ],

        'Pull Requests': [
            require('./github/pull_requests'),
            require('./github/pull_requests/review_comments')
        ],

        'Repositories': [
            require('./github/repositories')
        ],

        'Search': [
            require('./github/search')
        ],

        'Users': [
            require('./github/users'),
            require('./github/users/emails'),
            require('./github/users/followers'),
            require('./github/users/public_keys')
        ]
    }
};
