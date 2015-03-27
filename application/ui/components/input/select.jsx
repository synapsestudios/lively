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
        return <option key={'option-' + index} value={option.label}>
            {option.label}
        </option>;
    },

    handleChange : function(event)
    {
        var callback = this.props.onChange;
        var option   = _.findWhere(this.props.options, {label: event.target.value});

        if (! _.isFunction(callback)) {
            return;
        }

        callback(option.value);
    },

    render : function()
    {
        return (
            <select className='select' onChange={this.handleChange} value={this.props.value} defaultValue={this.props.value}>
                {this.props.options.map(this.renderOption)}
            </select>
        );
    }
});
