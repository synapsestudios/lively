'use strict';

var Router        = require('react-router');

var React         = require('react');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App           = require('./ui/pages/app');
var ApiListPage   = require('./ui/pages/api-list');
var ApiPage       = require('./ui/pages/api');

var ApiSummary    = require('./ui/components/api-summary');
var ApiResource   = require('./ui/components/api-resource');

module.exports = (
    <Route handler={App} path='/'>
        <Route name='api' path=':apiSlug' handler={ApiPage}>
            <Route        name='api-resource' handler={ApiResource} path='*' />
            <DefaultRoute name='api-summary'  handler={ApiSummary} />
        </Route>
        <DefaultRoute name='api-list' handler={ApiListPage} />
    </Route>
);
