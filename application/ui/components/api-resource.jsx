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

    getResourceConfigFromSplat : function(splat, resources)
    {
        var resource;
        var component = this;
        var title     = [this.props.config.name, 'Lively Docs'];

        for (var i = 0; i < splat.length; i++) {
            resource = _.find(resources, function(resource) {
                var slug = resource.slug;

                if (_.isUndefined(slug)) {
                    slug = component.slugify(resource.name);
                }

                return slug === splat[i];
            });

            if (_.isUndefined(resource) ) {
                return;
            }

            title.unshift(resource.name);
            resources = resource.resources;
        }

        resource.title = title.join(' | ');
        return resource;
    },

    renderResourceComponent : function()
    {
        var component, splat, resource, resourceComponent;

        component = this;
        splat     = this.props.params.splat.split('/');
        resource  = this.getResourceConfigFromSplat(splat, this.props.config.resources);

        if (resource) {
            window.document.title = resource.title;
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
