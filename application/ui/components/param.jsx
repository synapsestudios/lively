/** @jsx React.DOM */
/* global console */
'use strict';

var React       = require('react');
var _           = require('underscore');
var ParamObject = require('./param-object');
var Select      = require('./input/select');
var Text        = require('./input/text');

module.exports = React.createClass(_.extend(ParamObject, {


    getInput : function()
    {
        var type = this.getParamType();

        if (type === 'enum') {
            if (! this.props.enumValues.length) {
                console.warn('Missing enumValues for param: ' + this.props.name);
            }

            return <Select value={this.props.defaultValue} options={this.props.enumValues} ref='input' />;
        } else if (type === 'boolean') {
            return <Select value={this.props.defaultValue} options={['true', 'false']} ref='input' />;
        } else {
            return <Text value={this.props.defaultValue} ref='input' />;
        }
    }
}));
