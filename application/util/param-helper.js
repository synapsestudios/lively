'use strict';

var _ = require('underscore');

module.exports = {
    getArrayType : function(type)
    {
        var matches = type.match(/\[(.*?)\]/);

        if (matches === null) {
            return 'string';
        } else {
            return matches[0].substring(
                1,
                matches[0].length - 1
            );
        }
    },

    isArrayParam : function(type)
    {
        return type.substring(0, 5) === 'array';
    },

    getDefaultValuesForParams : function(params)
    {
        var defaultValues = {},
            self          = this;

        params.forEach(function(param) {
            defaultValues[param.name] = self.getDefaultValueForParam(param);
        });

        return defaultValues;
    },

    getDefaultValueForParam : function(param)
    {
        if (param.hasOwnProperty('defaultValue')) {
            return param.defaultValue;
        } else if (this.isArrayParam(param.type)) {
            return [];
        } else if (param.type === 'boolean') {
            return true;
        } else if (param.type === 'enum') {
            return _.first(param.enumValues)
        } else if (param.type === 'hash') {
            if (! _.isArray(param.params)) {
                var message = 'Hash type parameter with no sub-parameters defined: ';

                message += '[' + param.name + ']' + ' parameter in [' + this.props.name + '] method';
                throw new Error(message);
            }

            return this.getDefaultValuesForParams(param.params);
        }

        return null;
    },

    getDefaultValueForArrayParamElement : function(param)
    {
        var clone = _.clone(param);

        clone.type = this.getArrayType(param.type);

        return this.getDefaultValueForParam(clone);
    }
};
