'use strict';

var paramEmails = {
    name        : 'emails',
    required    : true,
    type        : 'array',
    location    : 'body',
    description : 'A single string or an array of email addresses.',
    param        : {
        name : 'Email Address',
        type : 'string'
    }
};

module.exports = {
    name      : 'Emails',
    endpoints : [
        {
            name     : 'List email addresses for a user',
            synopsis : '',
            method   : 'GET',
            uri      : '/user/emails',
            oauth    : true,
            params   : []
        },
        {
            name     : 'Add email address(es)',
            synopsis : 'You can post a single email address or an array of addresses.',
            method   : 'POST',
            uri      : '/user/emails',
            oauth    : true,
            bodyType : 'json-param',
            rootParam: 'emails',
            params   : [
                paramEmails
            ]
        },
        {
            name     : 'Delete email address(es)',
            synopsis : 'You can include a single email address or an array of addresses.',
            method   : 'DELETE',
            uri      : '/user/emails',
            oauth    : true,
            bodyType : 'json-param',
            rootParam: 'emails',
            params   : [
                paramEmails
            ]
        }
    ]
};
