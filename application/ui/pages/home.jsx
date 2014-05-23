/** @jsx React.DOM */
'use strict';

var React    = require('react');
var Resource = require('../components/resource');

module.exports = React.createClass({

    displayName : 'HomeModule',

    getDefaultProps : function()
    {
        return {
            resources : [
                {
                    name : 'OAuth Resources',
                    methods : [
                        {
                            name     : 'authorize',
                            synopsis : 'Authorize via OAuth',
                            method   : 'GET',
                            uri      : '/oauth/authorize',
                            oauth    : false,
                            params   : [
                                {
                                    name : 'username',
                                    required : true,
                                    defaultValue : '',
                                    type : 'string',
                                    description: 'User\'s username'
                                },
                                {
                                    name : 'password',
                                    required : true,
                                    defaultValue : '',
                                    type : 'string',
                                    description: 'User\'s password'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },

    render : function()
    {
        var resources = this.props.resources.map(function(resource) {
            return (
                <Resource name={resource.name} methods={resource.methods} />
            );
        });

        return (
            <div>
                {resources}
            </div>
        );
    }

});
