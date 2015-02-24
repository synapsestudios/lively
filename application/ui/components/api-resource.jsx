/* global window */
'use strict';

var _          = require('underscore');
var React      = require('react');
var Resource   = require('./resource');
var slugifier  = require('../../util/slug-helper').getSlugFromResource;

module.exports = React.createClass({

    displayName : 'ApiResource',

    propTypes : {
        apiConfig : React.PropTypes.object.isRequired
    },

    getResourceConfigFromSplat : function(splat, resources)
    {
        var resource, title, findCallback;

        title = [this.props.apiConfig.name, 'Lively Docs'];

        // Avoid defining a function in a loop
        findCallback = function(resource) {
            return slugifier(resource) === splat[i];
        };

        for (var i = 0; i < splat.length; i += 1) {
            resource = _.find(resources, findCallback);

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
        resource  = this.getResourceConfigFromSplat(splat, this.props.apiConfig.resources);

        if (resource) {
            window.document.title = resource.title;

            resourceComponent = (
                <Resource
                    name       = {resource.name}
                    synopsis   = {resource.synopsis}
                    endpoints  = {_.isUndefined(resource.endpoints) ? resource.methods : resource.endpoints}
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
