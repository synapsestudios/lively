'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName : 'Button',

    propTypes : {
        className : React.PropTypes.string,
        ref       : React.PropTypes.string,
        onClick   : React.PropTypes.func
    },

    onClick : function(event)
    {
        if (this.props.disabled === true) {
            return;
        }

        this.props.onClick(event);
    },

    render : function()
    {
        var classes = this.props.className || '';

        classes += ' button';

        if (this.props.disabled === true) {
            classes += ' button--disabled';
        }

        return (
            <a className={classes} ref={this.props.ref} onClick={this.onClick}>
                {this.props.children}
            </a>
        );
    }
});
