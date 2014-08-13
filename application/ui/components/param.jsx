/** @jsx React.DOM */
/* global console */
'use strict';

var React           = require('react');
var _               = require('underscore');
var AbstractParam   = require('./abstract-param');
var Select          = require('./input/select');
var Text            = require('./input/text');
var ResumableUpload = require('./input/resumable-upload.jsx');

module.exports = React.createClass(_.extend(AbstractParam, {

    displayName : 'Parameter',

    getInput : function()
    {
        var type = this.getParamType();

        if (type === 'enum') {
            if (! this.props.enumValues.length) {
                console.warn('Missing enumValues for param: ' + this.props.name);
            }

            return <Select options={this.props.enumValues} ref='input' />;
        } else if (type === 'boolean') {
            return <Select defaultValue={this.props.defaultValue} options={['true', 'false']} ref='input' />;
        } else if (this.props.type === 'resumable-upload') {
            return <ResumableUpload target={this.props.uri} resumableUploadCallback={this.props.resumableUploadCallback} ref='input'/>;
        } else {
            return <Text defaultValue={this.props.defaultValue} ref='input' />;
        }
    }
}));
