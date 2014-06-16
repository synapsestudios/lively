/** @jsx React.DOM */
'use strict';

var React      = require('react');
var cx         = require('react/lib/cx');
var TextInput  = require('./input/text');
var StoreWatch = require('synapse-common/ui/mixins/store-watch');
var Events     = require('synapse-common/ui/mixins/events');
var util       = require('util');

module.exports = React.createClass({

    displayName : 'OAuthPanel',
    mixins : [ StoreWatch, Events ],
    propTypes : {
        onOAuthStart : React.PropTypes.func.isRequired
    },

    componentWillMount : function()
    {
        this.subscribe('toggleOauthPanel', function() {
            this.setState({
                oAuthPanelHidden : ! this.state.oAuthPanelHidden
            });
        }.bind(this));
    },

    handleClick : function()
    {
        this.props.onOAuthStart({
            clientId     : this.refs.clientId.getValue(),
            clientSecret : this.refs.clientSecret.getValue(),
            scope        : this.refs.scope.getValue()
        });
    },

    getStateFromStores : function()
    {
        return {
            hasOAuth         : (this.props.stores.oauth.accessToken !== null),
            oauthData        : (this.props.stores.oauth),
            oAuthPanelHidden : true
        };
    },

    getInitialState : function()
    {
        return this.getStateFromStores();
    },

    toggleOAuthPanel : function()
    {
        this.setState({
            oAuthPanelHidden : ! this.state.oAuthPanelHidden
        });
    },

    render : function()
    {
        var oAuthPanelClasses = cx({
            'panel'         : true,
            'oauth__panel'  : true,
            'panel--hidden' : this.state.oAuthPanelHidden,
        });

        var overlayClasses = cx({
            'overlay-pattern'         : true,
            'overlay-pattern--hidden' : this.state.oAuthPanelHidden
        });

        return (
            <div>
                <div className={oAuthPanelClasses}>
                    <div className='panel__header'>
                        <h2>OAuth2</h2><a className="panel__header-x" onClick={this.toggleOAuthPanel}></a>
                    </div>
                    <div className="small-4 columns">
                        <label className="panel-form__label" htmlFor='clientId'>Client ID</label>
                        <TextInput className="form__input panel-form__input" name='clientId' ref='clientId' />
                    </div>
                    <div className="small-4 columns">
                        <label className="panel-form__label" htmlFor='clientSecret'>Client Secret</label>
                        <TextInput className="form__input panel-form__input" name='clientSecret' ref='clientSecret' />
                    </div>
                    <div className="small-4 columns">
                        <label className="panel-form__label" htmlFor='scope'>Scope</label>
                        <TextInput className="form__input panel-form__input" name='scope' ref='scope' />
                    </div>
                    <div className="small-12 columns">
                        <a className="button right" onClick={this.handleClick}>Connect</a>
                    </div>
                    <hr />
                    <div className="small-6 columns">
                        <pre>Access token: {this.state.oauthData.accessToken}</pre>
                    </div>
                    <div className="small-6 columns">
                        <pre>Token data: {util.inspect(this.state.oauthData.rawData)}</pre>
                    </div>
                </div>
                <div className={overlayClasses} />
            </div>
        );
    }
});
