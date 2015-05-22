/* global console */
'use strict';

var _               = require('underscore');
var React           = require('react');
var marked          = require('marked');
var Text            = require('./param/text');
var TextArea        = require('./param/text-area');
var Select          = require('./input/select');
var StripeToken     = require('./input/stripe-token');
var Checkbox        = require('./input/checkbox');
var CustomObject    = require('./input/custom-object');
var ArrayObject     = require('./input/array');
var FileParam       = require('./input/file');
var Params;

module.exports = React.createClass({
    displayName : 'Param',

    propTypes : {
        param     : React.PropTypes.object,
        onChange  : React.PropTypes.func,
        onInclude : React.PropTypes.func,
        onNull    : React.PropTypes.func,
        method    : React.PropTypes.string,
        simple    : React.PropTypes.bool
    },

    getDefaultProps : function()
    {
        return {
            param: {},
            onChange: function () {},
            onInclude: function () {},
            onNull: function () {},
            isNull: false,
            isIncluded: true,
            simple: false
        };
    },

    validateParamConfiguration : function(param)
    {
        var errors = [];

        if (param.type === 'enum') {
            if (! param.enumValues.length) {
                errors.push('Missing Enum Values');
            } else if (
                typeof param.defaultValue !== 'undefined' &&
                param.enumValues.indexOf(param.defaultValue) === -1
            ) {
                errors.push('Default value for enum not in values list');
            }
        }

        if (errors.length > 0) {
            console.warn(errors);
        }
        return errors;
    },

    renderDescription : function(param)
    {
        var defaultValue, description, innerHtml, errors;

        if (typeof param.description === 'undefined') {
            param.description = '';
        }

        if (_.isBoolean(param.defaultValue)) {
            defaultValue = (param.defaultValue) ? 'true' : 'false';
        } else {
            defaultValue = param.defaultValue;
        }

        description = (param.required ? '**Required**. ' : '') + param.description +
        (defaultValue ? ' **Default:** ' + defaultValue : '');

        // Add any configuration validation errors
        errors = this.validateParamConfiguration(param);
        if (errors.length > 0) {
            description += "\n\n**API CONFIGURATION ERROR**\n";
            for (var i in errors) {
                description += "* " + errors[i] + "\n";
            }
        }

        innerHtml = {
            __html: marked(description)
        };

        if (!description) {
            return null;
        }

        return (
            <td colSpan={5} dangerouslySetInnerHTML={innerHtml}></td>
        );
    },

    render : function()
    {
        var includeCheckboxComponent, nullCheckboxComponent, inlineParam = null, rowParam = null;
        var description;

        includeCheckboxComponent = (
            <Checkbox
                name      = {'include-' + this.props.param.name}
                onChange  = {this.props.onInclude}
                checked   = {this.props.isIncluded}
            />
        );
        if (
            this.props.method === 'GET' || this.props.param.location === 'uri' || this.props.param.location === 'query'
        ) {
            nullCheckboxComponent = ('N/A');
        } else {
            if (this.props.param.type !== 'file') {
                nullCheckboxComponent = (
                    <Checkbox
                        name      = {'null-' + this.props.param.name}
                        onChange  = {this.props.onNull}
                        checked   = {this.props.isNull}
                    />
                );
            } else {
                nullCheckboxComponent = ('N/A');
            }
        }


        switch (this.props.param.type) {
            // row-params
            case 'hash':
            case 'object':
                if (!Params) {
                    Params = require('./params');
                }
                rowParam = (
                    <tr>
                        <td colSpan={5}>
                            <Params
                                key      = {this.props.key}
                                params   = {this.props.param.params}
                                onChange = {this.props.onChange}
                                method   = {this.props.method}
                            />
                        </td>
                    </tr>
                );
                break;
            case 'array':
                rowParam = (
                    <tr>
                        <td colSpan={5}>
                            <ArrayObject
                                key      = {this.props.key}
                                param    = {this.props.param.param}
                                onChange = {this.props.onChange}
                                method   = {this.props.method}
                            />
                        </td>
                    </tr>
                );
                break;
            case 'custom-object':
                if (this.props.method === 'GET') {
                    rowParam = (<tr><td>{'INVALID CONFIGURATION - CANNOT USE `custom-object` IN GET REQUEST'}</td></tr>);
                } else {
                    rowParam = (
                        <tr>
                            <td colSpan={5}>
                                <CustomObject
                                    name     = ''
                                    onChange = {this.props.onChange}
                                />
                            </td>
                        </tr>
                    );
                }
                break;

            // inline params
            case 'enum':
                var enumValues = _.map(this.props.param.enumValues, function (value) {
                    return {
                        label : value,
                        value : value
                    };
                });
                inlineParam = (
                    <Select
                        value    = {this.props.value}
                        key      = {this.props.key}
                        options  = {enumValues}
                        onChange = {this.props.onChange}
                    />
                );
                break;
            case 'boolean':
                inlineParam = (
                    <Select
                        value    = {this.props.value}
                        key      = {this.props.key}
                        options  = {[{value: false, label: 'false'}, {value: true, label: 'true'}]}
                        onChange = {this.props.onChange}
                    />
                );
                break;
            case 'string':
            case 'number':
            case 'integer':
            case 'float':
                inlineParam = (
                    <Text
                        key      = {this.props.key}
                        type     = {this.props.param.type}
                        onChange = {this.props.onChange}
                    />
                );
                break;
            case 'checkbox':
                inlineParam = (
                    <Checkbox
                        value    = {this.props.value}
                        key      = {this.props.key}
                        onChange = {this.props.onChange}
                    />
                );
                break;
            case 'stripe-token':
                inlineParam = (
                    <StripeToken
                        paramName = {this.props.param.name}
                        onChange  = {this.props.onChange}
                    />
                );
                break;
            case 'file':
                if (this.props.method === 'GET') {
                    rowParam = (<tr><td>{'INVALID CONFIGURATION - CANNOT USE `file` IN GET REQUEST'}</td></tr>);
                } else {
                    inlineParam = (
                        <FileParam
                            name = {this.props.param.name}
                            onChange = {this.props.onChange}
                        />
                    );
                }
                break;
            case 'text':
                inlineParam = <TextArea onChange = {this.props.onChange}/>;
                break;
        }

        if (this.props.simple === true) {
            return (
                <tbody>
                    <tr>
                        <td><code>{this.props.param.name}</code></td>
                        <td><code>{this.props.param.type}</code></td>
                        <td>{inlineParam}</td>
                    </tr>
                    {rowParam}
                </tbody>
            );
        }
        description = this.renderDescription(this.props.param);

        if (description) {
            description = (
                <tr>{description}</tr>
            );
        }

        return (
            <tbody className='paramrow'>
                <tr>
                    <td><code>{this.props.param.name}</code></td>
                    <td>{includeCheckboxComponent}</td>
                    <td>{nullCheckboxComponent}</td>
                    <td><code>{this.props.param.type}</code></td>
                    <td>{inlineParam}</td>
                </tr>
                {description}
                {rowParam}
            </tbody>
        );
    }

});
