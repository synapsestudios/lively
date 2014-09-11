/** @jsx React.DOM */
'use strict';

var _          = require('underscore');
var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');

var SiteHeader        = require('../layouts/header');

module.exports = React.createClass({
    displayName : 'App',

    render: function() {
        var header = <SiteHeader slug='test-slug' name='test name' logo='test' />;
        return (
            <div>
                {header}

                <this.props.activeRouteHandler/>
            </div>
        );
    }
});
