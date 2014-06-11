/** @jsx React.DOM */
'use strict';

var _           = require('underscore');
var React       = require('react');
var cx          = require('react/lib/cx');
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
            method = this.props.method,
            uri    = this.props.uri;

        var headerParams = {},
            bodyParams   = {},
            queryParams  = {};

        _.each(params, _.bind(function(value, name)
        {
            if (value === '') {
                // skip empty params
                return;
            }

            var regex = new RegExp(':' + name);

            // if the param is named in the query, then we will ignore the
            // stated location (if any)
            if (!! regex.test(uri)) {
                uri = uri.replace(regex, encodeURIComponent(value));
                return;
            }

            var paramData = _.findWhere(this.props.params, { name : name });

            if (paramData.location === 'header') {
                headerParams[name] = value;
            } else if (paramData.location === 'query' || method === 'GET') {
                queryParams[name] = value;
            } else {
                bodyParams[name] = value;
            }

        }, this));

        params = {
            header : headerParams,
            query  : queryParams,
            body   : bodyParams
        };

        var requestInfo;
        if (this.refs.sendToken.getValue() === true) {
            requestInfo = this.props.oauthStore.oauthRequest(
                method,
                uri,
                params,
                _.bind(this.apiCallback, this)
            );
        } else {
            requestInfo = this.props.oauthStore.request(
                method,
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

        var panelHeaderClasses = cx({
            'panel__header'          : true,
            'panel__header--get'     : this.props.method === 'GET',
            'panel__header--head'    : this.props.method === 'HEAD',
            'panel__header--post'    : this.props.method === 'POST',
            'panel__header--patch'   : this.props.method === 'PATCH',
            'panel__header--put'     : this.props.method === 'PUT',
            'panel__header--delete'  : this.props.method === 'DELETE'
        });

        return (
            <div className='panel-section'>
                <div className={panelHeaderClasses}>
                    <h2><span>{this.props.method}</span><span>{this.props.name}</span></h2>
                </div>
                <p>{this.props.synopsis}</p>
                <Params params={this.props.params} ref='params' />
                <div className="switch__container">
                    <p className="checkbox-label">Include OAuth Token?</p>
                    <Checkbox defaultChecked={this.props.oauth} ref="sendToken" name={this.props.name}/>
                </div>
                <a className="button" onClick={this.onSubmit}>Try it</a>
                {apiCallInfo}
            </div>
        );
    }
});
