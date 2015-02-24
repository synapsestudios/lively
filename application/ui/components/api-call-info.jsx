'use strict';

var _             = require('underscore');
var React         = require('react');
var cx            = require('react/lib/cx');
var marked        = require('marked');
var renderer      = new marked.Renderer();
var highlightText = require('../../util/highlight-text');

renderer.paragraph = function(text) {
    return text;
};

module.exports = React.createClass({

    displayName : 'ApiCallInfo',

    propTypes : {
        request   : React.PropTypes.object,
        response  : React.PropTypes.object,
        latency   : React.PropTypes.number.isRequired
    },

    formatHeadersFromObject : function(headersObject)
    {
        return _.map(headersObject, function(value, key) {
            return key + ': ' + value;
        }).join('\n');
    },

    formatResponse : function(text)
    {
        try {
            return JSON.stringify(text, null, 4);
        } catch (e) {
            return text;
        }
    },

    /**
     * Highlight the response body for easy copying
     */
    highlightBody : function()
    {
        highlightText(this.refs.responseBody.getDOMNode());
    },

    render : function()
    {
        var requestBody;

        if (this.props.request.body) {
            requestBody = <code className='data__code'>{JSON.stringify(this.props.request.body, null, 4)}</code>;
        } else {
            requestBody = <code className='data__code' dangerouslySetInnerHTML={{__html: marked('*empty*', {renderer: renderer})}}></code>;
        }

        var requestData = (
            <div className='data__container'>
                <h3 className='data__header'>Request URI</h3>
                <code className='data__code'>{this.props.request.uri}</code>

                <h3 className='data__header'>Request Headers</h3>
                <pre><code className='data__code'>{this.formatHeadersFromObject(this.props.request.headers)}</code></pre>

                <h3 className='data__header'>Request Body</h3>
                <pre>{requestBody}</pre>
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

        var responseData;

        if (this.props.response) {
            responseData = (
                <div className='data__container'>
                    <h3 className='data__header'>Response Time</h3>
                    <code className={successClasses}>{this.props.latency}ms</code>

                    <h3 className='data__header'>Response Status</h3>
                    <code className={successClasses}>{this.props.response.status}</code>

                    <h3 className='data__header'>Response Headers</h3>
                    <pre><code className={successClasses}>{this.props.response.headers}</code></pre>

                    <h3 className='data__header'>
                        {'Response Body '}
                        <a onClick={this.highlightBody}>
                            <span className={'fa fa-clipboard'} />
                        </a>
                    </h3>
                    <pre>
                        <code className={successClasses} ref={'responseBody'}>
                            {this.formatResponse(this.props.response.data)}
                        </code>
                    </pre>
                </div>
            );
        }
        return (
            <div className='data__wrapper'>
                {requestData}
                {responseData}
            </div>
        );
    }
});
