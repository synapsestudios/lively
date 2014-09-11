/** @jsx React.DOM */
'use strict';

var _          = require('underscore');
var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');

var Resource     = require('./resource');

module.exports = React.createClass({

    displayName : 'ApiResource',

    render : function()
    {
        return (
            <div className='panel__wrapper'>
                <Resource name={this.props.config.name}
                      synopsis={this.props.config.synopsis}
                      methods={this.props.config.methods}
                      oauthStore={this.props.stores.oauth} />
            </div>
        );
    }

});
