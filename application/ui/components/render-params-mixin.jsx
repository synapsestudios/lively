/** @jsx React.DOM */
'use strict';

var _                     = require('underscore');
var React                 = require('react');
var marked                = require('marked');
var Select                = require('./input/select');
var Text                  = require('./input/text');
var ResumableUpload       = require('./input/resumable-upload.jsx');
var NestedPropertyHandler = require('../../util/nested-property-handler');

module.exports = {
    renderParam : function(param, path)
    {
        var isArray,
            isHash,
            type,
            description,
            inputOrInputs,
            renderedMarkup;

        if (! _.isArray(path)) {
            path = [param.name];
        } else {
            path = this.appendPath(path, param.name);
        }

        isArray = this.isArray(param.type);
        isHash  = this.isHash(param.type);

        type = isArray ? this.getArrayType(param.type) : param.type;

        marked.setOptions({ sanitize: true });
        description = (param.required ? '**Required**. ' : '') + param.description;

        if (isArray) {
            inputOrInputs = this.renderArrayParamInputs(type, param, path);
        } else if (isHash) {
            inputOrInputs = null;
        } else {
            inputOrInputs = this.renderParamInput(param.type, param, path, param.name);
        }

        renderedMarkup = (
            <tr key='param'>
                <td><code>{param.name}</code></td>
                <td>{inputOrInputs}</td>
                <td>
                    {isArray ? 'Array of ' : null}
                    <code>{type}</code>
                    {isArray ? 's' : null}
                </td>
                <td dangerouslySetInnerHTML={{__html: marked(description)}}></td>
            </tr>
        );

        if (isHash || param.type === 'array[hash]') {
            renderedMarkup = [renderedMarkup];

            if (isHash) {
                renderedMarkup.push(
                    this.renderHashParams(param.params, path)
                );
            } else {
                renderedMarkup = renderedMarkup.concat(
                    this.renderHashArrayParams(param.params, path)
                );
            }
        }

        return (
            <tbody key={param.name}>
                {renderedMarkup}
            </tbody>
        );
    },

    renderHashParams : function(params, path)
    {
        var component      = this,
            renderedParams = [],
            key;

        params.forEach(function(childParam) {
            renderedParams.push(
                component.renderParam(childParam, path)
            );
        });

        key = 'hashParams' + (_.last(path));

        return (
            <tr key={key}>
                <td colSpan={4}>
                    <table>
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
                component.renderHashParams(params, newPath)
            );
        });

        return renderedHashes;
    },

    getArrayType : function(type)
    {
        var matches = type.match(/\[(.*?)\]/);

        if (matches === null) {
            return 'string';
        } else {
            return matches[0].substring(
                1,
                matches[0].length - 1
            );
        }
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
                component.renderParamInput(type, param, newPath, param.name + index)
            );
        });

        return inputs;
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

    appendPath : function(path, newPath)
    {
        var result = path.slice();

        result.push(newPath);

        return result;
    }
};
