/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'TextInput',

    propTypes : {
        value    : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        onChange : React.PropTypes.func
    },

    handleChange : function(event)
    {
        this.props.onChange(event.target.value);
    },

    render : function()
    {
        return this.transferPropsTo(
            <input value={this.props.value} onChange={this.handleChange} />
        );
    }
});
