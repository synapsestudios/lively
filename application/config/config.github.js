module.exports = {
    "name" : "GitHub v3 API",
    "logo" : "/images/logos/github-mark.png",
    "api"  : {
        "hostname" : "api.github.com",
        "port"     : 443,
        "secure"   : true
    },
    "oauth2" : {
        "type"         : "authorization-code",
        "hostname"     : "github.com",
        "port"         : 443,
        "secure"       : true,
        "authorizeUrl" : "/login/oauth/authorize",
        "tokenUrl"     : "/login/oauth/access_token",
        "tokenParam"   : "token"
    },
    "resources" : {
        "Git Data" : [
            require('./github/git_data/blobs'),
            require('./github/git_data/commits')
            // require('./github/git_data/references'),
            // require('./github/git_data/tags'),
            // require('./github/git_data/trees'),
        ],

        "Issues" : [
            require('./github/issues'),
            require('./github/issues/assignees'),
            require('./github/issues/comments'),
            require('./github/issues/events'),
            require('./github/issues/labels'),
            require('./github/issues/milestones')
        ],

        "Miscellaneous" : [
            require('./github/miscellaneous/emojis'),
            require('./github/miscellaneous/gitignore'),
            require('./github/miscellaneous/markdown'),
            require('./github/miscellaneous/meta'),
            require('./github/miscellaneous/rate_limit')
        ],

        "Organizations": [
            require('./github/organizations'),
            require('./github/organizations/members'),
            require('./github/organizations/teams')
        ],

        "Pull Requests": [
            require('./github/pull_requests'),
            require('./github/pull_requests/review_comments')
        ]
    }
};
