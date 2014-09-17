/** @jsx React.DOM */
'use strict';

var _          = require('underscore');
var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');
var Resource   = require('../components/resource');

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

    render : function()
    {
        var title, resource;

        title = [this.props.config.name, 'Lively Docs'];

        if (this.props.config.resources) {
            if (_.isArray(this.props.config.resources)) {
                resource = _.find(this.props.config.resources, this.findResource, this);
            } else {
                resource = _.find(this.getFlatResources(this.props.config.resources), this.findResource, this);
            }

            if (resource) {
                title.unshift(resource.name);
                this.resource = resource;
            }
        }

        window.document.title = title.join(' | ');

        return (
            <div className='panel__wrapper'>
                <Resource name={this.resource.name}
                    synopsis={this.resource.synopsis}
                    methods={this.resource.methods}
                    oauthStore={this.props.stores.oauth}
                />
            </div>
        );
    }

});
