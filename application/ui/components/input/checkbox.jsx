'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'TextInput',

    getValue : function()
    {
        return this.refs.input.getDOMNode().checked;
    },

    render : function()
    {
        return this.transferPropsTo(<input type='checkbox' ref='input' />);
    }
});
