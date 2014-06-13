/** @jsx React.DOM */
/* global console */
'use strict';

var React  = require('react');
var Select = require('./input/select');
var Text   = require('./input/text');
var marked = require('marked');

module.exports = React.createClass({

    displayName : 'ArrayParameter',

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

    getInitialState : function()
    {
        return {
            values : [this.defaultValue]
        };
    },

    getValue : function()
    {
        var valueArray = [],
            instance   = this;

        this.state.values.forEach(function (value) {
            valueArray.push(instance.getInputValue(value));
        });

        return valueArray;
    },

    getInputValue : function()
    {
        var value = this.refs.input.getValue(),
            type  = this.props.type;

        if (type === 'int' || type === 'integer') {
            return parseInt(value, 10);
        } else if (type === 'bool' || type === 'boolean') {
            return (value === 'true');
        } else if (type === 'float') {
            return parseFloat(value);
        }

        return value;
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

    getInputs : function()
    {
        var inputs   = [],
            instance = this;

        this.state.values.forEach(function (value) {
            inputs.push(instance.getInput(value));
        });

        return inputs;
    },

    getInput : function(value)
    {
        if (this.props.type === 'enum') {
            if (! this.props.enumValues.length) {
                console.warn('Missing enumValues for param: ' + this.props.name);
            }

            return <Select options={this.props.enumValues} ref='input' />;
        } else if (this.props.type === 'boolean' || this.props.type === 'bool') {
            return <Select options={['true', 'false']} ref='input' />;
        } else if (this.props.type.substring(0, 5) === 'array') {
            return this.getArrayInputs();
        } else {
            return <Text defaultValue={this.props.defaultValue} ref='input' />;
        }
    },

    addField : function()
    {
        var values = this.state.values;

        values.push('');

        this.setState({
            values : values
        });
    },

    render : function()
    {
        console.log('rendering');
        marked.setOptions({ sanitize: true });
        var description = (this.props.required ? '**Required**. ' : '') + this.props.description;

        return (
            <tr>
                <td><code>{this.props.name}</code></td>
                <td>
                    {this.getInputs()}
                    <a onClick={this.addField}>+</a>
                </td>
                <td>Array of <code>{this.props.type}</code>s</td>
                <td dangerouslySetInnerHTML={{__html: marked(description)}}></td>
            </tr>
        );
    }
});