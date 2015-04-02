/* global window */
'use strict';

var _          = require('underscore');
var React      = require('react');
var config     = require('../../config');
var assets     = require('../../assets');
var Router     = require('react-router');
var Navigation = Router.Navigation;

module.exports = React.createClass({

    displayName : 'ApiList',

    mixins : [Navigation],

    componentDidMount : function()
    {
        window.document.title = 'Lively Docs';
        this.props.updateHeader();

        if (_.size(config.apis) === 1) {
            this.transitionTo('api-summary', {apiSlug : _.keys(config.apis)[0]});
        }
    },

    renderLinks : function()
    {
        return _.map(config.apis, function(api, slug) {
            var apiAssets, apiLogo;

            apiAssets = assets.apis[slug] || {};

            if (apiAssets.logo) {
                apiLogo = (
                    <img className="panel__link-logo" src={apiAssets.logo} alt={api.name} />
                );
            }

            return (
                <a className='panel__link' href={'/' + slug} key={slug}>
                    {apiLogo}
                    {api.name}
                </a>
            );
        });
    },

    render : function()
    {
        return (
            <div className='panel__wrapper panel__wrapper--full-width'>
                <div className='panel'>
                    <h1>API List</h1>
                    {this.renderLinks()}
                </div>
            </div>
        );
    }

});
