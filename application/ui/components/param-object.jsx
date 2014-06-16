/** @jsx React.DOM */
'use strict';

var React  = require('react');

var marked = require('marked');

module.exports = {
    displayName : 'Parameter',

    propTypes : {
        name         : React.PropTypes.string.isRequired,
        required     : React.PropTypes.bool,
        type         : React.PropTypes.string.isRequired,
        description  : React.PropTypes.string,
        enumValues   : React.PropTypes.array,
        location     : React.PropTypes.oneOf([
            'header', 'query', 'body', 'uri'
        ]),
        defaultValue : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.bool
        ])
    },

    getValue : function()
    {
        var value = this.refs.input.getValue();

        return this.filterValue(value);
    },

    filterValue : function(value)
    {
        var type = this.getParamType();

        if (type === 'integer') {
            return parseInt(value, 10);
        } else if (type === 'boolean') {
            return (value === 'true');
        } else if (type === 'float') {
            return parseFloat(value);
        }

        return value;
    },

    /**
     * Get the type of param
     *
     * Used to normalize aliases for integer and boolean
     *
     * @return string
     */
    getParamType : function()
    {
        var type = this.props.type;

        if (type === 'int') {
            return 'integer';
        } else if (type === 'bool') {
            return 'boolean';
        }

        return type;
    },

    getDefaultProps : function()
    {
        return {
            required      : false,
            description   : '',
            allowedValues : [],
            enumValues    : [],
            location      : 'body'
        };
    },

    render : function()
    {
        marked.setOptions({ sanitize: true });
        var description = (this.props.required ? '**Required**. ' : '') + this.props.description;

        return (
            <tr>
                <td><code>{this.props.name}</code></td>
                <td>{this.getInput()}</td>
                <td><code>{this.props.type}</code></td>
                <td dangerouslySetInnerHTML={{__html: marked(description)}}></td>
            </tr>
        );
    }
};
