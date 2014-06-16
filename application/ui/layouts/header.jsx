/** @jsx React.DOM */
'use strict';

var React      = require('react');
var cx         = require('react/lib/cx');
var dispatcher = require('synapse-common/lib/dispatcher');

module.exports = React.createClass({

    displayName : 'SiteHeader',

    toggleOAuthPanel : function()
    {
        dispatcher.emit('toggleOauthPanel');
    },

    render : function()
    {
        var oAuthLinkClasses = cx({
            'header__auth'      : true,
            'fa'                : true,
            'fa-lock'           : this.props.hasOAuth,
            'fa-unlock-alt'     : ! this.props.hasOAuth
        });

        return (
            <div>
                <header className="header">
                    <a href="/" className="header__branding fa fa-angle-left">Lively</a>
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
