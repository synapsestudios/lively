'use strict';

var _     = require('underscore');
var React = require('react');

module.exports = React.createClass({

    displayName : 'SelectInput',

    propTypes : {
        options  : React.PropTypes.array.isRequired,
        onChange : React.PropTypes.func.isRequired,
        value    : React.PropTypes.any
    },

    renderOption : function(option, index)
    {
        return <option key={'option-' + index} value={option}>
            {option}
        </option>;
    },

    handleChange : function(event)
    {
        var callback = this.props.onChange;

        if (! _.isFunction(callback)) {
            return;
        }

        callback(event.target.value);
    },

    render : function()
    {
        return this.transferPropsTo(
            <select className='select' onChange={this.handleChange} value={this.props.value}>
                {this.props.options.map(this.renderOption)}
            </select>
        );
    }
});
