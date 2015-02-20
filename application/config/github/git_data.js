'use strict';

module.exports = {
    name      : 'Git Data',
    endpoints : [],
    resources : [
        require('./git_data/blobs'),
        require('./git_data/commits'),
        require('./git_data/references'),
        require('./git_data/tags'),
        require('./git_data/trees')
    ]
};
