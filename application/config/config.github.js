module.exports = {
    "name" : "GitHub v3 API",
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
    "resources" : [
        require('./github/issues'),
        require('./github/issues/assignees'),
        require('./github/issues/comments')
    ]
};
