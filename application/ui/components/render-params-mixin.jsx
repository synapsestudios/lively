/** @jsx React.DOM */
'use strict';

var React  = require('react');
var marked = require('marked');

module.exports = {

    componentWillMount : function()
    {
        marked.setOptions({ sanitize: true });
    },

    renderInputTypeDescription : function(type)
    {
        var isArray = this.isArray(type);

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

    appendPath : function(path, newPath)
    {
        var result = path.slice();

        result.push(newPath);

        return result;
    }
};
