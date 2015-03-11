/* global console */
'use strict';

var _           = require('underscore');
var React       = require('react');
var marked      = require('marked');
var ParamHelper = require('../../util/param-helper');

module.exports = {

    componentWillMount : function()
    {
        marked.setOptions({ sanitize: true });
    },

    renderInputTypeDescription : function(type)
    {
        var isArray = ParamHelper.isArrayParam(type);

        return [
            <span key='param-array-of'>{isArray ? 'Array of ' : null}</span>,
            <code key='param-array-type'>{type}</code>,
            <span key='param-array-elements'>{isArray ? ' elements' : null}</span>
        ];
    },

    validateParamConfiguration : function(param)
    {
        var errors = [];

        switch (param.type) {
            case "enum":
                if (! param.enumValues.length) {
                    errors.push('Missing Enum Values');
                } else if (
                    typeof param.defaultValue !== 'undefined' &&
                    param.enumValues.indexOf(param.defaultValue) === -1
                ) {
                    errors.push('Default value for enum not in values list');
                }
                break;
        }

        if (errors.length > 0) {
            console.log(errors);
        }
        return errors;
    },

    renderDescriptionColumn : function(param)
    {
        var defaultValue, description, innerHtml, errors;

        if (_.isBoolean(param.defaultValue)) {
            defaultValue = (param.defaultValue) ? 'true' : 'false';
        } else {
            defaultValue = param.defaultValue;
        }

        description = (param.required ? '**Required**. ' : '') + param.description +
            (defaultValue ? ' **Default:** ' + defaultValue : '');

        // Add any configuration validation errors
        errors = this.validateParamConfiguration(param);
        if (errors.length > 0) {
            description += "\n\n**API CONFIGURATION ERROR**\n";
            for (var i in errors) {
                description += "* " + errors[i] + "\n";
            }
        }

        innerHtml = {
            __html: marked(description)
        };

        return (
            <td dangerouslySetInnerHTML={innerHtml}></td>
        );
    },

    appendPath : function(path, newPath)
    {
        var result = path.slice();

        result.push(newPath);

        return result;
    }
};
