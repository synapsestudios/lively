/* global window */
'use strict';

var _         = require('underscore');
var React     = require('react');
var Resource  = require('./resource');
var slugifier = require('../../util/slug-helper').getSlugFromResource;
var Router    = require('react-router');

module.exports = React.createClass({

    displayName : 'ApiResource',

    mixins : [Router.State],

    propTypes : {
        apiConfig : React.PropTypes.object.isRequired
    },

    getResourceConfig : function()
    {
        var resources, splat, resource, title, findCallback;

        resources = this.props.apiConfig.resources;
        splat     = this.getParams().splat.split('/');

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
        var resource, resourceComponent;

        resource = this.getResourceConfig();

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
