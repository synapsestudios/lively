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
        return this.transferPropsTo(
            <div className="onoffswitch">
                <input type="checkbox" ref='input' name={this.props.name} className="onoffswitch-checkbox" id={this.props.name} />
                <label className="onoffswitch-label" htmlFor={this.props.name}>
                    <span className="onoffswitch-inner"></span>
                    <span className="onoffswitch-switch"></span>
                </label>
            </div>
        );
    }
});
