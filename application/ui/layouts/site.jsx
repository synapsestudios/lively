/** @jsx React.DOM */
'use strict';

var React   = require('react');

module.exports = React.createClass({

    displayName : 'Layout',

    render : function() {
        return (
            <div>
                {this.props.activeRoute}
            </div>
        );
    }
});
