/** @jsx React.DOM */
'use strict';

var React             = require('react');
var cx                = require('react/lib/cx');
var OAuthConnectPanel = require('../components/oauth');

module.exports = React.createClass({

    displayName : 'SiteHeader',

    getInitialState : function()
    {
        return {
            hidden : true
        };
    },

    toggleOAuthPanel : function()
    {
        this.setState({
            oAuthPanelHidden : ! this.state.oAuthPanelHidden
        });
    },

    render : function()
    {
        var stores = this.props.stores;
        var handleOAuthStart = this.props.handleOAuthStart;

        var oAuthPanelClasses = cx({
            'panel'         : true,
            'panel--hidden' : this.state.hidden
        });

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
                <OAuthConnectPanel stores={this.props.stores} oAuthPanelHidden={this.oAuthPanelHidden} onOAuthStart={this.handleOAuthStart} />
            </div>
        );
    }
});
