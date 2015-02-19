'use strict';

var _ = require('underscore');

/**
 * Slug Helper
 * @type {Object}
 */
module.exports = {
    /**
     * Takes a resource object from an API configuration and returns the slug for that resource
     *
     * @param  {Object} resource A resource object
     * @return {string}          A string representing the slug for the provided resource
     */
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
