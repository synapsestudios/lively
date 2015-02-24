/* global window */
'use strict';

var _      = require('underscore');
var React  = require('react');
var config = require('../../config');
var Router = require('react-router');

module.exports = React.createClass({

    displayName : 'ApiList',

    componentWillMount : function()
    {
        if (_.size(config.apis) === 1) {
            Router.transitionTo('api-summary', {apiSlug : _.keys(config.apis)[0]});
        }
    },

    componentDidMount : function()
    {
        window.document.title = 'Lively Docs';
        this.props.updateHeader();
    },

    render : function()
    {
        var links = _.map(config.apis, function(api, slug) {

            var apiLogo;

            if (api.logo) {
                apiLogo = (
                    <img className="panel__link-logo" src={api.logo} alt={api.name} />
                );
            }

            return (
                <a className='panel__link' href={'/' + slug} key={slug}>
                    {apiLogo}
                    {api.name}
                </a>
            );
        });

        return (
            <div className='panel__wrapper panel__wrapper--full-width'>
                <div className='panel'>
                    <h1>API List</h1>
                    {links}
                </div>
            </div>
        );
    }

});
