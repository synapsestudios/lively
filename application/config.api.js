module.exports = {
    "baseUrl" : "api.github.com",
    "oauth2"  : {
        "type"         : "authorization-code",
        "baseUrl"      : 'https://api.github.com',
        "hostname"     : "github.com",
        "port"         : 443,
        "authorizeUrl" : "/login/oauth/authorize",
        "tokenUrl"     : "/login/oauth/access_token",
        "tokenParam"   : "token"
    }
};
