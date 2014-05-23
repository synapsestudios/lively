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

    getOptions : function(option, idx)
    {
        return <option key={idx} value={option}>{option}</option>;
    },

    render : function()
    {
        return this.transferPropsTo(
            <select ref='input'>
                {this.props.options.map(this.getOptions)}
            </select>
        );
    }
});
