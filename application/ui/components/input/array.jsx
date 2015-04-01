/** @jsx React.DOM */
'use strict';

var _             = require('underscore');
var React         = require('react');

module.exports = React.createClass({

    displayName : 'ArrayParameter',

    getInitialState : function()
    {
        return {
            values   : []
        };
    },

    getValue : function()
    {
        var data = [];
        for(var i in this.state.values) {
            data.push(this.state.values[i]);
        }
        return data;
    },

    getInputs : function()
    {
        var inputs    = [],
            component = this;

        _.each(this.state.values, function (value, itemNum) {
            inputs.push(component.getInput(value, itemNum));
        });

        return inputs;
    },

    getInput : function(value, itemNum)
    {
        var component = this;
        var ParamRow = require('../param-row');

        var rmCallback = function () {
            component.removeField(itemNum);
        };

        return (
            <tr key={itemNum}>
                <td>
                    <a className='button field-button--remove' onClick={rmCallback}>–</a>
                </td>
                <td>
                    <table>
                    <ParamRow
                        simple      = {true}
                        value       = {value}
                        key         = {itemNum}
                        param       = {component.props.param}
                        onChange    = {_.partial(component.changeHandler, itemNum)}
                    />
                    </table>
                </td>
            </tr>
        );

    },

    updateValuesForRequest : function()
    {
        var data = [];

        for(var i in this.state.values) {
            var val = this.state.values[i];
            data.push(val);
        }

        this.props.onChange(data);
    },

    addField : function()
    {
        var values = this.state.values;

        values.push(
            null
        );

        this.setState({
            values   : values
        });

        this.updateValuesForRequest();
    },

    removeField : function(itemNum)
    {
        var values = this.state.values;

        delete values[itemNum];

        this.setState({
            values : values
        });

        this.updateValuesForRequest();
    },

    changeHandler : function(key, value)
    {
        var state = _.extend({}, this.state);

        state.values[key] = value;

        this.setState(state, function() {
            this.props.onChange(this.getValue());
        });
    },

    render : function()
    {
        return (
            <table>
                <tbody>
                    <tr>
                        <td className='array-title'><code>{this.props.name}</code></td>
                        <td className='array-td td--max-width' colSpan={5}>
                            <table>
                                <tbody>
                                {this.getInputs()}
                                </tbody>
                            </table>
                            <a className='button field-button--add' onClick={this.addField}>{'+ Add Field'}</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
});
