'use strict';

var paramText = {
    name         : 'text',
    required     : true,
    type         : 'string',
    location     : 'body',
    description  : 'The Markdown text to render.'
};

var paramMode = {
    name         : 'mode',
    required     : false,
    defaultValue : 'markdown',
    type         : 'enum',
    location     : 'body',
    description  : 'The rendering mode.',
    enumValues   : [
        'markdown',
        'gfm'
    ]
};

var paramContext = {
    name         : 'context',
    required     : false,
    type         : 'string',
    location     : 'body',
    description  : 'The repository context. Only taken into account when rendering as `gfm`.'
};

module.exports = {
    name      : 'Markdown',
    endpoints : [
        {
            name     : 'Render an arbitrary Markdown document',
            synopsis : '',
            method   : 'POST',
            uri      : '/markdown',
            oauth    : false,
            params   : [
                paramText,
                paramMode,
                paramContext
            ]
        },
        {
            name     : 'Render a Markdown document in raw mode',
            synopsis : 'The raw API is not JSON-based. It takes a Markdown document as plaintext (`text/plain` or `text/x-markdown`) and renders it as plain Markdown without a repository context (just like a README.md file is rendered – this is the simplest way to preview a readme online).',
            method   : 'POST',
            uri      : '/markdown/raw',
            oauth    : false,
            params   : []
        }
    ]
};
