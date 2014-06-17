/** @jsx React.DOM */
/* global console */
'use strict';

var React         = require('react');
var _             = require('underscore');
var AbstractParam = require('./abstract-param');
var Select        = require('./input/select');
var Text          = require('./input/text');

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
            return <Select options={['true', 'false']} ref='input' />;
        } else {
            return <Text defaultValue={this.props.defaultValue} ref='input' />;
        }
    }
}));
