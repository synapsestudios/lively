'use strict';

module.exports = {
    name    : 'Example API',
    api     : {
        hostname : '',
        port     : 9001,
        secure   : false
    },
    stripe_key : 'pk_test_F8viiVc00X4kcRshQNDFdosu',
    oauth2 : {
        type         : 'authorization-code',
        hostname     : 'localhost',
        port         : 80,
        secure       : false,
        authorizeUrl : '/login/oauth/authorize',
        tokenUrl     : '/login/oauth/access_token',
        tokenParam   : 'token'
    },
    resources : [
        require('./paramtest')
    ]
};
