/** @jsx React.DOM */
/* global window */
'use strict';

var _               = require('underscore');
var React           = require('react');
var cx              = require('react/lib/cx');
var FluxMixin       = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;
var Params          = require('./params-list');
var ApiCallInfo     = require('./api-call-info');
var Checkbox        = require('./input/checkbox');
var Resumable       = require('../../../bower_components/resumablejs/resumable');
var ParamHelper     = require('../../util/param-helper');

var LOADED  = 'loaded',
    LOADING = 'loading',
    ERROR   = 'error';

module.exports = React.createClass({

    displayName : 'Method',

    mixins : [FluxMixin, StoreWatchMixin('RequestStore')],

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
            requestBody       : ParamHelper.getDefaultValuesForParams(this.props.params),
            response          : null,
            methodPanelHidden : true
        };
    },

    getStateFromFlux : function()
    {
        var requestStoreState, isRequestForThisEndpoint;

        requestStoreState = this.getFlux().store('RequestStore').getState();

        isRequestForThisEndpoint = (
            requestStoreState.request && (
                requestStoreState.request.endpointId === this.getEndpointIdentifier(requestStoreState.namespace)
            )
        );

        // Don't update request and response data if the change is for a different endpoint
        if (! isRequestForThisEndpoint) {
            return _(requestStoreState).omit(['request', 'response']);
        }

        this.scrollToOutput();

        return _.extend(
            {
                status : requestStoreState.response ? LOADED : LOADING
            },
            requestStoreState
        );
    },

    getEndpointIdentifier : function(namespace)
    {
        // namespace is optional. Pass in if the state hasn't been saved yet.
        return (namespace || this.state.namespace) + this.props.name;
    },

    /**
     * Uses a callback set in props to ask the parent component to toggle between expanded and collapsed
     */
    toggleMethodPanel : function()
    {
        this.props.toggleMethodPanel();
        if (this.props.methodPanelHidden) {
            var methodPanel    = this.refs.methodPanel.getDOMNode();
            var methodPanelTop = methodPanel.getBoundingClientRect().top;
            var scrollLocation = window.scrollY + methodPanelTop;

            window.scrollTo(0, scrollLocation);
        }
    },

    scrollToOutput : function()
    {
        var buttonNode;

        if (this.isMounted()) {
            buttonNode = this.refs.tryItButton.getDOMNode();

            window.scrollTo(0, window.scrollY + buttonNode.getBoundingClientRect().bottom);
        }
    },

    onSubmit : function()
    {
        var params = this.state.requestBody,
            method = this.props.method,
            uri    = this.props.uri,
            accessToken = this.getFlux().store('OAuthStore').getState().accessToken;

        var headerParams = {},
            bodyParams   = {},
            queryParams  = {};

        var buttonNode = this.refs.tryItButton.getDOMNode();

        if (this.refs.sendToken.getValue() === true && ! accessToken) {
            this.setState({
                status : ERROR,
                error  : "No access token provided."
            });
            window.scrollTo(0, window.scrollY + buttonNode.getBoundingClientRect().bottom);
            return;
        }

        _.each(params, _.bind(function(value, name)
        {
            if (value === '' || _(value).isNaN() || value === null) {
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

        if (this.refs.sendToken.getValue() === true) {
            this.getFlux().actions.request.oauthRequest(
                this.state.namespace,
                this.getEndpointIdentifier(),
                accessToken,
                method,
                uri,
                queryParams,
                bodyParams,
                headerParams
            );
        } else {
            this.getFlux().actions.request.request(
                this.state.namespace,
                this.getEndpointIdentifier(),
                method,
                uri,
                queryParams,
                bodyParams,
                headerParams
            );
        }

        this.setState({status : LOADING});
    },

    initResumableUpload: function(buttonDOMNode)
    {
        var resumable, component = this;

        resumable = new Resumable();

        resumable.assignBrowse(buttonDOMNode);

        resumable.on('fileAdded', function(file) {
            // Add authorization header if oauth input checked
            if (component.refs.sendToken.getValue()) {
                var headers = this.opts.headers || {};
                headers.Authorization = component.props.oauthStore.getAuthorizationHeader();
                this.opts.headers = headers;
            }

            // Set URI, replacing placeholders with values from user input
            this.opts.target = 'http://' + component.props.oauthStore.hostname + component.getUri();

            this.upload();
        });

        resumable.on('fileSuccess', function(file, message) {
            component.state.request = {
                headers : this.opts.headers,
                uri     : this.opts.target
            };

            component.scrollToOutput(null, {
                status  : this.statusCode || '200',
                headers : {},
                data    : _.last(file.chunks).message()
            });
        });

        resumable.on('error', function(message, file) {
            component.state.request = {
                headers : this.opts.headers,
                uri     : this.opts.target
            };

            component.scrollToOutput(null, {
                status  : this.statusCode || '???',
                headers : {},
                data    : message || 'Unknown Error'
            });
        });
    },

    /**
     * Get the URI with placeholders replaced
     *
     * @return {String}
     */
    getUri : function()
    {
        var uri = this.props.uri;

        _.each(this.refs.params.getValues(), function(value, name)
        {
            uri = uri.replace(':' + name, encodeURIComponent(value));
        });

        return uri;
    },

    getTryItButton: function()
    {
        var hasUpload = false;

        _.each(this.props.params, function(value) {
            if (value.type === 'resumable-upload') {
                hasUpload = true;
            }
        });

        return hasUpload ? null : <a ref='tryItButton' className='button' onClick={this.onSubmit}>Try it</a>;
    },

    getErrorMessage: function()
    {
        if (this.state.status === ERROR) {
            return <div>{this.state.error}</div>;
        }
    },

    handleUpdatedRequestBody : function(newRequestBody)
    {
        this.setState({
            requestBody : newRequestBody
        });
    },

    render : function()
    {
        var apiCallInfo;

        if (this.state.status === LOADED)
        {
            apiCallInfo = (
                <ApiCallInfo status={this.state.status}
                             request={this.state.request}
                             response={this.state.response} />
            );
        }

        var panelHeaderClasses = cx({
            'panel__header'         : true,
            'panel__header--get'    : this.props.method === 'GET',
            'panel__header--head'   : this.props.method === 'HEAD',
            'panel__header--post'   : this.props.method === 'POST',
            'panel__header--patch'  : this.props.method === 'PATCH',
            'panel__header--put'    : this.props.method === 'PUT',
            'panel__header--delete' : this.props.method === 'DELETE'
        });

        var methodPanelClasses = cx({
            'method-panel'          : true,
            'method-panel--hidden'  : this.props.methodPanelHidden
        });

        var naviconButtonClasses = cx({
            'navicon-button' : true,
            'open'           : ! this.props.methodPanelHidden
        });

        return (
            <div className='panel-section' ref='methodPanel'>
                <div className={panelHeaderClasses} onClick={this.toggleMethodPanel}>
                    <h2>
                        <span>{this.props.method}</span>
                        <span>{this.props.name}</span>
                        <span>{this.props.uri}</span>
                    </h2>
                    <span className={naviconButtonClasses}>
                        <div className='navicon'></div>
                    </span>
                </div>
                <div className={methodPanelClasses}>
                    <div className='panel__synopsis' dangerouslySetInnerHTML={{__html: this.props.synopsis}} />
                    <Params
                        params                  = {this.props.params}
                        requestBody             = {this.state.requestBody}
                        resumableUploadCallback = {this.initResumableUpload}
                        updateValues            = {this.handleUpdatedRequestBody}
                        ref                     = 'params'
                    />
                    <div className='switch__container'>
                        <p className='checkbox-label'>Include OAuth Token?</p>
                        <Checkbox defaultChecked={this.props.oauth} ref='sendToken' name={this.props.name}/>
                    </div>
                    {this.getTryItButton()}
                    {this.getErrorMessage()}
                    {apiCallInfo}
                </div>
            </div>
        );

    }
});
