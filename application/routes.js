'use strict';

var Router        = require('react-router');

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
var config        = require('./config');

module.exports = (
    Routes({location: "history"},
        Route({name: "app", path: "/", handler: App, config: config},
            Route({name: "api", path: ":apiSlug", handler: ApiPage, config: config, flux: flux},
                Route({name: "api-resource", path: "*", handler: ApiResource, config: config}),
                DefaultRoute({name: "api-summary", handler: ApiSummary, config: config})
            ),
            DefaultRoute({name: "api-list", handler: ApiListPage, config: config}),
            NotFoundRoute({name: "not-found", handler: NotFoundPage})
        )
    )
);
