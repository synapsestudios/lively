/** @jsx React.DOM */
'use strict';

var React  = require('react');
var Method = require('./method');
var marked = require('marked');
var _      = require('underscore');

module.exports = React.createClass({

    displayName : 'Resource',

    propTypes : {
        name    : React.PropTypes.string.isRequired,
        methods : React.PropTypes.array.isRequired,
        synopsis : React.PropTypes.string
    },

    getInitialState : function()
    {
        var expanded = new Array(this.props.methods.length).map(function(){
            return false;
        });
        return {
            expanded : expanded
        };
    },

    getDefaultProps : function()
    {
        return {
            synopsis : null
        };
    },

    toggleDisplayMethod : function(id)
    {
        var expanded = this.state.expanded;
        expanded[id] = !expanded[id];
        this.setState({
            expanded : expanded
        });
    },

    getMethodComponent : function(method, id)
    {
        return (
           <Method key           = {method.name}
               name              = {method.name}
               synopsis          = {method.synopsis}
               method            = {method.method}
               uri               = {method.uri}
               oauth             = {method.oauth}
               params            = {method.params}
               oauthStore        = {this.props.oauthStore}
               methodPanelHidden = {!this.state.expanded[id]}
               toggleMethodPanel = {_.partial(this.toggleDisplayMethod, id)}
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
                    <button>Expand</button>
                </div>
                {synopsis}
                {this.props.methods.map(this.getMethodComponent)}
            </div>
        );
    }
});
