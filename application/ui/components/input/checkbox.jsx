'use strict';

var React = require('react');

module.exports = React.createClass({

    displayName : 'CheckboxParam',

    getValue : function()
    {
        return this.refs.input.getDOMNode().checked;
    },

    handleChange : function()
    {
        this.props.onChange(this.getValue());
    },

    render : function()
    {
        return (
            <div className='onoffswitch'>
                <input
                    type           = 'checkbox'
                    ref            = 'input'
                    name           = {this.props.name}
                    className      = 'onoffswitch-checkbox'
                    id             = {this.props.name}
                    defaultChecked = {this.props.defaultChecked}
                    onChange       = {this.handleChange}
                />
                <label className='onoffswitch-label' htmlFor={this.props.name}>
                    <span className='onoffswitch-inner'></span>
                    <span className='onoffswitch-switch'></span>
                </label>
            </div>
        );
    }
});
