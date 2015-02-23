'use strict';

module.exports = {
    name      : 'Rate Limit',
    synopsis  : 'The overview documentation describes the rate limit rules. You can check your current rate limit status at any time using the Rate Limit API described below.',
    endpoints : [
        {
            name     : 'Get your current rate limit status',
            synopsis : 'Note: Accessing this endpoint does not count against your rate limit.',
            method   : 'GET',
            uri      : '/rate_limit',
            oauth    : false,
            params   : []
        }
    ]
};
