/** @jsx React.DOM */
'use strict';

var React = require('react');
var util  = require('util');

module.exports = React.createClass({
    render : function()
    {
        return (
            <div>
                <h3>Request URI</h3>
                <code>{this.props.request.uri}</code>
                <h3>Request Headers</h3>
                <code>{util.inspect(this.props.request.headers)}</code>
                <h3>Response Status</h3>
                <code>{this.props.response.status}</code>
                <h3>Response Headers</h3>
                <code>{util.inspect(this.props.response.headers)}</code>
                <h3>Response Body</h3>
                <code>{util.inspect(this.props.response.data)}</code>
            </div>
        );
    }
});
