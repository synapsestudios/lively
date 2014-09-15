/** @jsx React.DOM */
/* global window */
'use strict';

var _          = require('underscore');
var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');

module.exports = React.createClass({

    displayName : 'ApiList',

    componentWillMount : function()
    {
        /*
        if (_.size(this.props.config.apis) === 1) {
            dispatcher.emit('router:redirect', 'api-resource', {
                apiSlug : _.keys(this.props.config.apis)[0]
            });
        }
        */
    },

    componentDidMount : function()
    {
        window.document.title = 'Lively Docs';
        this.props.updateHeader();
    },

    render : function()
    {
        var links = _.map(this.props.config.apis, function(config, slug) {

            var apiLogo;

            if (config.logo) {
                apiLogo = (
                    <img className="panel__link-logo" src={config.logo} alt={config.name} />
                );
            }

            return (
                <a className='panel__link' href={'/' + slug} key={slug}>
                    {apiLogo}
                    {config.name}
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
