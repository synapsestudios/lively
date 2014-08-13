'use strict';

var fs               = require('fs');
var marked           = require('marked');
var listFeedsSummary = fs.readFileSync(__dirname + '/list-feeds-summary.md').toString();

module.exports = {
    name     : 'Feeds',
    methods : [
        {
            name     : 'List feeds',
            synopsis : marked(listFeedsSummary),
            method   : 'GET',
            uri      : '/feeds',
            oauth    : false,
            params   : []
        }
    ]
};
