/** @jsx React.DOM */
'use strict';

var _     = require('underscore');
var React = require('react');

module.exports = React.createClass({

    displayName : 'ApiList',

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
