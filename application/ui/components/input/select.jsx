'use strict';

var _     = require('underscore');
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
        return <option key={'option-' + index} value={option}>{option}</option>;
    },

    handleChange : function(event)
    {
        var callback = this.props.handleChange;

        if (! _.isFunction(callback)) {
            return;
        }

        this.props.handleChange(event, this);
    },

    render : function()
    {
        return this.transferPropsTo(
            <select className='select' ref='input' onChange={this.handleChange}>
                {this.props.options.map(this.getOptions)}
            </select>
        );
    }
});
