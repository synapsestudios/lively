'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName : 'Button',

    propTypes : {
        className : React.PropTypes.string,
        disabled  : React.PropTypes.bool,
        ref       : React.PropTypes.string,
        onClick   : React.PropTypes.func
    },

    getDefaultProps : function()
    {
        return {
            className : '',
            disabled  : false,
            ref       : undefined,
            onClick   : function () {}
        };
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
        var classes = this.props.className;

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
