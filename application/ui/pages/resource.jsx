/** @jsx React.DOM */
'use strict';

var React    = require('react');
var Resource = require('../components/resource');

module.exports = React.createClass({

    displayName : 'ResourcePage',

    propTypes : {
        config : React.PropTypes.object.isRequired
    },

    render : function()
    {
        return (
            <Resource name={this.props.config.name}
                      methods={this.props.config.methods}
                      oauthStore={this.props.stores.oauth} />
        );
    }

});
