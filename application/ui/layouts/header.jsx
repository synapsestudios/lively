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
            apiLogo,
            oAuthLinkClasses = cx({
            'header__auth'  : true,
            'fa'            : true,
            'fa-lock'       : this.state.hasOAuth,
            'fa-unlock-alt' : ! this.state.hasOAuth
        });

        var apiSummaryClasses = cx({
            'header__api-summary'            : true,
            'header__api-summary--no-margin' : this.props.showBackButton
        });

        if (this.props.showBackButton) {
            backButton = <Link to='api-list' className='header__back-button'>&#xf104;</Link>;
        }

        if (this.props.logo) {
            apiLogo = (
                <Link to='api' apiSlug={this.props.slug} className='header__api-link'>
                    <img src={this.props.logo} alt={this.props.name} />
                </Link>
            );
        }

        return (
            <div>
                <header className='header'>
                    {backButton}
                    <Link to='api' apiSlug={this.props.slug} className={apiSummaryClasses}>{this.props.name}</Link>
                    <span className='header__branding'>{'Lively'}</span>
                    <span className={oAuthLinkClasses} onClick={this.toggleOAuthPanel}>{'OAuth2'}</span>
                    {apiLogo}
                </header>
                {this.props.children}
            </div>
        );
    }
});
