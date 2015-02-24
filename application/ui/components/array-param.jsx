/* global console */
'use strict';

var _             = require('underscore');
var React         = require('react');
var AbstractParam = require('./abstract-param');
var Select        = require('./input/select');
var Text          = require('./input/text');
var marked        = require('marked');
var ArrayObject   = require('synapse-common/lib/array-object');

module.exports = React.createClass(_.extend(AbstractParam, {

    displayName : 'ArrayParameter',

    getInitialState : function()
    {
        return {
            values : new ArrayObject()
        };
    },

    getDefaultValue : function()
    {
        var type = this.getParamType();

        if (type === 'enum') {
            return this.props.defaultValue || this.props.enumValues[0];
        } else if (type === 'boolean') {
            return this.props.defaultValue || true;
        }

        return this.props.defaultValue;
    },

    getValue : function()
    {
        return this.state.values.getAsArray();
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

        if (this.getParamType() === 'enum') {
            if (! this.props.enumValues.length) {
                console.warn('Missing enumValues for param: ' + this.props.name);
            }

            field = (
                <Select
                    className    = 'array-input'
                    options      = {this.props.enumValues}
                    value        = {value}
                    handleChange = {this.updateField}
                    key          = {index}
                />
            );
        } else if (this.getParamType() === 'boolean') {
            field = (
                <Select
                    className    = 'array-input'
                    options      = {['true', 'false']}
                    value        = {value}
                    handleChange = {this.updateField}
                    key          = {index}
                />
            );
        } else {
            field = (
                <Text
                    className    = 'array-input'
                    value        = {value}
                    handleChange = {this.updateField}
                    key          = {index}
                />
            );
        }

        callback = function () {
            instance.removeField(index);
        };

        return [
            <a className='button field-button--remove' onClick={callback}>–</a>,
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

        values.edit(key, this.filterValue(value));

        this.setState({
            values : values
        });
    },

    getValueFromTarget : function(target)
    {
        if (this.getParamType() === 'enum') {
            return target.options[target.selectedIndex].text;
        }

        return target.value;
    },

    removeField : function(index)
    {
        var values = this.state.values;

        values.remove(index);

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
                <td className='array-title'><code>{this.props.name}</code></td>
                <td className='array-td td--max-width'>
                    <a className='button field-button--add' onClick={this.addField}>{'+ Add Field'}</a>
                    {this.getInputs()}
                </td>
                <td className='array-title'>Array of <code>{this.getParamType()}</code>s</td>
                <td className='array-title' dangerouslySetInnerHTML={{__html: marked(description)}}></td>
            </tr>
        );
    }
}));
