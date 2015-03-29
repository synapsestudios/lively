'use strict';

var paramEnum = {
    name         : 'enumKey',
    required     : false,
    type         : 'enum',
    defaultValue : 'subscribed',
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
    description : 'Lorem doler sit amet.'
};

var paramNumber = {
    name        : 'numberKey',
    required    : false,
    type        : 'number',
    description : 'Numbers, integers, or whatever?'
};

var paramBool = {
    name         : 'boolKey',
    defaultValue : true,
    required     : false,
    type         : 'boolean',
    description  : 'True or false values go in here.'
};

var paramCustom = {
    name        : 'customObjectKey',
    required    : false,
    type        : 'custom-object',
    description : 'Description about a custom parameter.'
};

var paramArray = {
    name        : 'arrayKey',
    required    : false,
    type        : 'array',
    description : 'This is for a list of strings.',
    param : {
        type : 'string',
        name : 'someString'
    }
};

var paramArrayCustom = {
    name        : 'arrayCustomKey',
    required    : false,
    type        : 'array',
    description : 'This is for a list of custom objects.',
    param : paramCustom
};

var paramStripe = {
    name        : 'stripeTokenKey',
    required    : false,
    type        : 'stripe-token',
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
            description : 'This is the first hash thing'
        },
        {
            name        : 'hashStringBKey',
            required    : false,
            type        : 'string',
            description : 'This is the second hash thing'
        }
    ]
};


module.exports = {
    name      : 'PARAM TEST',
    endpoints : [
        {
            name     : 'PARAMETER TESTING ENDPOINT',
            synopsis : 'Not real',
            method   : 'POST',
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
                paramArray,
                paramArrayCustom
            ]
        }
    ]
};
