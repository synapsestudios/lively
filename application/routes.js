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

module.exports = (
    new Routes({location: "history"},
        new Route({name: "app", path: "/", handler: App},
            new Route({name: "api", path: ":apiSlug", handler: ApiPage, flux: flux},
                new Route({name: "api-resource", path: "*", handler: ApiResource}),
                new DefaultRoute({name: "api-summary", handler: ApiSummary})
            ),
            new DefaultRoute({name: "api-list", handler: ApiListPage}),
            new NotFoundRoute({name: "not-found", handler: NotFoundPage})
        )
    )
);
