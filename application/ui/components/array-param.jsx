/** @jsx React.DOM */
/* global console */
'use strict';

var _           = require('underscore');
var React       = require('react');
var ParamObject = require('./param-object');
var Select      = require('./input/select');
var Text        = require('./input/text');
var marked      = require('marked');

module.exports = React.createClass(_.extend(ParamObject, {

    displayName : 'ArrayParameter',

    getInitialState : function()
    {
        return {
            values : [this.getDefaultValue()]
        };
    },

    getDefaultValue : function()
    {
        if (this.props.type === 'enum') {
            return this.props.defaultValue || this.props.enumValues[0];
        } else {
            return this.props.defaultValue;
        }
    },

    getValue : function()
    {
        return this.state.values;
    },

    getInputs : function()
    {
        var inputs   = [],
            instance = this;

        this.state.values.forEach(function (value, index) {
            inputs.push(instance.getInput(value, index));
        });

        return inputs;
    },

    getInput : function(value, index)
    {
        var callback, field, instance = this;

        if (this.props.type === 'enum') {
            if (! this.props.enumValues.length) {
                console.warn('Missing enumValues for param: ' + this.props.name);
            }

            field = <Select
                options={this.props.enumValues}
                handleChange={this.updateField}
                key={index}
             />;
        } else if (this.props.type === 'boolean' || this.props.type === 'bool') {
            field = <Select
                options={['true', 'false']}
                handleChange={this.updateField}
                key={index}
            />;
        } else {
            field = <Text
                value={value}
                handleChange={this.updateField}
                key={index}
            />;
        }

        callback = function () {
            instance.removeField(index);
        };

        return [
            <a onClick={callback}>-</a>,
            field
        ];
    },

    addField : function()
    {
        var values = this.state.values;

        values.push(this.getDefaultValue());

        this.setState({
            values : values
        });
    },

    updateField : function(event, component)
    {
        var key    = component.props.key,
            values = this.state.values,
            value  = this.getValueFromTarget(event.target);

        values[key] = this.filterValue(value);

        if (isNaN(values[key])) {
            values[key] = value;
        }

        this.setState({
            values : values
        });
    },

    getValueFromTarget : function(target)
    {
        if (this.props.type === 'enum') {
            return target.options[target.selectedIndex].text;
        }

        return target.value;
    },

    removeField : function(index)
    {
        var values = this.state.values;

        values.splice(index, 1);

        this.setState({
            values : values
        });
    },

    render : function()
    {
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
}));
