/** @jsx React.DOM */
/* jshint global console */
'use strict';

var _               = require('underscore');
var React           = require('react');
var ObjectParam;

module.exports = React.createClass({
    displayName : 'ChildObjectParameter',
    componentWillMount: function() {
        ObjectParam = require('./object');
    },
    render : function()
    {
        return (
            <table>
                <ObjectParam value={this.props.value} index={this.props.index} changeHandler={this.props.onChange}/>
            </table>
        );
    }
});
