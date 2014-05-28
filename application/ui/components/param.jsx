/** @jsx React.DOM */
'use strict';

var React  = require('react');
var Select = require('./input/select');
var Text   = require('./input/text');

module.exports = React.createClass({

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
            React.PropTypes.number
        ])
    },

    getValue : function()
    {
        if (this.props.type === 'bool' || this.props.type === 'boolean') {
            return Boolean(this.refs.input.getValue());
        } else {
            return this.refs.input.getValue();
        }
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

    getInput : function()
    {
        if (this.props.type === 'enum') {
            if (! this.props.enumValues.length) {
                console.warn('Missing enumValues for param: ' + this.props.name);
            }

            return <Select options={this.props.enumValues} ref='input' />;
        } else if (this.props.type === 'boolean' || this.props.type === 'bool') {
            return <Select options={['true', 'false']} ref='input' />;
        } else {
            return <Text defaultValue={this.props.defaultValue} ref='input' />;
        }
    },

    render : function()
    {
        return (
            <tr>
                <td><code>{this.props.name}</code></td>
                <td>{this.getInput()}</td>
                <td><code>{this.props.type}</code></td>
                <td>{this.props.description}</td>
            </tr>
        );
    }
});
