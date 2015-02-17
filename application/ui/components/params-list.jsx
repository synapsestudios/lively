/** @jsx React.DOM */
/* global console */
'use strict';

var _                     = require('underscore');
var React                 = require('react');
var FluxMixin             = require('fluxxor').FluxMixin(React);
var StoreWatchMixin       = require('fluxxor').StoreWatchMixin;
var NestedPropertyHandler = require('../../util/nested-property-handler');
var RenderParamsMixin     = require('./render-params-mixin');
var ParamHelper           = require('../../util/param-helper');
var Select                = require('./input/select');
var Text                  = require('./input/text');
var ResumableUpload       = require('./input/resumable-upload');
var NestedPropertyHandler = require('../../util/nested-property-handler');

module.exports = React.createClass({

    displayName : 'ParameterList',

    propTypes : {
        endpointName : React.PropTypes.string, // used to namespace request and excluded field list
        params       : React.PropTypes.array.isRequired
    },

    mixins : [
        RenderParamsMixin,
        FluxMixin,
        StoreWatchMixin('RequestStore')
    ],

    getStateFromFlux : function()
    {
        var requestState = this.getFlux().store('RequestStore').getState();

        return {
            requestValues  : (requestState.endpoint[this.props.endpointName] || {}).values,
            excludedFields : (requestState.endpoint[this.props.endpointName] || {}).excludedFields
        };
    },

    componentWillMount : function()
    {
        this.getFlux().actions.request.setRequestValues(
            this.props.endpointName,
            ParamHelper.getDefaultValuesForParams(this.props.params)
        );
    },

    getChangeHandler : function(path, type)
    {
        var values    = _.extend({}, this.state.requestValues),
            component = this;

        return function(value)
        {
            if (type === 'file') {
                value = value.currentTarget.files.item(0);
            }

            if (type === 'boolean') {
                value = (value === 'true');
            }

            if (type === 'integer') {
                value = parseInt(value, 10);
            }

            values = NestedPropertyHandler.set(values, path, value);

            component.getFlux().actions.request.setRequestValues(component.props.endpointName, values);
        };
    },

    handleAddField : function(path, param)
    {
        var values = _.extend({}, this.state.requestValues),
            array;

        array = NestedPropertyHandler.get(values, path) || [];

        array.push(
            ParamHelper.getDefaultValueForArrayParamElement(param)
        );

        values = NestedPropertyHandler.set(values, path, array);

        this.getFlux().actions.request.setRequestValues(this.props.endpointName, values);
    },

    renderTopLevelParam : function(param)
    {
        return this.renderParam(param, []);
    },

    includeChanged : function(event)
    {
        var path, requestActions;

        path = event.currentTarget.dataset.path;

        requestActions = this.getFlux().actions.request;

        if (event.currentTarget.checked) {
            requestActions.removeFromExcludedFields(this.props.endpointName, path);
        } else {
            requestActions.addToExcludedFields(this.props.endpointName, path);
        }
    },

    renderParam : function(param, path)
    {
        var renderedMarkup, checkboxComponent;

        // Record the "path" of this param in the request body object
        path = this.appendPath(path, param.name);

        if (path.length === 1) {
            checkboxComponent = (
                <td>
                    <input
                        type      = "checkbox"
                        name      = {'include-' + param.name}
                        data-path = {path[0]}
                        onChange  = {this.includeChanged}
                        checked   = {! _(this.state.excludedFields).contains(path[0])}
                    />
                </td>
            );
        } else {
            checkboxComponent = null;
        }

        renderedMarkup = (
            <tr key='param'>
                <td><code>{param.name}</code></td>
                {checkboxComponent}
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

        if (ParamHelper.isArrayParam(param.type)) {
            return this.renderArrayParamInputs(
                ParamHelper.getArrayType(param.type),
                param,
                path
            );
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
                    <table className='table__hash'>
                        {removalButton}
                        {renderedParams}
                    </table>
                </td>
            </tr>
        );
    },

    renderHashArrayParams : function(params, path)
    {
        var requestBodyCopy = _.extend({}, this.state.requestValues),
            values          = NestedPropertyHandler.get(requestBodyCopy, path) || [],
            renderedHashes  = [],
            component       = this,
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
        var component       = this,
            requestBodyCopy = _.extend({}, this.state.requestValues),
            values          = NestedPropertyHandler.get(requestBodyCopy, path) || [],
            inputs          = [],
            addHandler;

        addHandler = _.partial(this.handleAddField, path, param);

        inputs.push(
            <a className='button field-button--add' key='field-button-add' onClick={addHandler}>{'+ Add Field'}</a>
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
        var changeHandler   = this.getChangeHandler(path, type),
            requestBodyCopy = _.extend({}, this.state.requestValues),
            value           = NestedPropertyHandler.get(requestBodyCopy, path);

        if (type === 'enum') {
            if (! options.enumValues.length) {
                console.warn('Missing enumValues for param: ' + options.name);
            }

            return <Select value={value} key={key} options={options.enumValues} onChange={changeHandler} />;
        } else if (type === 'boolean') {
            return <Select value={value} key={key} options={['true', 'false']} onChange={changeHandler} />;
        } else if (type === 'resumable-upload') {
            return <ResumableUpload key={key} target={options.uri} resumableUploadCallback={options.resumableUploadCallback} />;
        } else if (type === 'file') {
            return <input type='file' key={key} onChange={changeHandler}/>;
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
            var values = _.extend({}, component.state.requestValues);

            values = NestedPropertyHandler.remove(values, path);

            component.getFlux().actions.request.setRequestValues(component.props.endpointName, values);
        };

        return (
            <a className='button field-button--remove' key='field-button-remove' onClick={callback}>
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
                    <th>Include</th>
                    <th>Value</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
                 {this.props.params.map(this.renderTopLevelParam)}
            </table>
        );
    }
});
