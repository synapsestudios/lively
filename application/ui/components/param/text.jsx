/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'TextParam',

    propTypes : {
        value    : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        type     : React.PropTypes.string,
        onChange : React.PropTypes.func
    },

    handleChange : function(event)
    {
        var value = event.target.value;
        if (this.props.type === 'integer' || this.props.type === 'number') {
            value = parseInt(value, 10);
        } else if(this.props.type === 'float') {
            value = parseFloat(value);
        }
        this.props.onChange(value);
    },

    render : function()
    {
        return this.transferPropsTo(
            <input value={this.props.value} onChange={this.handleChange} />
        );
    }
});
