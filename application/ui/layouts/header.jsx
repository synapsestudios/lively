/** @jsx React.DOM */
'use strict';

var React             = require('react');
var cx                = require('react/lib/cx');
var OAuthConnectPanel = require('../components/oauth');

module.exports = React.createClass({

    displayName : 'SiteHeader',

    getStateFromStores : function()
    {
        return {
            hasOAuth : (this.props.stores.oauth.accessToken !== null),
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
        var hidden = this.props.hidden;

        var oAuthLinkClasses = cx({
            'header__auth'      : true,
            'fa'                : true,
            'fa-lock'           : this.state.hasOAuth,
            'fa-unlock-alt'     : ! this.state.hasOAuth
        });

        return (
            <div>
                <header className="header">
                    <span className="header__branding">LIVELY</span>
                    <span className={oAuthLinkClasses} onClick={this.toggleOAuthPanel}>{'OAuth2'}</span>
                </header>
                <OAuthConnectPanel oAuthPanelHidden={this.oAuthPanelHidden}/>
            </div>
        );
    }
});
