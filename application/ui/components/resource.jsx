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

    /**
     * Sets initial state for keeping track of whether method components are expanded or collapsed
     *
     * @return {object}
     */
    getInitialState : function()
    {
        var expanded = this.props.methods.map(function(){
            return false;
        });

        return {
            expanded    : expanded,
            allExpanded : false
        };
    },

    getDefaultProps : function()
    {
        return {
            synopsis : null
        };
    },

    /**
     * given an array index toggleDisplayMethod will either expand or collapse the method component
     *
     * @param  {int} id
     */
    toggleDisplayMethod : function(id)
    {
        var expanded = this.state.expanded;
        expanded[id] = !expanded[id];

        var allExpanded = !_.contains(expanded, false);

        this.setState({
            expanded : expanded,
            allExpanded : allExpanded
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

    /**
     * Click handler for the expand/collapse button on method pages
     */
    handleExpandCollapseClick : function(){
        var expanded = this.state.expanded;
        var allExpanded = this.state.allExpanded;

        expanded = expanded.map(function(){
            return !allExpanded;
        });
        allExpanded = !allExpanded;

        this.setState({
            expanded: expanded,
            allExpanded: allExpanded
        });
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
                    <button onClick={this.handleExpandCollapseClick}>{(this.state.allExpanded) ? ('Collapse') : ('Expand')}</button>
                </div>
                {synopsis}
                {this.props.methods.map(this.getMethodComponent)}
            </div>
        );
    }
});
