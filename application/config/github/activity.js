'use strict';

module.exports = {
    name      : 'Activity',
    slug      : 'activity',
    synopsis  : 'This is a read-only API to the GitHub events.',
    methods   : [],
    resources : [
        require('./activity/events'),
        require('./activity/feeds'),
        require('./activity/notifications'),
        require('./activity/starring'),
        require('./activity/watching'),
        require('./activity/event_types')
    ]
};
