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

    renderDescriptionColumn : function(param)
    {
        var defaultValue, description, innerHtml;

        if (_.isBoolean(param.defaultValue)) {
            defaultValue = (param.defaultValue) ? 'true' : 'false';
        } else {
            defaultValue = param.defaultValue;
        }

        description = (param.required ? '**Required**. ' : '') + param.description +
            (defaultValue ? ' **Default:** ' + defaultValue : '');

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
