'use strict';

var fs               = require('fs');
var marked           = require('marked');
var eventTypesSummary = fs.readFileSync(__dirname + '/event-types-summary.md').toString();

module.exports = {
    name     : 'Event Types & Payloads',
    slug     : 'event-types',
    synopsis : marked(eventTypesSummary),
    methods  : []
};
