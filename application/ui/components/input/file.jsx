/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'FileParam',

    propTypes : {
        value    : React.PropTypes.object,
        onChange : React.PropTypes.func
    },

    handleChange : function(event)
    {
        var value = event.currentTarget.files.item(0);
        this.props.onChange(value);
    },

    render : function()
    {
        return this.transferPropsTo(
            <input type={'file'} onChange={this.handleChange} />
        );
    }
});
