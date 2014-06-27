/** @jsx React.DOM */
'use strict';

var _      = require('underscore');
var React  = require('react');
var cx     = require('react/lib/cx');
var Router = require('react-nested-router');
var Link   = Router.Link;

module.exports = React.createClass({

    displayName : 'MainNav',

    slugify : function(text)
    {
        return text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    },

    navItemFromResource : function(resource, idx)
    {
        var navLinkClasses = cx({
            'main-nav__link'         : true
        });

        return (
            <li className="main-nav__item">
                <Link to='api-resource'
                    apiSlug={this.props.slug}
                    resourceSlug={this.slugify(resource.name)}
                    key={idx+'-'+this.slugify(resource.name)}
                    className={navLinkClasses}>
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
            items.unshift(
                <li className='main-nav__item main-nav__item--bold'>
                    <a key={'c-'+this.slugify(categoryName)} className='main-nav__link'>
                        {categoryName}
                    </a>
                </li>
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
                <h3 className="main-nav__header">API Resources</h3>
                <ul className="main-nav">
                    {this.buildNavList()}
                </ul>

            </div>
        );
    }
});
