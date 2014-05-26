'use strict';

var paramTemplate = {
    name         : 'template',
    required     : true,
    type         : 'string',
    location     : 'uri',
    description  : 'The name of the template.'
};

module.exports = {
    name     : 'Gitignore',
    synopsis : 'When you create a new GitHub repository via the API, you can specify a .gitignore template to apply to the repository upon creation. The .gitignore Templates API lists and fetches templates from the GitHub .gitignore repository.',
    methods : [
        {
            name     : 'Listing available templates',
            synopsis : 'List all templates available to pass as an option when creating a repository.',
            method   : 'GET',
            uri      : '/gitignore/templates',
            oauth    : false,
            params   : []
        },
        {
            name     : 'Get a single template',
            synopsis : 'The API also allows fetching the source of a single template. Use the raw media type to get the raw contents.',
            method   : 'GET',
            uri      : '/gitignore/templates/:template',
            oauth    : false,
            params   : [
                paramTemplate
            ]
        }
    ]
};
