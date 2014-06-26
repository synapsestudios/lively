/** @jsx React.DOM */
'use strict';

var React      = require('react');
var StoreWatch = require('synapse-common/ui/mixins/store-watch');
var cx         = require('react/lib/cx');
var dispatcher = require('synapse-common/lib/dispatcher');
var Link       = require('react-nested-router').Link;

module.exports = React.createClass({

    displayName : 'SiteHeader',
    mixins      : [ StoreWatch ],

    getStateFromStores : function()
    {
        return {
            hasOAuth : (this.props.stores.oauth.accessToken !== null)
        };
    },

    getInitialState : function()
    {
        return this.getStateFromStores();
    },

    toggleOAuthPanel : function()
    {
        dispatcher.emit('toggleOauthPanel');
    },

    render : function()
    {
        var backButton,
            oAuthLinkClasses = cx({
            'header__auth'      : true,
            'fa'                : true,
            'fa-lock'           : this.state.hasOAuth,
            'fa-unlock-alt'     : ! this.state.hasOAuth
        });

        if (!this.props.showBackButton) {
            backButton = <Link to='api-list' className="header__api fa fa-angle-left">{this.props.name}</Link>;
        } else {
            backButton = this.props.name;
        }

        return (
            <div>
                <header className="header">
                    <span className="header__api">{backButton}</span>
                    <span className="header__branding">Lively</span>
                    <span className={oAuthLinkClasses} onClick={this.toggleOAuthPanel}>{'OAuth2'}</span>
                    <span className="header__api-branding">
                        <a className="api-branding fa fa-github" href={'/' + this.props.slug}></a>
                    </span>
                </header>
                {this.props.children}
            </div>
        );
    }
});
