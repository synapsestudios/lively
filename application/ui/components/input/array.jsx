/** @jsx React.DOM */
'use strict';

var _             = require('underscore');
var React         = require('react');
var Select        = require('./select');
var Text          = require('./text');
var ArrayParameter;

module.exports = ArrayParameter = React.createClass({

    displayName : 'ArrayParameter',

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
            value     : '',
            inputType : 'string'
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

        switch (prop.inputType) {
            case 'string':
            case 'number':
                field = (
                    <Text
                        className = 'array-input'
                        value     = {prop.value}
                        onChange  = {_.partial(instance.updateField, index, 'value')}
                        />
                );
                break;
            case 'object':
                field = (
                    <table>
                        <ArrayParameter value={prop.value} index={index} onChange={_.partial(instance.updateField, index, 'value')}/>
                    </table>
                );
                break;
            case 'null':
                field = null;
                break;
        }

        var rmCallback = function () {
            instance.removeField(index);
        };

        if (prop.inputType === 'object') {
            selectType = 'object';
        } else {
            selectType = (
                <Select
                    className = 'select'
                    onChange  = {_.partial(instance.updateField, index, 'inputType')}
                    value     = {prop.inputType}
                    options   = {[
                                    {
                                        label : 'string',
                                        value : 'string'
                                    },
                                    {
                                        label : 'number',
                                        value : 'number'
                                    },
                                    {
                                        label : 'null',
                                        value : 'null'
                                    }
                                ]}
                />
            );
        }

        return (
            <tr key={index}>
                <td>
                    <a className='button field-button--remove' onClick={rmCallback}>–</a>
                </td>
                <td>
                    Type: {selectType}
                    <br />
                    Value: {field}
                </td>
            </tr>
        );
    },

    updateValuesForRequest : function()
    {
        var data = [];

        for(var i in this.state.values) {
            var val = this.state.values[i];
            switch (val.inputType) {
                case 'string':
                case 'object':
                    data[i] = val.value;
                    break;
                case 'number':
                    data[i] = parseInt(val.value);
                    break;
                case 'null':
                    data[i] = null;
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

    updateField : function(index, type, value)
    {
        var values = this.state.values;

        if (typeof values[index] === 'undefined') {
            values[index] = {
                'value' : '',
                'type'  : 'string'
            };
        }

        values[index][type] = value;

        this.setState({
            values : values
        });

        this.updateValuesForRequest();
    },

    removeField : function(index)
    {
        var values = this.state.values;

        values.splice(index, 1);

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
                </td>
            </tr>
        );
    }
});
