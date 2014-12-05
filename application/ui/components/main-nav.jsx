/** @jsx React.DOM */
'use strict';

var _          = require('underscore');
var React      = require('react');
var Fluxxor    = require('fluxxor');
var FluxMixin  = Fluxxor.FluxMixin(React);
var cx         = require('react/lib/cx');
var slugifier  = require('../../util/slug-helper').getSlugFromResource;
var Link       = require('react-router').Link;
var dispatcher = require('synapse-common/lib/dispatcher');

var GroupHeader = React.createClass({

    displayName : 'GroupHeader',

    getInitialState : function()
    {
        return {
            collapse : false
        };
    },

    toggleNavCollapse : function() {
        this.setState({
            collapse : ! this.state.collapse
        });
    },

    render : function()
    {
        var classes = cx({
            'main-nav__group'           : true,
            'main-nav__group--collapse' : this.state.collapse
        });

        var params = {
            apiSlug : this.props.apiSlug,
            splat   : this.props.categorySlug
        };

        return (
            <div className={classes}>
                <div className='main-nav__group-header'>
                    <span className='main-nav__group-title'>
                        <Link
                            to              = 'api-resource'
                            params          = {params}
                            className       = 'main-nav__link'
                            activeClassName = 'main-nav__link--active'>
                            {this.props.categoryName}
                        </Link>
                    </span>
                </div>
                {this.props.children}
            </div>
        );
    }

});

module.exports = React.createClass({

    displayName : 'MainNav',

    mixins      : [ FluxMixin ],

    propTypes : {
        oauthStoreState : React.PropTypes.object.isRequired,
        apiConfig       : React.PropTypes.object.isRequired
    },

    getStateFromStores : function()
    {
        return {
            hasOAuth : (this.props.oauthStoreState.accessToken !== null)
        };
    },

    getInitialState : function()
    {
        return this.getStateFromStores();
    },

    toggleOAuthPanel : function()
    {
        dispatcher.emit('toggleOauthPanel');
    },

    navItemFromResource : function(resource, index, currentPath)
    {
        var params;

        params = {
            apiSlug : this.props.slug,
            splat   : currentPath + '/' + slugifier(resource)
        };

        return (
            <li className='main-nav__item' key={'resource-' + currentPath.replace('/', '-') + '-' + index}>
                <Link
                    to              = 'api-resource'
                    params          = {params}
                    className       = 'main-nav__link'
                    activeClassName = 'main-nav__link--active'>
                    {resource.name}
                </Link>
            </li>
        );
    },

    buildNavList : function(resources, currentPath)
    {
        if (! resources) {
            return;
        }

        var items = [];
        var component = this;

        _.each(resources, function(resource, index) {
            var childList;
            var slug = slugifier(resource);

            items.push(component.navItemFromResource(resource, index, currentPath));

            childList = component.buildNavList(resource.resources, currentPath + '/' + slug);

            if (childList) {
                items.push(<li key={'resource-list-' + currentPath.replace('/', '-') + '-' + index}>{childList}</li>);
            }
        });

        return (<ul>{items}</ul>);
    },

    buildCategories : function(resources)
    {
        if (! resources) {
            return;
        }

        var items     = [];
        var component = this;

        _.each(resources, function(resource) {
            var slug = slugifier(resource);
            var subnav = component.buildNavList(resource.resources, slug);

            items.push(
                <GroupHeader
                    categoryName    = {resource.name}
                    categorySlug    = {slug}
                    apiSlug         = {component.props.slug}
                    key             = {'c-'+slug}
                >
                    {subnav}
                </GroupHeader>
            );
        });

        return items;
    },

    render : function()
    {
        var oAuthLinkClasses;

        oAuthLinkClasses = cx({
            'o-auth'        : true,
            'fa'            : true,
            'fa-lock'       : this.state.hasOAuth,
            'fa-unlock-alt' : ! this.state.hasOAuth
        });

        return (
            <div className='main-nav__wrapper'>
                <h3 className='main-nav__header'>
                    Documentation
                    <span className='o-auth__tooltip'>
                        <span className={oAuthLinkClasses} onClick={this.toggleOAuthPanel}></span>
                    </span>
                </h3>
                <div className='main-nav'>
                    {this.buildCategories(this.props.apiConfig.resources)}
                </div>
            </div>
        );
    }
});
