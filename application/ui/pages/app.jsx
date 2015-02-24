'use strict';

var _            = require('underscore');
var React        = require('react');
var config       = require('../../config');
var Router       = require('react-router');
var Link         = Router.Link;
var RouteHandler = Router.RouteHandler;
var logo         = require('../../../media/images/logos/livelydocs-logomark.png');
var overlay      = require('../../../media/images/css-images/overlay-pattern.png');
var background   = require('../../../media/images/css-images/background.svg');
var fonts = [
    require('../../../media/fonts/SourceSansPro/sourcesanspro-regular-webfont.woff'),
    require('../../../media/fonts/SourceSansPro/sourcesanspro-semibold-webfont.woff'),
    require('../../../media/fonts/SourceSansPro/sourcesanspro-regular-webfont.ttf'),
    require('../../../media/fonts/SourceSansPro/sourcesanspro-semibold-webfont.ttf'),
    require('../../../media/fonts/Inconsolata/inconsolata-webfont.woff'),
    require('../../../media/fonts/Inconsolata/inconsolata-webfont.ttf'),
    require('../../../media/fonts/FontAwesome/fontawesome-webfont.woff'),
    require('../../../media/fonts/FontAwesome/fontawesome-webfont.ttf')
];

module.exports = React.createClass({
    displayName : 'App',

    getInitialState : function()
    {
        return {
            apiName : null,
            apiLogo : null,
            apiSlug : null
        };
    },

    updateHeader: function(apiName, apiLogo, apiSlug) {
        this.setState({
            apiName : apiName,
            apiLogo : apiLogo,
            apiSlug : apiSlug
        });
    },

    render: function() {
        var logo, backButton, linkParams, heading;

        if (this.state.apiName) {
            linkParams = {apiSlug : this.state.apiSlug};

            if (this.state.apiLogo) {
                logo = (<img className='header__api-logo' src={this.state.apiLogo} alt={this.state.apiName} />);
            }

            if (_.size(config.apis) === 1) {
                heading = (<Link to='api' params={linkParams} className='header__api-link header__api-link'>{logo}{this.state.apiName}</Link>);
            } else {
                backButton = (<Link to='api-list' className='header__back-button'>&#xf104;</Link>);
                heading    = (<Link to='api' params={linkParams} className='header__api-link header__api-link--no-margin'>{logo}{this.state.apiName}</Link>);
            }
        }

        return (
            <div>
                <header className='header'>
                    {backButton}
                    {heading}
                    <span className='header__branding'>
                        <img src="/images/logos/livelydocs-logomark.png" alt="" />
                        <span className='powered-by'>powered by</span>
                        <span className='logo-type'>Lively</span>
                    </span>
                </header>

                <RouteHandler updateHeader={this.updateHeader} />
            </div>
        );
    }
});
