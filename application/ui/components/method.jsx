/** @jsx React.DOM */
'use strict';

var React  = require('react');
var Params = require('./params-table');

module.exports = React.createClass({

    propTypes : {
        name     : React.PropTypes.string.isRequired,
        synopsis : React.PropTypes.string,
        method   : React.PropTypes.oneOf(['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH']),
        uri      : React.PropTypes.string.isRequired,
        oauth    : React.PropTypes.bool,
        params   : React.PropTypes.array
    },

    getDefaultProps : function()
    {
        return {
            synopsis : '',
            oauth    : true,
            params   : []
        };
    },

    render : function()
    {
        var params = this.props.params.length ? <Params params={this.props.params} /> : '';

        return (
            <div className="panel__wrapper">
                <div className="panel">
                    <div className="panel__header">
                        <h2>{this.props.name}</h2>
                    </div>
                    {this.props.synopsis}
                    {params}
                    <a>Try it</a>
                </div>
            </div>
        );
    }
});
