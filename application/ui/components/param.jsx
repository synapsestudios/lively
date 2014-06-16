/** @jsx React.DOM */
/* global console */
'use strict';

var React           = require('react');
var Select          = require('./input/select');
var Text            = require('./input/text');
var ResumableUpload = require('./input/resumable-upload.jsx');
var marked          = require('marked');

module.exports = React.createClass({

    displayName : 'Parameter',

    propTypes : {
        name         : React.PropTypes.string.isRequired,
        required     : React.PropTypes.bool,
        type         : React.PropTypes.string.isRequired,
        description  : React.PropTypes.string,
        enumValues   : React.PropTypes.array,
        location     : React.PropTypes.oneOf([
            'header', 'query', 'body', 'uri'
        ]),
        defaultValue : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ])
    },

    getValue : function()
    {
        var value, type;

        type = this.props.type;

        if (this.props.type === 'resumable-upload') {
            return null;
        }

        value = this.refs.input.getValue();

        if (type === 'int' || type === 'integer') {
            return parseInt(value, 10);
        } else if (type === 'bool' || type === 'boolean') {
            return (value === 'true');
        } else if (type === 'float') {
            return parseFloat(value);
        } else {
            return value;
        }
    },

    getDefaultProps : function()
    {
        return {
            required      : false,
            description   : '',
            allowedValues : [],
            enumValues    : [],
            location      : 'body'
        };
    },

    getInput : function()
    {
        if (this.props.type === 'enum') {
            if (! this.props.enumValues.length) {
                console.warn('Missing enumValues for param: ' + this.props.name);
            }

            return <Select options={this.props.enumValues} ref='input' />;
        } else if (this.props.type === 'boolean' || this.props.type === 'bool') {
            return <Select options={['true', 'false']} ref='input' />;
        } else if (this.props.type === 'resumable-upload') {
            return <ResumableUpload target={this.props.uri} resumableUploadCallback={this.props.resumableUploadCallback}/>;
        } else {
            return <Text defaultValue={this.props.defaultValue} ref='input' />;
        }
    },

    render : function()
    {
        marked.setOptions({ sanitize: true });
        var description = (this.props.required ? '**Required**. ' : '') + this.props.description;

        return (
            <tr>
                <td><code>{this.props.name}</code></td>
                <td>{this.getInput()}</td>
                <td><code>{this.props.type}</code></td>
                <td dangerouslySetInnerHTML={{__html: marked(description)}}></td>
            </tr>
        );
    }
});
