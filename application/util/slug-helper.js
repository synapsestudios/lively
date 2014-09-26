'use strict';

var _ = require('underscore');

module.exports = {
    getSlugFromResource : function(resource)
    {
        var slug = resource.slug;

        if (_.isUndefined(slug)) {
            slug = resource.name.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
        }

        return slug;
    },
};
