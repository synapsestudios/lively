/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    propTypes : {
        name         : React.PropTypes.string.isRequired,
        required     : React.PropTypes.bool,
        type         : React.PropTypes.string.isRequired,
        description  : React.PropTypes.string,
        defaultValue : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ])
    },

    getDefaultProps : function()
    {
        return {
            required    : false,
            description : ''
        };
    },

    render : function()
    {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td><input /></td>
                <td><code>{this.props.type}</code></td>
                <td>{this.props.description}</td>
            </tr>
        );
    }
});
