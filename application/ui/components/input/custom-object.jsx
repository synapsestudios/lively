/** @jsx React.DOM */
'use strict';

var _             = require('underscore');
var React         = require('react');
var ObjectParameter;

module.exports = ObjectParameter = React.createClass({

    displayName : 'ObjectParameter',

    getInitialState : function()
    {
        return {
            values : []
        };
    },

    getValue : function()
    {
        return this.state.values;
    },

    getDefaultValue : function()
    {
        return {
            key         : '',
            value       : '',
            inputType   : 'string'
        };
    },

    getInputs : function()
    {
        var inputs    = [],
            component = this;

        _.each(this.state.values, function (value, index) {
            inputs.push(component.getInput(value, index));
        });

        return inputs;
    },

    getInput : function(prop, index)
    {
        var field, selectType, instance = this;

        if (prop.inputType !== 'object') {
            field = (
                <input
                    className    = 'array-input'
                    value        = {prop.value}
                    onChange     = {_.partial(instance.updateField, index, 'value')}
                />
            );
        } else {
            field = (
                <table>
                    <ObjectParameter value={prop.value} index={index} onChange={_.partial(instance.updateField, index, 'value')}/>
                </table>
            );
        }

        var rmCallback = function () {
            instance.removeField(index);
        };

        if (prop.inputType === 'object') {
            selectType = 'object';
        } else {
            selectType = (
                <select
                    className = 'select'
                    onChange  = {_.partial(instance.updateField, index, 'inputType')}
                    value     = {prop.inputType}
                >
                    <option value={'string'}>String</option>
                    <option value={'number'}>Number</option>
                </select>
            );
        }

        return (
            <tr key={index}>
                <td>
                    <a className='button field-button--remove' onClick={rmCallback}>–</a>
                </td>
                <td>
                    <label>Key: <input
                        className    = 'array-input'
                        value        = {prop.key}
                        onChange     = {_.partial(instance.updateField, index, 'key')}
                    />
                    </label>
                    <label>Type: {selectType}</label>
                    <br />
                    <label>Value: {field}</label>
                </td>
            </tr>
        );
    },

    updateValuesForRequest : function()
    {
        var data = {};

        for(var i in this.state.values) {
            var val = this.state.values[i];
            switch (val.inputType) {
                case 'string':
                case 'object':
                    data[val.key] = val.value;
                    break;
                case 'number':
                    data[val.key] = parseInt(val.value);
                    break;
            }
        }

        this.props.onChange(data);
    },

    addField : function()
    {
        var values = this.state.values;

        values.push(this.getDefaultValue());

        this.setState({
            values : values
        });

        this.updateValuesForRequest();
    },

    addObject : function()
    {
        var values = this.state.values;

        var defValue        = this.getDefaultValue();
        defValue.inputType  = 'object';

        values.push(defValue);

        this.setState({
            values : values
        });

        this.updateValuesForRequest();
    },

    updateField : function(index, type, event)
    {
        var values = this.state.values;

        if (typeof values[index] === 'undefined') {
            values[index] = {
                'key' : '',
                'value' : '',
                'type'  : 'string'
            };
        }
        if (typeof event.target === 'undefined') {
            // just setting value from a child object
            values[index][type] = event;
        } else {
            values[index][type] = event.target.value;
        }

        this.setState({
            values : values
        });

        this.updateValuesForRequest();
    },

    removeField : function(index)
    {
        var values = this.state.values;

        delete values[index];

        this.setState({
            values : values
        });

        this.updateValuesForRequest();
    },

    render : function()
    {
        return (
            <tr>
                <td className='array-title'><code>{this.props.name}</code></td>
                <td className='array-td td--max-width' colSpan={5}>
                    <table>
                        {this.getInputs()}
                    </table>
                    <a className='button field-button--add' onClick={this.addField}>{'+ Add Field'}</a>
                    <a className='button field-button--add' onClick={this.addObject}>{'+ Add Object'}</a>
                </td>
            </tr>
        );
    }
});
