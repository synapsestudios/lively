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
                                },
                                {
                                    name        : 'aBool',
                                    required    : true,
                                    type        : 'bool',
                                    description : 'some boolean value'
                                },
                                {
                                    name        : 'anEnum',
                                    required    : true,
                                    type        : 'enum',
                                    description : 'a list of possible values',
                                    enumValues  : [
                                        'foo',
                                        'bar',
                                        'baz'
                                    ]
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
        var resources = this.props.resources.map(function(resource, idx) {
            return (
                <Resource key={idx}
                          name={resource.name}
                          methods={resource.methods} />
            );
        });

        return (
            <div>
                {resources}
            </div>
        );
    }

});
