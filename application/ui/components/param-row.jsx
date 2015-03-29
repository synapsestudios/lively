'use strict';

var _               = require('underscore');
var React           = require('react');
var marked          = require('marked');
var Text            = require('./param/text');
var Select          = require('./input/select');
var StripeToken     = require('./input/stripe-token');
var CustomObject    = require('./input/custom-object');
var ArrayObject     = require('./input/array');
var Params;

module.exports = React.createClass({
    displayName : 'Param',

    propTypes : {
        param     : React.PropTypes.object,
        onChange  : React.PropTypes.func,
        onInclude : React.PropTypes.func,
        onNull    : React.PropTypes.func
    },

    validateParamConfiguration : function(param)
    {
        var errors = [];

        switch (param.type) {
            case "enum":
                if (! param.enumValues.length) {
                    errors.push('Missing Enum Values');
                } else if (
                    typeof param.defaultValue !== 'undefined' &&
                    param.enumValues.indexOf(param.defaultValue) === -1
                ) {
                    errors.push('Default value for enum not in values list');
                }
                break;
        }

        if (errors.length > 0) {
            console.log(errors);
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
        var component = this;

        includeCheckboxComponent = (
            <input
                type      = "checkbox"
                name      = {'include-' + component.props.param.name}
                onChange  = {component.props.onInclude}
                checked   = {component.props.isIncluded}
            />
        );
        if (component.props.param.type !== 'file') {
            nullCheckboxComponent = (
                <input
                    type = "checkbox"
                    name = {'null-' + component.props.param.name}
                    onChange  = {component.props.onNull}
                    checked   = {component.props.isNull}
                />
            );
        } else {
            nullCheckboxComponent = ('N/A');
        }

        switch (component.props.param.type) {
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
                                key={component.props.key}
                                params={component.props.param.params}
                                onChange={component.props.onChange}
                            />
                        </td>
                    </tr>
                );
                break;
            case 'array':
                rowParam = (
                    <tr>
                        <td colSpan={5}>
                            <ArrayObject type='string' onChange={component.props.onChange} />
                        </td>
                    </tr>
                );
                break;
            case 'custom-object':
                rowParam = (
                    <tr>
                        <td colSpan={5}>
                            <CustomObject name='' onChange={component.props.onChange} />
                        </td>
                    </tr>
                );
                break;

            // inline params
            case 'enum':
                var enumValues = _.map(component.props.param.enumValues, function (value) {
                    return {
                        label : value,
                        value : value
                    };
                });
                inlineParam = (
                    <Select value={component.props.value} key={component.props.key} options={enumValues} onChange={component.props.onChange} />
                );
                break;
            case 'boolean':
                inlineParam = (
                    <Select value={component.props.value} key={component.props.key} options={[{value: false, label: 'false'}, {value: true, label: 'true'}]} onChange={component.props.onChange} />
                );
                break;
            case 'string':
            case 'number':
                inlineParam = (
                    <Text key={component.props.key} type={component.props.param.type} onChange={component.props.onChange} />
                );
                break;
            case 'stripe-token':
                inlineParam = (
                    <StripeToken paramName={component.props.param.name} onChange={component.props.onChange} />
                );
                break;
        }

        description = component.renderDescription(component.props.param);

        if (description) {
            description = (
                <tr>{description}</tr>
            );
        }

        return (
            <tbody>
                <tr>
                    <td><code>{component.props.param.name}</code></td>
                    <td>{includeCheckboxComponent}</td>
                    <td>{nullCheckboxComponent}</td>
                    <td><code>{component.props.param.type}</code></td>
                    <td>{inlineParam}</td>
                </tr>
                {description}
                {rowParam}
            </tbody>
        );
    }

});
