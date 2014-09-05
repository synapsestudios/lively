/** @jsx React.DOM */
'use strict';

var _          = require('underscore');
var React      = require('react');
var cx         = require('react/lib/cx');
var StoreWatch = require('synapse-common/ui/mixins/store-watch');
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

    slugify : function(text)
    {
        return text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
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

        return (
            <div className={classes}>
                <div className='main-nav__group-header' onClick={this.toggleNavCollapse}>

                    <span key={'c-'+this.slugify(this.props.categoryName)}
                        className='main-nav__group-title'
                        onClick={this.toggleNavCollapse}>
                        {this.props.categoryName}
                    </span>
                </div>
                <ul>
                    {this.props.children}
                </ul>
            </div>
        );
    }

});

module.exports = React.createClass({

    displayName : 'MainNav',
    mixins      : [ StoreWatch ],

    getStateFromStores : function()
    {
        return {
            hasOAuth : (this.props.stores.oauth.accessToken !== null)
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


    slugify : function(text)
    {
        return text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    },

    navItemFromResource : function(resource, index)
    {
        var navLinkClasses = cx({
            'main-nav__link'         : true
        });

        return (
            <li className='main-nav__item' key={'resource-' + index}>
                <Link
                    to              = 'api-resource'
                    apiSlug         = {this.props.slug}
                    resourceSlug    = {this.slugify(resource.name)}
                    className       = {navLinkClasses}
                    activeClassName = 'main-nav__link--active'>
                    {resource.name}
                </Link>
            </li>
        );
    },

    buildFlatNavList : function()
    {
        return _.map(this.props.config.resources, this.navItemFromResource, this);
    },

    buildNestedNavList : function()
    {
        return _.flatten(_.map(this.props.config.resources, function(subResources, categoryName) {
            var items = _.map(subResources, this.navItemFromResource, this);
            var output=(
                <GroupHeader categoryName={categoryName} onClick={this.onClick}>
                    {items}
                </GroupHeader>
            );

            return output;
        }, this));
    },

    buildNavList : function()
    {
        if (_.isArray(this.props.config.resources)) {
            return this.buildFlatNavList();
        } else {
            return this.buildNestedNavList();
        }
    },

    buildOAuthButton : function()
    {
         var oAuthLinkClasses = cx({
            'o-auth'        : true,
            'fa'            : true,
            'fa-lock'       : this.state.hasOAuth,
            'fa-unlock-alt' : ! this.state.hasOAuth
        });

        if (_.isUndefined(this.props.stores.oauth.tokenParam)) {
            return null;
        } else {
            return (<span className='o-auth__tooltip'><span className={oAuthLinkClasses} onClick={this.toggleOAuthPanel}></span></span>);
        }
    },

    render : function()
    {
        return (
            <div className='main-nav__wrapper'>
                <h3 className='main-nav__header'>API Resources{this.buildOAuthButton()}</h3>
                <div className='main-nav'>
                    {this.buildNavList()}
                </div>
            </div>
        );
    }
});
