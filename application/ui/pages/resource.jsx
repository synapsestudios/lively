/** @jsx React.DOM */
'use strict';

var React             = require('react');
var StoreWatchMixin   = require('synapse-common/ui/mixins/store-watch');
var Resource          = require('../components/resource');

module.exports = React.createClass({

    displayName : 'ResourcePage',

    mixins : [ StoreWatchMixin ],

    propTypes : {
        config : React.PropTypes.object.isRequired
    },

    getStateFromStores : function()
    {
        return {
            hasOAuth : (this.props.stores.oauth.accessToken !== null)
        };
    },

    getInitialState : function()
    {
        return this.getStateFromStores();
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
