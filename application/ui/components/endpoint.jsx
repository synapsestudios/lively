/* global window */
'use strict';

var _               = require('underscore');
var React           = require('react');
var cx              = require('react/lib/cx');
var FluxMixin       = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;
var Params          = require('./params');
var ApiCallInfo     = require('./api-call-info');
var Checkbox        = require('./input/checkbox');
var Resumable       = require('../../../bower_components/resumablejs/resumable');
var ParamHelper     = require('../../util/param-helper');
var UriHelperMixin  = require('../../util/uri-helper');
var Button          = require('./button');

module.exports = React.createClass({

    displayName : 'Endpoint',

    mixins : [FluxMixin, new StoreWatchMixin('RequestStore'), UriHelperMixin],

    propTypes : {
        name      : React.PropTypes.string.isRequired,
        synopsis  : React.PropTypes.string,
        method    : React.PropTypes.oneOf(['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH']),
        bodyType  : React.PropTypes.string,
        rootParam : React.PropTypes.string,
        uri       : React.PropTypes.string.isRequired,
        oauth     : React.PropTypes.bool,
        params    : React.PropTypes.array
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
            endpointPanelHidden : true
        };
    },

    getStateFromFlux : function()
    {
        var requestStoreState, newState, responseChanged, endpointData;

        newState = _.extend({}, this.state);

        requestStoreState = this.getFlux().store('RequestStore').getState();

        newState.namespace = requestStoreState.namespace;

        endpointData = requestStoreState.endpoint[this.props.name];

        if (! endpointData) {
            return newState;
        }

        newState = {
            loading           : endpointData.loading,
            loaded            : endpointData.loaded,
            values            : endpointData.values,
            response          : endpointData.response,
            responseTimestamp : endpointData.responseTimestamp,
            requestTimestamp  : endpointData.requestTimestamp,
            requestInfo       : requestStoreState.requestInfo,
            namespace         : requestStoreState.namespace
        };

        responseChanged = (this.state && this.state.responseTimestamp !== endpointData.responseTimestamp);

        if (responseChanged) {
            this.scrollToOutput();
        }

        return newState;
    },

    /**
     * Uses a callback set in props to ask the parent component to toggle between expanded and collapsed
     */
    toggleEndpointPanel : function()
    {
        this.props.toggleEndpointPanel();
        if (this.props.endpointPanelHidden) {
            var endpointPanel    = this.refs.endpointPanel.getDOMNode();
            var endpointPanelTop = endpointPanel.getBoundingClientRect().top;
            var scrollLocation = window.scrollY + endpointPanelTop;

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
        var values      = this.state.values,
            method      = this.props.method,
            uri         = this.props.uri,
            bodyType    = this.props.bodyType,
            rootParam   = this.props.rootParam,
            accessToken = this.getFlux().store('OAuthStore').getState().accessToken;

        var headerParams = {},
            bodyParams   = {},
            queryParams  = {};

        var buttonNode = this.refs.tryItButton.getDOMNode();

        if (this.refs.sendToken.getValue() === true && ! accessToken) {
            this.setState({
                error : 'No access token provided.'
            });
            window.scrollTo(0, window.scrollY + buttonNode.getBoundingClientRect().bottom);
            return;
        }

        _.each(this.props.params, _.bind(function(param)
        {
            var name, value;

            name = param.name;

            // Skip excluded fields
            if (typeof values[name] === 'undefined') {
                return;
            }

            value = (values && _(values).has(name)) ?
                values[name] :
                ParamHelper.getDefaultValueForParam(param);

            if (_(value).isNaN()) {
                value = null;
            }

            if (this.isParameterNameInUri(name, uri)) {
                uri = this.injectValueIntoUri(name, uri, value);
                return;
            }

            var paramData = _.findWhere(this.props.params, { name : name });
            bodyType  = this.props.bodyType;

            if (paramData.type === 'file') {
                bodyParams = value;
            } else if (paramData.location === 'header') {
                headerParams[name] = value;
            } else if (paramData.location === 'query' || method === 'GET') {
                queryParams[name] = value;
            } else {
                if (_(this.state.nullFields).contains(name)) {
                    bodyParams[name] = null;
                } else {
                    bodyParams[name] = value;
                }
            }

        }, this));

        if (this.refs.sendToken.getValue() === true) {
            this.getFlux().actions.request.oauthRequest(
                this.state.namespace,
                this.props.name,
                accessToken,
                method,
                uri,
                queryParams,
                bodyParams,
                headerParams,
                bodyType,
                rootParam
            );
        } else {
            this.getFlux().actions.request.request(
                this.state.namespace,
                this.props.name,
                method,
                uri,
                queryParams,
                bodyParams,
                headerParams,
                bodyType,
                rootParam
            );
        }

        this.setState({
            error : null
        });
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
            component.setState({
                request : {
                    headers : this.opts.headers,
                    uri     : this.opts.target
                },
                response : {
                    status  : this.statusCode || '200',
                    headers : {},
                    data    : _.last(file.chunks).message()
                }
            });

            component.scrollToOutput();
        });

        resumable.on('error', function(message, file) {
            this.setState({
                request : {
                    headers : this.opts.headers,
                    uri     : this.opts.target
                },
                response : {
                    status  : this.statusCode || '???',
                    headers : {},
                    data    : message || 'Unknown Error'
                }
            });

            component.scrollToOutput();
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

        if (hasUpload) {
            return null;
        }

        return (
            <Button
                ref      = 'tryItButton'
                onClick  = {this.onSubmit}
                disabled = {!! this.state.loading} >
                {this.state.loading ? 'Loading...' : 'Try it'}
            </Button>
        );
    },

    getErrorMessage: function()
    {
        if (!! this.state.error) {
            return <div>{this.state.error}</div>;
        }
    },

    changeHandler : function(value)
    {
        this.setState({values: value});
    },

    render : function()
    {
        var apiCallInfo, latency, responseTime, requestTime;

        if (this.state.loaded)
        {
            responseTime = parseInt(this.state.responseTimestamp, 10);
            requestTime  = parseInt(this.state.requestTimestamp, 10);

            latency = this.state.responseTimestamp > 0 ? responseTime - requestTime : 0;

            apiCallInfo = (
                <ApiCallInfo status   = {this.state.status}
                             request  = {this.state.requestInfo}
                             response = {this.state.response}
                             latency  = {latency}
                />
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

        var endpointPanelClasses = cx({
            'endpoint-panel'          : true,
            'endpoint-panel--hidden'  : this.props.endpointPanelHidden
        });

        var naviconButtonClasses = cx({
            'navicon-button' : true,
            'open'           : ! this.props.endpointPanelHidden
        });

        return (
            <div className='panel-section' ref='endpointPanel'>
                <div className={panelHeaderClasses} onClick={this.toggleEndpointPanel}>
                    <h2>
                        <span>{this.props.method}</span>
                        <span>{this.props.name}</span>
                        <span>{this.props.uri}</span>
                    </h2>
                    <span className={naviconButtonClasses}>
                        <div className='navicon'></div>
                    </span>
                </div>
                <div className={endpointPanelClasses}>
                    <div className='panel__synopsis' dangerouslySetInnerHTML={{__html: this.props.synopsis}} />
                    <Params
                        endpointName            = {this.props.name}
                        params                  = {this.props.params}
                        resumableUploadCallback = {this.initResumableUpload}
                        ref                     = 'params'
                        requestMethod           = {this.props.method}
                        uri                     = {this.props.uri}
                        onChange                = {this.changeHandler}
                    />
                    <div className='panel__container switch__container'>
                        <p className='checkbox-label'>Include OAuth Token?</p>
                        <Checkbox defaultChecked={this.props.oauth} ref='sendToken' name={this.props.name}/>
                    </div>
                    <div className='panel__container'>
                        {this.getTryItButton()}
                    </div>
                    {this.getErrorMessage()}
                    {apiCallInfo}
                </div>
            </div>
        );
    }
});
