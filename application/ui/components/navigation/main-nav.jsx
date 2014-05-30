/** @jsx React.DOM */
'use strict';

var _     = require('underscore');
var React = require('react');

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
            <a key={this.slugify(resource.name)} className="main-nav__link">
                <li className="main-nav__item">
                    {resource.name}
                </li>
            </a>
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
                <a className='main-nav__link'>
                    <li key={'c-'+this.slugify(categoryName)} className='main-nav__item main-nav__item--bold'>
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
        var logo = this.props.logo ? this.props.logo : '/images/logos/logomark.svg';

        return (
            <div className="main-nav__wrapper">
                <div className="header__back-link">
                    <a className="back-link" href="/">&lt; Back to API List</a>
                </div>
                <div className="header__branding">
                    <a href={'/' + this.props.slug}>
                        <img className="branding" src={logo} alt={this.props.name} />
                    </a>
                </div>
                <ul className="main-nav">
                    {this.buildNavList()}
                </ul>

            </div>
        );
    }
});
