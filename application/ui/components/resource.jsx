/** @jsx React.DOM */
'use strict';

var React  = require('react');
var Method = require('./method');
var marked = require('marked');

module.exports = React.createClass({

    displayName : 'Resource',

    propTypes : {
        name    : React.PropTypes.string.isRequired,
        methods : React.PropTypes.array.isRequired,
        synopsis : React.PropTypes.string
    },

    getDefaultProps : function()
    {
        return {
            synopsis : null
        };
    },

    getMethodComponent : function(method)
    {
        return (
            <Method key   = {method.name}
               name       = {method.name}
               synopsis   = {method.synopsis}
               method     = {method.method}
               uri        = {method.uri}
               oauth      = {method.oauth}
               params     = {method.params}
               oauthStore = {this.props.oauthStore}
            />
        );
    },

    render : function()
    {
        var synopsis;

        if (this.props.synopsis) {
            synopsis = (
                <div className='panel__synopsis' dangerouslySetInnerHTML={{__html: marked(this.props.synopsis)}} />
            );
        }

        return (
            <div className='panel'>
                <div className='panel__summary'>
                    <h1>{this.props.name}</h1>
                </div>
                {synopsis}
                {this.props.methods.map(this.getMethodComponent)}
            </div>
        );
    }
});
