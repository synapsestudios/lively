/** @jsx React.DOM */
/* global window */
'use strict';

var _          = require('underscore');
var React      = require('react');
var Fluxxor    = require('fluxxor');
var dispatcher = require('synapse-common/lib/dispatcher');
var Resource   = require('./resource');
var slugifier  = require('../../util/slug-helper').getSlugFromResource;

module.exports = React.createClass({

    displayName : 'ApiResource',

    propTypes : {
        apiConfig : React.PropTypes.object.isRequired
    },

    getResourceConfigFromSplat : function(splat, resources)
    {
        var resource;
        var component = this;
        var title     = [this.props.apiConfig.name, 'Lively Docs'];

        for (var i = 0; i < splat.length; i++) {
            resource = _.find(resources, function(resource) {
                return slugifier(resource) === splat[i];
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
        resource  = this.getResourceConfigFromSplat(splat, this.props.apiConfig.resources);

        if (resource) {
            window.document.title = resource.title;
            resourceComponent = (
                <Resource name={resource.name}
                    synopsis={resource.synopsis}
                    methods={resource.methods}
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
