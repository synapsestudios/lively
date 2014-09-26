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
    'resources' : [
        require('./github/activity'),
        require('./github/gists'),
        require('./github/git_data'),
        require('./github/issues'),
        require('./github/miscellaneous'),
        require('./github/organizations'),
        require('./github/pull_requests'),
        require('./github/repositories'),
        require('./github/search'),
        require('./github/users')
    ]
};
