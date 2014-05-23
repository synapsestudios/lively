/** @jsx React.DOM */
'use strict';

var React  = require('react');
var Params = require('./params-list');

module.exports = React.createClass({

    displayName : 'Method',

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

    onSubmit : function()
    {
        console.log(this.refs.params.getValues());
    },

    render : function()
    {
        return (
            <div className='panel__wrapper'>
                <div className='panel'>
                    <div className='panel__header'>
                        <h2>{this.props.name}</h2>
                    </div>
                    {this.props.synopsis}
                    <Params params={this.props.params} ref='params' />
                    <a onClick={this.onSubmit}>Try it</a>
                </div>
            </div>
        );
    }
});
