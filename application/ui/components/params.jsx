'use strict';

var _               = require('underscore');
var React           = require('react');
var ParamRow        = require('./param-row');

module.exports = React.createClass({
    displayName : 'Params',

    propTypes : {
        params   : React.PropTypes.array,
        onChange : React.PropTypes.func
    },

    getInitialState : function()
    {
        var values = {};
        _.each(this.props.params, function(param) {
            if (typeof param.defaultValue !== 'undefined') {
                values[param.name] = param.defaultValue;
                return;
            }
            switch (param.type) {
                case 'string':
                    values[param.name] = '';
                    break;
                case 'number':
                    values[param.name] = 0;
                    break;
                case 'boolean':
                    values[param.name] = false;
                    break;
                case 'array':
                case 'array[hash]':
                case 'array[object]':
                    values[param.name] = [];
                    break;
                case 'object':
                case 'hash':
                case 'custom-object':
                    values[param.name] = {};
                    break;
            }
        });

        return {
            values      : values,
            nullKeys    : [],
            excludeKeys : []
        };
    },

    getValue : function()
    {
        var data = {}, paramName;

        for (var i in this.props.params) {
            paramName = this.props.params[i].name;
            if (typeof this.state.excludeKeys[paramName] === 'undefined') {
                if (typeof this.state.nullKeys[paramName] === 'undefined') {
                    data[paramName] = this.state.values[paramName];
                } else {
                    data[paramName] = null;
                }
            }
        }

        return data;
    },

    /**
     * Manage null values
     * @param key
     * @param value
     */
    nullHandler : function(key, value)
    {
        var state = _.extend({}, this.state);

        if (value) {
            state.nullKeys[key] = true;
        } else {
            delete state.nullKeys[key];
        }

        this.setState(state);
    },

    includeHandler : function(key, value)
    {
        var state = _.extend({}, this.state);

        if (!value) {
            state.excludeKeys[key] = true;
        } else {
            delete state.excludeKeys[key];
        }

        this.setState(state);
    },

    changeHandler : function(key, value)
    {
        var state = _.extend({}, this.state);
        console.log(arguments);

        state.values[key] = value;

        this.setState(state);

        this.props.onChange(this.getValue());
    },

    renderParams : function()
    {
        var rows = [];
        var component = this;

        _.each(this.props.params, function(item) {
            rows.push(
                <ParamRow
                    key         = {item.name}
                    param       = {item}
                    onChange    = {_.partial(component.changeHandler, item.name)}
                    onInclude   = {_.partial(component.includeHandler, item.name)}
                    onNull      = {_.partial(component.nullHandler, item.name)}
                />
            );
        });

        return rows;
    },

    render : function()
    {
        var header = (
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Include</th>
                    <th>NULL</th>
                    <th>Type</th>
                    <th>Value</th>
                </tr>
            </thead>
        );

        return (
            <table>
                {header}
                {this.renderParams()}
            </table>
        );
    }
});
