/** @jsx React.DOM */
'use strict';

var _     = require('underscore');
var React = require('react');
var cx    = require('react/lib/cx');

module.exports = React.createClass({

    displayName : 'ApiCallInfo',

    propTypes : {
        status    : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        request   : React.PropTypes.object,
        response  : React.PropTypes.object,
        formatter : React.PropTypes.func
    },

    getDefaultProps : function()
    {
        return {
            formatter : _.partial(JSON.stringify, _, null, 4)
        };
    },

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

        var responseSuccess = null;
        if (this.props.response && this.props.response.status) {
            responseSuccess = this.props.response.status >= 200 && this.props.response.status < 400;
        }

        var successClasses = cx({
            'data__code'          : true,
            'data__code--success' : responseSuccess === true,
            'data__code--failure' : responseSuccess === false
        });

        // @todo show loading indicator while loading
        var responseData = '';
        if (this.props.status === 'loaded' && this.props.response) {
            responseData = (
                <div className="data__container">
                    <h3 className="data__header">Response Status</h3>
                    <code className={successClasses}>{this.props.response.status}</code>
                    <h3 className="data__header">Response Headers</h3>
                    <pre><code className={successClasses}>{this.props.response.headers}</code></pre>
                    <h3 className="data__header">Response Body</h3>
                    <pre><code className={successClasses}>{this.props.formatter(this.props.response.data)}</code></pre>
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
