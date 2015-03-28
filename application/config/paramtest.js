'use strict';

var paramEnum = {
    name         : 'enumKey',
    required     : false,
    type         : 'enum',
    defaultValue : 'subscribed',
    location     : 'query',
    description  : 'Pick one of the options, or don\'t.',
    enumValues   : [
        'assigned',
        'created',
        'mentioned',
        'subscribed',
        'all'
    ]
};

var paramString = {
    name        : 'stringKey',
    required    : false,
    type        : 'string',
    location    : 'query',
    description : 'Lorem doler sit amet.'
};

var paramNumber = {
    name        : 'numberKey',
    required    : false,
    type        : 'number',
    location    : 'uri',
    description : 'Numbers, integers, or whatever?'
};

var paramBool = {
    name         : 'boolKey',
    defaultValue : true,
    required     : false,
    type         : 'boolean',
    location     : 'query',
    description  : 'True or false values go in here.'
};

var paramCustom = {
    name        : 'customObjectKey',
    required    : false,
    type        : 'custom-object',
    location    : 'query',
    description : 'Description about a custom parameter.'
};

var paramArray = {
    name        : 'arrayKey',
    required    : false,
    type        : 'array',
    location    : 'query',
    description : 'This is for a list of things.'
};

var paramStripe = {
    name        : 'stripeTokenKey',
    required    : false,
    type        : 'stripe-token',
    location    : 'query',
    description : 'Not totally sure what this does but it works now.'
};

var paramHash = {
    name       : 'hashKey',
    type       : 'hash',
    desription : 'Blaze it',
    params     : [
        {
            name        : 'hashStringAKey',
            required    : false,
            type        : 'string',
            location    : 'query',
            description : 'This is the first hash thing'
        },
        {
            name        : 'hashStringBKey',
            required    : false,
            type        : 'string',
            location    : 'query',
            description : 'This is the second hash thing'
        }
    ]
};


module.exports = {
    name      : 'PARAM TEST',
    endpoints : [
        {
            name     : 'EXAMPLE ENDPOINT',
            synopsis : 'Not real',
            method   : 'GET',
            uri      : '/somewhere',
            oauth    : false,
            params   : [
                paramEnum,
                paramString,
                paramNumber,
                paramBool,
                paramHash,
                paramCustom,
                paramStripe,
                paramArray
            ]
        }
    ]
};
