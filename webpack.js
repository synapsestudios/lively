var path             = require('path');
var request          = require('request');
var WebpackDevServer = require('webpack-dev-server');
var webpack          = require('webpack');
var config           = require('./webpack.config');
var url              = require('url');

var server = new WebpackDevServer(webpack(config), {
    contentBase : path.resolve(__dirname, 'build'),
    hot         : true,
    noInfo      : true
});

server.use(function (req, res, next) {
    var ext = path.extname(req.url);

    if ((ext === '' || ext === '.html') && req.url !== '/') {
        req.pipe(request('http://' + req.hostname + ':9001')).pipe(res);
    } else {
        next();
    }
});

server.use(function (req, res, next) {
    var reqUrl = url.parse(req.url);
    if (reqUrl.pathname === '/oauth2-redirect') {
        require('./application/oauth2-proxy')(req, res);
    } else {
        next();
    }
});

server.listen(9001, function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:9001');
});
