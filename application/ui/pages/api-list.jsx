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
        if (_.size(this.props.config.apis) === 1) {
            dispatcher.emit('router:redirect', 'api', {
                apiSlug : _.keys(this.props.config.apis)[0]
            });
        }
    },

    componentDidMount : function()
    {
        window.document.title = 'Lively Docs';
    },

    render : function()
    {
        var links = _.map(this.props.config.apis, function(config, slug) {

            return (
                <a className='panel__link fa fa-github' href={'/' + slug} key={slug}>
                    {config.name}
                </a>
            );
        });

        return (
            <div className='panel__wrapper panel__wrapper--full-width'>
                <div className='panel'>
                    <div className='panel__header'>
                        <h1>API List</h1>
                    </div>
                    {links}
                </div>
            </div>
        );
    }

});
