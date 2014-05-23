/** @jsx React.DOM */
'use strict';

var _           = require('underscore');
var React       = require('react');
var Params      = require('./params-list');
var ApiCallInfo = require('./api-call-info');
var Checkbox    = require('./input/checkbox');

var LOADED  = 'loaded',
    LOADING = 'loading';

module.exports = React.createClass({

    displayName : 'Method',

    propTypes : {
        name     : React.PropTypes.string.isRequired,
        synopsis : React.PropTypes.string,
        method   : React.PropTypes.oneOf(['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH']),
        uri      : React.PropTypes.string.isRequired,
        oauth    : React.PropTypes.bool,
        params   : React.PropTypes.array
    },

    getDefaultProps : function()
    {
        return {
            synopsis : '',
            oauth    : true,
            params   : []
        };
    },

    getInitialState : function()
    {
        return {
            status   : false,
            error    : false,
            response : null
        };
    },

    apiCallback : function(err, resp)
    {
        this.setState({
            status   : LOADED,
            response : resp,
            error    : err
        });
    },

    onSubmit : function()
    {
        var params = this.refs.params.getValues(),
            uri = this.props.uri;

        _.each(params, function(value, name) {
            if (value !== '') {
                var regex = new RegExp(':' + name);

                if (!! regex.test(uri)) {
                    uri = uri.replace(regex, encodeURIComponent(value));
                    delete params[name];
                }
            } else {
                // Don't send empty params
                delete params[name];
            }
        });

        var requestInfo;
        if (this.refs.sendToken.getValue() === true) {
            requestInfo = this.props.oauthStore.oauthRequest(
                this.props.method,
                uri,
                params,
                _.bind(this.apiCallback, this)
            );
        } else {
            requestInfo = this.props.oauthStore.request(
                this.props.method,
                uri,
                params,
                _.bind(this.apiCallback, this)
            );
        }

        this.setState({
            status  : LOADING,
            request : requestInfo
        });
    },

    render : function()
    {
        var apiCallInfo = '';

        if (this.state.status === LOADED || this.state.status === LOADING)
        {
            apiCallInfo = (
                <ApiCallInfo status={this.state.status}
                             request={this.state.request}
                             response={this.state.response} />
            );
        }

        return (
            <div className='panel__wrapper'>
                <div className='panel'>
                    <div className='panel__header'>
                        <h2>{this.props.method} - {this.props.name}</h2>
                    </div>
                    {this.props.synopsis}
                    <Params params={this.props.params} ref='params' />
                    Include OAuth Token?<Checkbox defaultChecked={this.props.oauth} ref="sendToken" /><br />
                    <a onClick={this.onSubmit}>Try it</a>
                    {apiCallInfo}
                </div>
            </div>
        );
    }
});
