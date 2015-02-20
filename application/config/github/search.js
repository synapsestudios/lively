'use strict';

var paramQ = {
    name         : 'q',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The search keywords.'
};

var paramSort = {
    name         : 'sort',
    required     : false,
    type         : 'string',
    location     : 'uri',
    description  : 'The sort field. One of stars, forks, or updated. Default: results are sorted by best match.'
};

var paramOrder = {
    name         : 'order',
    required     : false,
    defaultValue : 'desc',
    type         : 'enum',
    location     : 'uri',
    description  : 'The sort order if sort parameter is provided. One of asc or desc.',
    enumValues   : [
        'asc',
        'desc'
    ]
};

module.exports = {
    name     : 'Search',
    endpoints : [
        {
            name     : 'Search repositories',
            synopsis : 'Find repositories via various criteria. This method returns up to 100 results per page.',
            method   : 'GET',
            uri      : '/search/repositories',
            oauth    : false,
            params   : [
                paramQ,
                paramSort,
                paramOrder
            ]
        },
        {
            name     : 'Search code',
            synopsis : 'Find file contents via various criteria. (This method returns up to 100 results per page.)',
            method   : 'GET',
            uri      : '/search/code',
            oauth    : false,
            params   : [
                paramQ,
                paramSort,
                paramOrder
            ]
        },
        {
            name     : 'Search issues',
            synopsis : 'Find issues by state and keyword. (This method returns up to 100 results per page.)',
            method   : 'GET',
            uri      : '/search/issues',
            oauth    : false,
            params   : [
                paramQ,
                paramSort,
                paramOrder
            ]
        },
        {
            name     : 'Search users',
            synopsis : 'Find users via various criteria. (This method returns up to 100 results per page.)',
            method   : 'GET',
            uri      : '/search/users',
            oauth    : false,
            params   : [
                paramQ,
                paramSort,
                paramOrder
            ]
        }
    ]
};
