/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'TextAreaParam',

    propTypes : {
        value    : React.PropTypes.string,
        onChange : React.PropTypes.func
    },

    handleChange : function(event)
    {
        var value = event.target.value;

        this.props.onChange(value);
    },

    render : function()
    {
        return <textarea className='array-textarea' value={this.props.value} onChange={this.handleChange} />;
    }
});
