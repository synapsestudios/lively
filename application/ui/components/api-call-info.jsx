/** @jsx React.DOM */
'use strict';

var React = require('react');
var util  = require('util');

module.exports = React.createClass({
    render : function()
    {
        var requestData = (
            <div className="data__container">
                <h3 className="data__header">Request URI</h3>
                <code className="data__code">{this.props.request.uri}</code>
                <h3 className="data__header">Request Headers</h3>
                <code className="data__code">{util.inspect(this.props.request.headers)}</code>
                <h3 className="data__header">Request Body</h3>
                <code className="data__code">{util.inspect(this.props.request.body)}</code>
            </div>
        );

        // @todo show loading indicator while loading
        var responseData = '';
        if (this.props.status === 'loaded' && this.props.response) {
            responseData = (
                <div className="data__container">
                    <h3 className="data__header">Response Status</h3>
                    <code className="data__code">{this.props.response.status}</code>
                    <h3 className="data__header">Response Headers</h3>
                    <code className="data__code data__code--failure">{util.inspect(this.props.response.headers)}</code>
                    <h3 className="data__header">Response Body</h3>
                    <code className="data__code data__code--success">{util.inspect(this.props.response.data)}</code>
                </div>
            );
        }
        return (
            <div className="data__wrapper">
                {requestData}
                {responseData}
            </div>
        );
    }
});
