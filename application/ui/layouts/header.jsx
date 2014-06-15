/** @jsx React.DOM */
'use strict';

var React             = require('react');
var cx                = require('react/lib/cx');

module.exports = React.createClass({

    displayName : 'SiteHeader',

    render : function()
    {

        var oAuthLinkClasses = cx({
            'header__auth'      : true,
            'fa'                : true,
            'fa-lock'           : this.props.hasOAuth,
            'fa-unlock-alt'     : ! this.props.hasOAuth
        });

        return (
            <header className="header">
                <span className="header__branding">LIVELY</span>
                <span className={oAuthLinkClasses} hasOAuth={this.hasOAuth} onClick={this.toggleOAuthPanel}>{'OAuth2'}</span>
            </header>
        );
    }
});
