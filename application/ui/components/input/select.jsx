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
            <select className="select" ref='input' onChange={this.handleChange}>
                {this.props.options.map(this.getOptions)}
            </select>
        );
    }
});
