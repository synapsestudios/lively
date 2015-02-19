'use strict';

/**
 * URI Helper
 * @type {Object}
 */
module.exports = {
    /**
     * Takes a resource object from an API configuration and returns the slug for that resource
     *
     * @param  {String} name Parameter name
     * @param  {String} uri  URI string with tokenized parameters
     * @return {Boolean}     True if parameter name is within the uri
     */
    isParameterNameInUri : function(name, uri)
    {
        var regex = new RegExp(':' + name + '(?![A-z])');

        return regex.test(uri);
    },

    /**
     * Injects value into tokenized URI
     *
     * @param  {String} name   Parameter name
     * @param  {String} uri    URI string with tokenized parameters
     * @param  {String} value  Parameter value
     * @return {String}        URI with replaced parameter
     */
    injectValueIntoUri : function(name, uri, value) {
        var regex = new RegExp(':' + name + '(?![A-z])');

        uri = uri.replace(regex, encodeURIComponent(value));

        return uri;
    }
};
