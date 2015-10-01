# Lively Docs

### Initializing the Development Environment

1. `npm install`
1. `bower install`
1. `cp application/config.dist.js application/config.js`
1. `npm install -g webpack`
1. `npm start` to build the app and launch a server at `localhost:9000`
    - Use `npm run windows` to build and launch the app on Windows

## Configuration

### Top Level Configuration

The top level configuration for Lively is stored at `application/config.js`. An example is provided in `application/config.dist.js` and below:

```JavaScript
{
    lively : {
        hostname : 'localhost',
        port     : 9001
    },
    apis : {
        github : require('./config/config.github')
    }
}
```

### Asset Configuration

A summary and logo can be associated with an API using the assets file at `application/assets.js`. An example is provided in `application/assets.dist.js` and below:

```JavaScript
{
    apis : {
        github : {
            logo     : require('../media/images/logos/github-mark.png'),
            summary  : require('./config/github/summary.md')
        }
    }
}
```

- **logo**: A `string` containing a valid path to an image to display for the logo
- **summary**: A `string` containing the summary that will be displayed by default when you click on an API

Note that PNG and Markdown files can be required directly, thanks to Webpack's file and markdown loaders.

The application is initialized with an empty assets file by default, in the case that no assets exist.

#### lively

The `lively` configuration block defines the app's behavior.

- **hostname**: A `string` containing the hostname where Lively will be installed
- **port**: An `integer` containing the port for Lively to listen on

#### apis

The `apis` configuration block tells Lively where to find configuration files for the APIs you want to use with it. The recommended structure for these is to create folders in `application/config` for each API and use `require()` to include them (see example above).

### API Configuration

Each API has a configuration that tells Lively how to make requests and what endpoints are available. An example of implementing an API configuration for GitHub is provided at `application/config/config.github.js`.

```
{
    'name'    : 'GitHub v3 API',
    'api'     : {
        'hostname' : 'api.github.com',
        'port'     : 443,
        'secure'   : true
    },
    'oauth2' : {
        'type'         : 'authorization-code',
        'hostname'     : 'github.com',
        'port'         : 443,
        'secure'       : true,
        'authorizeUrl' : '/login/oauth/authorize',
        'tokenUrl'     : '/login/oauth/access_token',
        'tokenParam'   : 'token'
    },
    'resources' : [
        require('./github/activity'),
        require('./github/gists'),
        require('./github/git_data'),
        {...}
    ]
}
```

- **name**: A `string` containing the display name for the API.
- **api**: An `Object` containing connection details for API calls (see below)
- **oauth2**: An `Object` containing the connection and authentication  information for OAuth2 APIs (see below)
- **resources**: An array of `Object` containing a resource configuration object for each resource. Resources can be nested arbitrarily deep, see the resource configuration section for more details. The recommended structure is to create folders for each top level resource inside your API configuration folder.

#### api

- **hostname**: A `string` containing the hostname of the API server
- **port**: An `integer` containing the port of the API server
- **secure**: A `bool` (`true` or `false`) that determines whether HTTPS is used

#### oauth2

- **type**: A `string` containing the string 'authorization-code'
- **hostname**: A `string` containing the hostname of the OAuth2 server
- **port**: An `integer` containing the port of the OAuth2 server
- **secure**: A `bool` (`true` or `false`) that determines whether HTTPS is used
- **authorizeUrl**: A `string` containing the path to the OAuth2 authorization endpoint, which will be appended to the hostname
- **tokenUrl**: A `string` containing the path to the OAuth2 access token endpoint, which will be appended to the hostname.
- **tokenParam**: A `string` representing the argument given in the Authorization header, some APIs (including GitHub) need this overridden. *Default:* `Bearer`

### Resource Configuration

An API is made up of multiple resources. Each resource has a list of endpoints that can be called on it. There are many example resources provided with the GitHub API configuration.

```
{
    name      : 'Activity',
    slug      : 'activity',
    synopsis  : 'This is a read-only API to the GitHub events.',
    endpoints : [
        {...},
        {...}
    ],
    resources : [
        {...},
        {...}
    ]
}
```

- **name**: A `string` containing the display name of this resource
- **slug**: A `string` containing the slug for this resource's URL. If this is left undefined, a slugified version of `name` will be used instead.
- **synopsis**: A `string` containing the static text to be displayed on the resource page. This can be used for static pages (for example, a category description) or to display a short summary for endpoints. If this is left undefined, no synopsis will be displayed.
- **endpoints**: An array of `Object` containing endpoint objects to display on the page. See below for more on defining endpoints. If no endpoints are given, no endpoints will be displayed.
- **resources**: An array of `Object` containing additional resources which will nest below this one. Resources may be nested arbitrarily deep but the recommendation is to not go below a depth of 3.

### Endpoint Configuration

```
{
    name     : 'List repository events',
    synopsis : 'This endpoint lists repository events',
    method   : 'GET',
    uri      : '/repos/:owner/:repo/events',
    oauth    : false,
    bodyType : 'json-object',
    params   : [
        {
            name        : 'owner',
            required    : true,
            type        : 'string',
            location    : 'uri', // This tells Lively to match :owner in the endpoint's URI
            description : 'The owner of the repo.'
        },
        {...}
    ]
}
```

- **name**: A `string` containing the display name of this endpoint
- **synopsis**: A `string` containing the static text to be displayed in the endpoint dropdown. If this is left undefined, no synopsis will be displayed.
- **method**: A `string` containing the HTTP method to be used for the request.
- **uri**: A `string` containing the path of the endpoint. Parts that are prefixed with `:` will be filled in by the `param` with the same name and its `location` set to `uri`. See below for more details on `params`.
- **oauth**: A `bool` (`true` or `false`) which determines whether or not this request defaults to using oauth or unauthenticated.
- **bodyType**: A `string` containing the body type the request should contain.  Default is `json-object`, only alternate at this time is `json-param`, which will use the contents of the remaining body `param` as the request body.
- **rootParam**: A `string` containing the name of the parameter which will be used as the body request.  This option is only available when `bodyType = 'json-param'`.
- **params**: An array of `Object` containing parameter objects which this endpoint can accept. See below for details.

### Param Configuration

`string` example:
```
{
    name         : 'owner',
    required     : true,
    type         : 'string',
    location     : 'uri',
    defaultValue : 'synapsestudios',
    description  : 'The owner of the repo.'
}
```

`object` example:
```
{
    name         : 'thing',
    required     : true,
    type         : 'object',
    description  : 'a set of properties defining a thing.',
    params       : [
        {
            name         : 'owner',
            required     : true,
            type         : 'string',
            defaultValue : 'synapsestudios',
            description  : 'The owner of the repo.'
        }
    ]
}
```

`array` example:
```
{
    name         : 'owners',
    required     : true,
    type         : 'array',
    location     : 'An array of owners.',
    param       : {
        name         : 'owner',
        type         : 'string',
        defaultValue : 'synapsestudios',
        description  : 'The owner of the repo.'
    }
}
```


- **name**: A `string` containing the key or name of this parameter that will be sent in the request body or injected into the URI.
- **required**: A `bool` (`true` or `false`) which flags this parameter as required.  `required` is not used in an `array` parameter as they may just be removed.
- **type**: A `string` containing one of: `string`, `integer`, `float`, `checkbox`, `boolean`, `resumable-upload`, `object`, `array`, `stripe_token`, `custom-object`, or `enum`.
  - `object` will require a child set of `params`, defined like a top-level list of params.  An `object` param's `location` must be "body" and should not be used in `GET` requests.
  - `array` will require a child `param`, which is a single object (see example)
  - `custom-object` will allow the user to create objects with arbitrary keys and values, including child objects.
  - If `enum`, specify `enumValues` property on param containing an array of strings to display as options to the user.
- **location**: A `string` containing one of `header`, `body`, `uri` or `query`. If the param is named in the endpoint's URI, Lively will ignore the stated location. *Default:* `body` unless param is named in URI, then `uri`.
- **defaultValue**: A `string`, `bool`, or `array` depending on what `type` is set. The default value to display in the param.
- **description**: A `string` containing a short description of the parameter.
