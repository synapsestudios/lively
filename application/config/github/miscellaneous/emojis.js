'use strict';

module.exports = {
    name     : 'Emojis',
    synopsis : 'Lists all the emojis available to use on GitHub.',
    methods : [
        {
            name     : 'Emojis',
            synopsis : '',
            method   : 'GET',
            uri      : '/emojis',
            oauth    : false,
            params   : []
        }
    ]
};
