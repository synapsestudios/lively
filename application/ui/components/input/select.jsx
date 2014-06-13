/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'SelectInput',

    propTypes : {
        options : React.PropTypes.array.isRequired
    },

    getValue : function()
    {
        var element = this.refs.input.getDOMNode();
        return element.options[element.selectedIndex].value;
    },

    getOptions : function(option, index)
    {
        return <option key={index} value={option}>{option}</option>;
    },

    render : function()
    {
        return this.transferPropsTo(
            <select className="select" ref='input'>
                {this.props.options.map(this.getOptions)}
            </select>
        );
    }
});
