var WebpackDevServer = require('webpack-dev-server');
var webpack          = require('webpack');
var config           = require('./webpack.config');
var path             = require('path');

new WebpackDevServer(webpack(config), {
    contentBase        : path.resolve(__dirname + '/build'),
    hot                : true,
    noInfo             : true,
    historyApiFallback : true
}).listen(9001, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:9001');
});
