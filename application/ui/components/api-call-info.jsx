/** @jsx React.DOM */
'use strict';

var _     = require('underscore');
var React = require('react');

module.exports = React.createClass({
    formatHeadersFromObject : function(headersObject)
    {
        return _.map(headersObject, function(value, key) {
            return key + ': ' + value;
        }).join("\n");
    },

    render : function()
    {
        var requestData = (
            <div className="data__container">
                <h3 className="data__header">Request URI</h3>
                <code className="data__code">{this.props.request.uri}</code>
                <h3 className="data__header">Request Headers</h3>
                <pre><code className="data__code">{this.formatHeadersFromObject(this.props.request.headers)}</code></pre>
                <h3 className="data__header">Request Body</h3>
                <pre><code className="data__code">{JSON.stringify(this.props.request.body, null, 4)}</code></pre>
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
                    <pre><code className="data__code data__code--failure">{this.props.response.headers}</code></pre>
                    <h3 className="data__header">Response Body</h3>
                    <pre><code className="data__code data__code--success">{JSON.stringify(this.props.response.data, null, 4)}</code></pre>
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
