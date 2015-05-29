/** @jsx React.DOM */
'use strict';

var _             = require('underscore');
var React         = require('react');
var Select        = require('./select');
var Text          = require('./text');
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

        switch (prop.inputType) {
            case 'string':
            case 'number':
                field = (
                    <Text
                        className    = 'array-input'
                        value        = {prop.value}
                        onChange     = {_.partial(instance.updateField, index, 'value')}
                        />
                );
                break;
            case 'boolean':
                field = (
                    <Select
                        value={prop.value}
                        index={index}
                        options={[{value: false, label: 'false'}, {value: true, label: 'true'}]}
                        onChange={_.partial(instance.updateField, index, 'value')}
                    />
                );
                break;
            case 'object':
                field = (
                    <table>
                        <ObjectParameter
                            value={prop.value}
                            index={index}
                            onChange={_.partial(instance.updateField, index, 'value')}
                        />
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
                        {label:'string', value:'string'},
                        {label:'number', value:'number'},
                        {label:'boolean', value:'boolean'},
                        {label:'null', value:'null'}]}
                />
            );
        }

        return (
            <tr className='array__options__inner array__options__custom-object' key={index}>
                <td className='array__options__delete'>
                    <a className='button button--remove field-button--remove' onClick={rmCallback}>–</a>
                </td>
                <td>
                    <div className='array__options__custom-object--key'>
                        <strong className='strong'>Key:</strong>
                        <Text
                            className    = 'array-input'
                            value        = {prop.key}
                            onChange     = {_.partial(instance.updateField, index, 'key')}
                        />
                    </div>
                    <div className='array__options__custom-object--type'>
                        <strong className='strong'>Type:</strong> {selectType}
                    </div>
                    <div className='array__options__custom-object--value'>
                        <strong className='strong'>Value:</strong> {field}
                    </div>
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
                    data[val.key] = parseInt(val.value, 10);
                    break;
                case 'boolean':
                    data[val.key] = val.value;
                    break;
                case 'null':
                    data[val.key] = null;
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

    updateField : function(index, type, value)
    {
        var values = this.state.values;

        if (typeof values[index] === 'undefined') {
            values[index] = {
                'key' : '',
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

        delete values[index];

        this.setState({
            values : values
        });

        this.updateValuesForRequest();
    },

    render : function()
    {

        var renderTitle = this.props.name ? (<td className='array__title'><code>{this.props.name}</code></td>) : null;

        return (
            <table className='array__group'>
                <tbody>
                    <tr>
                        {renderTitle}
                        <td className='array__options' colSpan={5}>
                            <table>
                                {this.getInputs()}
                            </table>
                            <a className='button button--lblue field-button--add' onClick={this.addField}>{'+ Add Field'}</a>
                            <a className='button button--lblue field-button--add' onClick={this.addObject}>{'+ Add Object'}</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
});
