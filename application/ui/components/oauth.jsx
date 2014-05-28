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
            <div className='panel'>
                <div className='panel__header'>
                    <h2>OAuth2</h2>
                </div>
                <div className="small-4 columns">
                    <label className="panel-form__label" htmlFor='clientId'>Client ID</label>
                    <TextInput className="form__input panel-form__input" name='clientId' ref='clientId' />
                </div>
                <div className="small-4 columns">
                    <label className="panel-form__label" htmlFor='clientSecret'>Client Secret</label>
                    <TextInput className="form__input panel-form__input" name='clientSecret' ref='clientSecret' />
                </div>
                <div className="small-4 columns">
                    <label className="panel-form__label" htmlFor='scope'>Scope</label>
                    <TextInput className="form__input panel-form__input" name='scope' ref='scope' />
                </div>
                <div className="small-12 columns">
                    <a className="button right" onClick={this.handleClick}>Connect</a>
                </div>
                <hr />
                <div className="small-6 columns">
                    <pre>Access token: {this.state.oauthData.accessToken}</pre>
                </div>
                <div className="small-6 columns">
                    <pre>Token data: {util.inspect(this.state.oauthData.rawData)}</pre>
                </div>
            </div>
        );
    }
});
