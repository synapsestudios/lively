Upgrade Guide
=============

Pre-0.4.0 -> 0.4.0
------------------

### Move logos and API summaries into Assets file

Due to differences in Gulp and Webpack, (and the way Lively performs OAuth authorization code exchanges,) logo files and summary markdown files had to be moved to a separate configuration file:

##### Pre-0.4.0:

```JavaScript
// application/config/config.your-application.js
'use strict';

var fs      = require('fs');
var marked  = require('marked');
var summary = fs.readFileSync(__dirname + '/github/summary.md').toString();

module.exports = {
    // ...

    'logo'    : '/images/logos/github-mark.png',
    'summary' : marked(summary),

    'api'     : {
    // ...
};
```

##### 0.4.0:

```JavaScript
// application/assets.js
'use strict';

module.exports = {
    apis : {
        github : {
            logo     : require('../media/images/logos/github-mark.png'),
            summary  : require('./config/github/summary.md')
        }
    }
};
```

Notice a couple of things:

1. The keys in the properties of the `apis` config object must match in your `config.js` and `assets.js` files. If your api's slug is `github` in `config.js`, it must be the same in `assets.js`.
1. You can (and should) directly require the image and markdown files in your configuration. Thanks to Webpack's plugin system for enabling this elegant asset loading functionality.

Support for endpoint and sub-section synopses have been removed for now in order to avoid adding unnecessary complexity. They may be added back if there is demand.
