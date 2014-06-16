/** @jsx React.DOM */
'use strict';

var _      = require('underscore');
var React  = require('react');
var cx     = require('react/lib/cx');
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
        var navLinkClasses = cx({
            'main-nav__link'         : true,

        });

        return (
            <Link href={'/'+this.slugify(resource.name)} key={this.slugify(resource.name)} className={navLinkClasses}>
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
                <ul className="main-nav">
                    {this.buildNavList()}
                </ul>

            </div>
        );
    }
});
