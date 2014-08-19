/** @jsx React.DOM */
'use strict';

var _                     = require('underscore');
var React                 = require('react');
var NestedPropertyHandler = require('../../util/nested-property-handler');
var RenderParamsMixin     = require('./render-params-mixin');
var ParamTypeMixin        = require('../../util/param-type-mixin');
var Select                = require('./input/select');
var Text                  = require('./input/text');
var ResumableUpload       = require('./input/resumable-upload.jsx');
var NestedPropertyHandler = require('../../util/nested-property-handler');

module.exports = React.createClass({

    displayName : 'ParameterList',

    propTypes : {
        params       : React.PropTypes.array.isRequired,
        requestBody  : React.PropTypes.object,
        updateValues : React.PropTypes.func.isRequired
    },

    mixins : [
        RenderParamsMixin,
        ParamTypeMixin
    ],

    getChangeHandler : function(path)
    {
        var values    = this.props.requestBody,
            component = this;

        return function(value)
        {
            values = NestedPropertyHandler.set(values, path, value);

            component.props.updateValues(values);
        };
    },

    handleAddField : function(path, defaultValue)
    {
        var values = this.props.requestBody,
            array;

        array = NestedPropertyHandler.get(values, path) || [];

        array.push(defaultValue);

        values = NestedPropertyHandler.set(values, path, array);

        this.props.updateValues(values);
    },

    renderTopLevelParam : function(param)
    {
        return this.renderParam(param, []);
    },

    renderParam : function(param, path)
    {
        var renderedMarkup;

        // Record the "path" of this param in the request body object
        path = this.appendPath(path, param.name);

        renderedMarkup = (
            <tr key='param'>
                <td><code>{param.name}</code></td>
                <td>{this.renderParamInputOrInputs(param, path)}</td>
                <td>{this.renderInputTypeDescription(param.type)}</td>
                {this.renderDescriptionColumn(param)}
            </tr>
        );

        if (param.type === 'hash' || param.type === 'array[hash]') {
            renderedMarkup = this.appendHashMarkupToParamMarkup(renderedMarkup, param, path);
        }

        return (
            <tbody key={param.name}>
                {renderedMarkup}
            </tbody>
        );
    },

    renderParamInputOrInputs : function(param, path)
    {
        if (param.type === 'hash') {
            return null;
        }

        if (this.isArray(param.type)) {
            return this.renderArrayParamInputs(this.getArrayType(param.type), param, path);
        }

        return this.renderParamInput(param.type, param, path, param.name);
    },

    appendHashMarkupToParamMarkup : function(renderedMarkup, param, path)
    {
        renderedMarkup = [renderedMarkup];

        if (param.type === 'hash') {
            renderedMarkup.push(
                this.renderHashParams(param.params, path)
            );
        }

        if (param.type === 'array[hash]') {
            renderedMarkup = renderedMarkup.concat(
                this.renderHashArrayParams(param.params, path)
            );
        }

        return renderedMarkup;
    },

    renderHashParams : function(params, path, showRemovalButton)
    {
        var component      = this,
            renderedParams = [],
            removalButton  = null,
            key;

        params.forEach(function(childParam) {
            renderedParams.push(
                component.renderParam(childParam, path)
            );
        });

        key = 'hashParams' + (_.last(path));

        if (showRemovalButton === true) {
            removalButton = this.renderRemoveArrayElementButton(path);
        }

        return (
            <tr key={key}>
                <td colSpan={4}>
                    <table>
                        {removalButton}
                        {renderedParams}
                    </table>
                </td>
            </tr>
        );
    },

    renderHashArrayParams : function(params, path)
    {
        var values         = NestedPropertyHandler.get(this.props.requestBody, path) || [],
            renderedHashes = [],
            component      = this,
            newPath;

        values.forEach(function(hash, index) {
            newPath = path.slice();
            newPath.push(index);

            renderedHashes.push(
                component.renderHashParams(params, newPath, true)
            );
        });

        return renderedHashes;
    },

    renderArrayParamInputs : function(type, param, path)
    {
        var component = this,
            values    = NestedPropertyHandler.get(this.props.requestBody, path) || [],
            inputs    = [],
            addHandler;

        addHandler = _.partial(this.handleAddField, path, param.defaultValue);

        inputs.push(
            <a className='button field-button--add' onClick={addHandler}>{'+ Add Field'}</a>
        );

        if (type === 'hash') {
            return inputs;
        }

        values.forEach(function(value, index) {
            var newPath = component.appendPath(path, index);

            inputs.push(
                component.renderRemoveArrayElementButton(newPath)
            );

            inputs.push(
                component.renderParamInput(type, param, newPath, param.name + index)
            );
        });

        return inputs;
    },

    renderParamInput : function(type, options, path, key)
    {
        var changeHandler = this.getChangeHandler(path),
            value         = NestedPropertyHandler.get(this.props.requestBody, path);

        if (type === 'enum') {
            if (! options.enumValues.length) {
                console.warn('Missing enumValues for param: ' + options.name);
            }

            return <Select value={value} key={key} options={options.enumValues} onChange={changeHandler} />;
        } else if (type === 'boolean') {
            return <Select value={value} key={key} options={['true', 'false']} onChange={changeHandler} />;
        } else if (type === 'resumable-upload') {
            return <ResumableUpload key={key} target={options.uri} resumableUploadCallback={options.resumableUploadCallback} />;
        } else if (type === 'hash') {
            return null;
        } else {
            return <Text key={key} value={value} onChange={changeHandler} />;
        }
    },

    renderRemoveArrayElementButton : function(path)
    {
        var component = this,
            callback;

        callback = function() {
            var values = component.props.requestBody;

            values = NestedPropertyHandler.remove(values, path);

            component.props.updateValues(values);
        };

        return (
            <a className='button field-button--remove' onClick={callback}>
                –
            </a>
        );
    },

    render : function()
    {
        if (this.props.params.length === 0) {
            return <div />;
        }

        return (
            <table>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
                 {this.props.params.map(this.renderTopLevelParam)}
            </table>
        );
    }
});
