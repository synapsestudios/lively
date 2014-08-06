/** @jsx React.DOM */
'use strict';

var _           = require('underscore');
var React       = require('react');
var cx          = require('react/lib/cx');
var marked      = require('marked');
var Params      = require('./params-list');
var ApiCallInfo = require('./api-call-info');
var Checkbox    = require('./input/checkbox');
var Resumable   = require('../../../bower_components/resumablejs/resumable');

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
            status            : false,
            error             : false,
            request           : null,
            response          : null,
            methodPanelHidden : true
        };
    },

    toggleMethodPanel : function()
    {
        this.setState({
            methodPanelHidden : ! this.state.methodPanelHidden
        });
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

        this.clearResponse();

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

    clearResponse : function()
    {
        this.setState({
            status            : false,
            error             : false,
            request           : null,
            response          : null
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
            component.state.request = {
                headers : this.opts.headers,
                uri     : this.opts.target
            };

            component.apiCallback(null, {
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

            component.apiCallback(null, {
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

    renderTryItButton: function()
    {
        var hasUpload = false;

        _.each(this.props.params, function(value) {
            if (value.type === 'resumable-upload') {
                hasUpload = true;
            }
        });

        return hasUpload ? null : <a className='button' onClick={this.onSubmit}>Try it</a>;
    },

    render : function()
    {
        var apiCallInfo;

        if (this.state.status === LOADED || this.state.status === LOADING)
        {
            apiCallInfo = <ApiCallInfo
                status    = {this.state.status}
                request   = {this.state.request}
                response  = {this.state.response}
                clear     = {this.clearResponse}
            />;
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
            'method-panel'         : true,
            'method-panel--hidden' : this.state.methodPanelHidden
        });

        var naviconButtonClasses = cx({
            'navicon-button' : true,
            'open'           : ! this.state.methodPanelHidden
        });

        return (
            <div className='panel-section'>
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
                    <div className='panel__synopsis' dangerouslySetInnerHTML={{__html: marked(this.props.synopsis)}} />
                    <Params params={this.props.params} resumableUploadCallback={this.initResumableUpload} ref='params' />
                    <div className='switch__container'>
                        <p className='checkbox-label'>Include OAuth Token?</p>
                        <Checkbox defaultChecked={this.props.oauth} ref='sendToken' name={this.props.name}/>
                    </div>
                    {this.renderTryItButton()}
                    {apiCallInfo}
                </div>
            </div>
        );

    }
});
