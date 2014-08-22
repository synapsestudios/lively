/** @jsx React.DOM */
'use strict';

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
            isArray ? 'Array of ' : null,
            <code>{type}</code>,
            isArray ? ' elements' : null
        ];
    },

    renderDescriptionColumn : function(param)
    {
        var innerHtml, description;

        description = (param.required ? '**Required**. ' : '') + param.description;

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
