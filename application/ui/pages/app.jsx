/** @jsx React.DOM */
'use strict';

var _          = require('underscore');
var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');
var cx    = require('react/lib/cx');
var Link  = require('react-router').Link;

module.exports = React.createClass({
    displayName : 'App',

    render: function() {
        var backButton, apiLogo, linkParams, apiSummaryClasses;

        linkParams = {apiSlug : this.props.slug};

        apiSummaryClasses = cx({
            'header__api-link'            : true,
            'header__api-link--no-margin' : this.props.showBackButton
        });

        if (this.props.logo) {
            apiLogo = (
                <img className='header__api-logo' src={this.props.logo} alt={this.props.name} />
            );
        }

        return (
            <div>
                <header className='header'>
                    <Link to='api-list' className='header__back-button'>&#xf104;</Link>
                    {/*<Link to='api-page' params={linkParams} className={apiSummaryClasses}>{apiLogo}{this.props.name}</Link>*/}
                    <Link to='api-list' className={apiSummaryClasses}>{apiLogo}@TODO</Link>
                    <span className='header__branding'>
                        <img src="../images/logos/livelydocs-logomark.png" alt="" />
                        <span className='powered-by'>powered by</span>
                        <span className='logo-type'>Lively</span>
                    </span>
                </header>

                <this.props.activeRouteHandler/>
            </div>
        );
    }
});
