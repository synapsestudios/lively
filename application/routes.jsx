'use strict';

var Router        = require('react-router');

var React         = require('react');
var Route         = Router.Route;
var Routes        = Router.Routes;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App           = require('./ui/pages/app');
var NotFoundPage  = require('./ui/pages/404');
var ApiListPage   = require('./ui/pages/api-list');
var ApiPage       = require('./ui/pages/api');

var ApiSummary    = require('./ui/components/api-summary');
var ApiResource   = require('./ui/components/api-resource');

var flux          = require('./flux');

module.exports = (
    <Route name={"app"} path={"/"} handler={App}>
        <Route name={"api"} path={":apiSlug"} handler={ApiPage} flux={flux}>
            <Route name={"api-resource"} path={"*"} handler={ApiResource} />
            <DefaultRoute name={"api-summary"} handler={ApiSummary} />
        </Route>
        <DefaultRoute name={"api-list"} handler={ApiListPage} />
        <NotFoundRoute name={"not-found"} handler={NotFoundPage} />
    </Route>
);
