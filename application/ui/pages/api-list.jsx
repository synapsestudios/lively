/** @jsx React.DOM */
'use strict';

var _          = require('underscore');
var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');

module.exports = React.createClass({

    displayName : 'ApiList',

    componentWillMount : function()
    {
        if (_.size(this.props.config) === 1) {
            dispatcher.emit('router:redirect', 'api', {
                apiSlug : _.keys(this.props.config)[0]
            });
        }
    },

    render : function()
    {
        var links = _.map(this.props.config, function(config, slug) {

            return (
                <a className="panel__link fa fa-github" href={'/' + slug} key={slug}>
                    {config.name}
                </a>
            );
        });

        return (
            <div className='panel__wrapper panel__wrapper--full-width'>
                <div className='panel'>
                    <div className='panel__header'>
                        <h2>API List</h2>
                    </div>
                    {links}
                </div>
            </div>
        );
    }

});
