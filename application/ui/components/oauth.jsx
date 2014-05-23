/** @jsx React.DOM */
'use strict';

var React           = require('react');
var TextInput       = require('./input/text');
var StoreWatchMixin = require('synapse-common/ui/mixins/store-watch');
var util = require('util');

module.exports = React.createClass({

    displayName : 'OAuthPanel',

    mixins : [ StoreWatchMixin ],

    propTypes : {
        onOAuthStart : React.PropTypes.func.isRequired
    },

    handleClick : function()
    {
        this.props.onOAuthStart({
            clientId     : this.refs.clientId.getValue(),
            clientSecret : this.refs.clientSecret.getValue(),
            scope        : this.refs.scope.getValue()
        });
    },

    getStateFromStores : function()
    {
        return {
            hasOAuth : (this.props.stores.oauth.accessToken !== null),
            oauthData : (this.props.stores.oauth)
        };
    },

    getInitialState : function()
    {
        return this.getStateFromStores();
    },

    render : function()
    {
        return (
            <div className='panel__wrapper'>
                <div className='panel'>
                    <div className='panel__header'>
                        <h2>OAuth2</h2>
                    </div>
                    <label htmlFor='clientId'>Client ID</label>
                    <TextInput name='clientId' ref='clientId' />
                    <label htmlFor='clientSecret'>Client Secret</label>
                    <TextInput name='clientSecret' ref='clientSecret' />
                    <label htmlFor='scope'>Scope</label>
                    <TextInput name='scope' ref='scope' />
                    <a onClick={this.handleClick}>Connect</a>
                    <hr />
                    <pre>Access token: {this.state.oauthData.accessToken}</pre>
                    <pre>Token data: {util.inspect(this.state.oauthData.rawData)}</pre>
                </div>
            </div>
        );
    }
});
