/** @jsx React.DOM */
'use strict';

var _          = require('underscore');
var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');
var Resource   = require('./resource');

module.exports = React.createClass({

    displayName : 'ApiResource',

    propTypes : {
        config : React.PropTypes.object.isRequired
    },

    slugify : function(text)
    {
        return text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    },

    findResource : function(resource)
    {
        if (this.slugify(resource.name) === this.props.params.resourceSlug) {
            return true;
        }
    },

    getFlatResources : function(categories)
    {
        var resources = [];

        _.each(categories, function(category) {
            resources = resources.concat(category);
        });

        return resources;
    },

    renderResourceComponent : function()
    {
        var resource, resourceComponent, title;

        title = [this.props.config.name, 'Lively Docs'];
        window.document.title = title.join(' | ');

        if (_.isArray(this.props.config.resources)) {
            resource = _.find(this.props.config.resources, this.findResource, this);
        } else {
            resource = _.find(this.getFlatResources(this.props.config.resources), this.findResource, this);
        }

        if (resource) {
            title.unshift(resource.name);
            window.document.title = title.join(' | ');
            resourceComponent = (
                <Resource name={resource.name}
                    synopsis={resource.synopsis}
                    methods={resource.methods}
                    oauthStore={this.props.stores.oauth}
                />
            );
        } else {
            resourceComponent = (
                <div className='panel'>
                    <h1>404 Not Found</h1>
                </div>
            );
        }

        return resourceComponent;
    },

    render : function()
    {
        return (
            <div className='panel__wrapper'>
                {this.renderResourceComponent()}
            </div>
        );
    }

});
