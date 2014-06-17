'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'TextInput',

    getValue : function()
    {
        return this.refs.input.getDOMNode().value;
    },

    handleChange : function(event)
    {
        var callback = this.props.handleChange,
            toString = Object.prototype.toString;

        if (toString.call(callback) !== '[object Function]') {
            return;
        }

        this.props.handleChange(event, this);
    },

    render : function()
    {
        return this.transferPropsTo(
            <input onChange={this.handleChange} ref='input' />
        );
    }
});
