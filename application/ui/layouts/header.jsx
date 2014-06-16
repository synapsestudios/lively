/** @jsx React.DOM */
'use strict';

var React             = require('react');
var cx                = require('react/lib/cx');

module.exports = React.createClass({

    displayName : 'SiteHeader',

    getStateFromStores : function()
    {
        return {
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
        var oAuthLinkClasses = cx({
            'header__auth'      : true,
            'fa'                : true,
            'fa-lock'           : this.state.hasOAuth,
            'fa-unlock-alt'     : ! this.state.hasOAuth
        });

        return (
            <div>
                <header className="header">
                    <a className="header__branding fa fa-angle-left">LIVELY</a>
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
