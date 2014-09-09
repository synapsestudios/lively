/** @jsx React.DOM */
'use strict';

var React = require('react');
var cx    = require('react/lib/cx');
var Link  = require('react-router').Link;

module.exports = React.createClass({

    displayName : 'SiteHeader',

    render : function()
    {
        var backButton, apiLogo, linkParams, apiSummaryClasses;

        linkParams = {apiSlug : this.props.slug};

        apiSummaryClasses = cx({
            'header__api-link'            : true,
            'header__api-link--no-margin' : this.props.showBackButton
        });

        if (this.props.showBackButton) {
            backButton = <Link to='api-list' className='header__back-button'>&#xf104;</Link>;
        }

        if (this.props.logo) {
            apiLogo = (
                <img className='header__api-logo' src={this.props.logo} alt={this.props.name} />
            );
        }

        return (
            <div>
                <header className='header'>
                    {backButton}
                    <Link to='api' params={linkParams} className={apiSummaryClasses}>{apiLogo}{this.props.name}</Link>
                    <span className='header__branding'>
                        <img src="../images/logos/livelydocs-logomark.png" alt="" />
                        <span className='powered-by'>powered by</span>
                        <span className='logo-type'>Lively</span>
                    </span>
                </header>
                {this.props.children}
            </div>
        );
    }
});
