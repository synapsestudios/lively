'use strict';

var React           = require('react');
var FluxMixin       = require('fluxxor').FluxMixin(React);
var StoreWatchMixin = require('fluxxor').StoreWatchMixin;

module.exports = React.createClass({

    displayName : 'StripeTokenInput',

    propTypes : {
        value        : React.PropTypes.string,
        paramName    : React.PropTypes.string,
        endpointName : React.PropTypes.string,
        onChange     : React.PropTypes.func
    },

    mixins : [
        FluxMixin,
        new StoreWatchMixin('ConfigStore', 'StripeStore')
    ],

    getStateFromFlux : function()
    {
        var configState, stripeState;

        configState  = this.getFlux().store('ConfigStore').getState();
        stripeState  = this.getFlux().store('StripeStore').getState();

        return {
            stripeKey     : configState.stripe_key,
            stripeLoading : (stripeState.endpoint[this.props.endpointName] || {}).loading,
            stripeToken   : (stripeState.endpoint[this.props.endpointName] || {}).token
        };
    },

    componentWillUpdate : function(nextProps, nextState)
    {
        if (nextState.stripeToken !== this.state.stripeToken) {
            this.props.onChange(nextState.stripeToken);
        }
    },

    getGenerateStripeTokenCallback : function(paramName)
    {
        var component = this;

        return function() {
            component.getFlux().actions.stripe.requestToken(
                component.state.stripeKey,
                paramName,
                component.props.endpointName
            );
        };
    },

    render : function()
    {
        var button;

        if (! this.state.stripeKey) {
            button = <button disabled={true}>Stripe Key Not Found</button>;
        } else if (this.state.stripeLoading) {
            button = <button disabled={true}>Loading...</button>;
        } else if (this.state.stripeToken) {
            button = (
                <button onClick={this.getGenerateStripeTokenCallback(this.props.paramName)}>
                    {this.state.stripeToken}
                </button>
            );
        } else {
            button = <button onClick={this.getGenerateStripeTokenCallback(this.props.paramName)}>Generate Token</button>;
        }

        return button;
    }
});
