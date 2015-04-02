/** @jsx React.DOM */
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
        var values   = {};
        var includes = {};

        _.each(this.props.params, function(param) {
            includes[param.name] = true;

            if (typeof param.defaultValue !== 'undefined') {
                values[param.name] = param.defaultValue;
                return;
            }

            switch (param.type) {
                case 'string':
                    values[param.name] = param.defaultValue ? param.defaultValue : '';
                    break;
                case 'number':
                case 'integer':
                case 'float':
                    values[param.name] = param.defaultValue ? param.defaultValue : 0;
                    break;
                case 'boolean':
                    values[param.name] = param.defaultValue ? param.defaultValue : false;
                    break;
                case 'enum':
                    values[param.name] = param.defaultValue ? param.defaultValue : param.defaultValue;
                    break;
                case 'array':
                    values[param.name] = param.defaultValue ? param.defaultValue : [];
                    break;
                case 'object':
                case 'hash':
                case 'custom-object':
                    values[param.name] = param.defaultValue ? param.defaultValue : {};
                    break;
                case 'stripe-token':
                    values[param.name] = param.defaultValue ? param.defaultValue : null;
                    break;
                case 'file':
                    values[param.name] = param.defaultValue ? param.defaultValue : null;
                    break;
                case 'checkbox':
                    values[param.name] = param.defaultValue ? param.defaultValue : false;
                    break;
            }
        });

        return {
            values      : values,
            nullKeys    : {},
            includeKeys : includes
        };
    },

    getValue : function()
    {
        var data = {}, paramName;

        for (var i in this.props.params) {
            paramName = this.props.params[i].name;
            if (typeof this.state.includeKeys[paramName] !== 'undefined') {
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

        this.props.onChange(this.getValue());
        this.setState(state);
    },

    includeHandler : function(key, value)
    {
        var state = _.extend({}, this.state);

        if (value) {
            state.includeKeys[key] = true;
        } else {
            delete state.includeKeys[key];
        }

        this.setState(state);
        this.props.onChange(this.getValue());
    },

    changeHandler : function(key, value)
    {
        var state = _.extend({}, this.state);

        state.values[key] = value;

        this.setState(state, function() {
            this.props.onChange(this.getValue());
        });
    },

    // ensures values are passed up even if none have changed
    componentDidMount: function()
    {
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
                    value       = {component.state.values[item.name]}
                    onChange    = {_.partial(component.changeHandler, item.name)}
                    onInclude   = {_.partial(component.includeHandler, item.name)}
                    onNull      = {_.partial(component.nullHandler, item.name)}
                    isNull      = {typeof component.state.nullKeys[item.name] !== 'undefined'}
                    isIncluded  = {typeof component.state.includeKeys[item.name] !== 'undefined'}
                    method      = {component.props.endpointMethod}
                />
            );
        });

        return rows;
    },

    render : function()
    {
        if (this.props.params.length === 0) {
            return (
                <span />
            );
        }
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
