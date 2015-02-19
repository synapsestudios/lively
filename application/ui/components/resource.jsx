/** @jsx React.DOM */
'use strict';

var React    = require('react');
var Endpoint = require('./endpoint');
var _        = require('underscore');

module.exports = React.createClass({

    displayName : 'Resource',

    propTypes : {
        name       : React.PropTypes.string.isRequired,
        endpoints  : React.PropTypes.array.isRequired,
        synopsis   : React.PropTypes.string
    },

    /**
     * Sets initial state for keeping track of whether endpoint components are expanded or collapsed
     *
     * @return {object}
     */
    getInitialState : function()
    {
        var expanded = this.props.endpoints.map(function() {
            return false;
        });

        return {
            expanded    : expanded,
            allExpanded : false
        };
    },

    /**
     * Rebuilds state when new props are received
     *
     * @param  {Object} nextProps The incoming props
     */
    componentWillReceiveProps : function(nextProps)
    {
        var expanded = nextProps.endpoints.map(function() {
            return false;
        });

        this.setState({
            expanded    : expanded,
            allExpanded : false
        });
    },

    getDefaultProps : function()
    {
        return {
            synopsis : null
        };
    },

    /**
     * given an array index toggleDisplayEndpoint will either expand or collapse the endpoint component
     *
     * @param  {int} id
     */
    toggleDisplayEndpoint : function(id)
    {
        var expanded = this.state.expanded;
        expanded[id] = ! expanded[id];

        var allExpanded = ! _.contains(expanded, false);

        this.setState({
            expanded    : expanded,
            allExpanded : allExpanded
        });
    },

    getEndpointComponent : function(endpoint, id)
    {
        return (
           <Endpoint key           = {endpoint.name}
               name                = {endpoint.name}
               synopsis            = {endpoint.synopsis}
               method              = {endpoint.method}
               uri                 = {endpoint.uri}
               oauth               = {endpoint.oauth}
               params              = {endpoint.params}
               endpointPanelHidden = {! this.state.expanded[id]}
               toggleEndpointPanel = {_.partial(this.toggleDisplayEndpoint, id)}
            />
        );
    },

    /**
     * Click handler for the expand/collapse button on endpoint pages
     */
    handleExpandCollapseClick : function()
    {
        var expanded    = this.state.expanded;
        var allExpanded = this.state.allExpanded;

        expanded = expanded.map(function() {
            return ! allExpanded;
        });
        allExpanded = ! allExpanded;

        this.setState({
            expanded    : expanded,
            allExpanded : allExpanded
        });
    },

    renderExpandCollapseButton : function()
    {
        if (this.props.endpoints.length > 1) {
            return (
                <button className='button__toggle' onClick={this.handleExpandCollapseClick}>
                    {(this.state.allExpanded) ? ('Collapse All') : ('Expand All')}
                </button>
            );
        }
    },

    render : function()
    {
        var synopsis;

        if (this.props.synopsis) {
            synopsis = (
                <div dangerouslySetInnerHTML={{__html: this.props.synopsis}} />
            );
        }

        return (
            <div className='panel'>
                <div className='panel__synopsis'>
                    <h1>{this.props.name}</h1>
                    {this.renderExpandCollapseButton()}
                    {synopsis}
                </div>
                {_.map(this.props.endpoints, this.getEndpointComponent)}
            </div>
        );
    }
});
