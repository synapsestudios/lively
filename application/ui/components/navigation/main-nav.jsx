/** @jsx React.DOM */
'use strict';

var _      = require('underscore');
var React  = require('react');
var Router = require('react-router-component');
var Link   = Router.Link;

module.exports = React.createClass({

    displayName : 'MainNav',

    slugify : function(text)
    {
        return text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    },

    navItemFromResource : function(resource)
    {
        return (
            <Link href={'/'+this.slugify(resource.name)} key={this.slugify(resource.name)} className="main-nav__link">
                <li className="main-nav__item">
                    {resource.name}
                </li>
            </Link>
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
            items.unshift(
                <a key={'c-'+this.slugify(categoryName)} className='main-nav__link'>
                    <li className='main-nav__item main-nav__item--bold'>
                        {categoryName}
                    </li>
                </a>
            );

            return items;
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

    render : function() {

        return (
            <div className="main-nav__wrapper">
                <a className="header__back-link fa fa-arrow-left" href="/">Back to API List</a>
                <div className="header__branding">
                    <a className="branding fa fa-github" href={'/' + this.props.slug}></a>
                </div>
                <ul className="main-nav">
                    {this.buildNavList()}
                </ul>

            </div>
        );
    }
});
