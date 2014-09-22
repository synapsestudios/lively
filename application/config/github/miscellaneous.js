'use strict';

module.exports = {
    name      : 'Miscellaneous',
    methods   : [],
    resources : [
        require('./miscellaneous/emojis'),
        require('./miscellaneous/gitignore'),
        require('./miscellaneous/markdown'),
        require('./miscellaneous/meta'),
        require('./miscellaneous/rate_limit')
    ]
};
