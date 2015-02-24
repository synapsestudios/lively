var WebpackDevServer = require('webpack-dev-server');
var webpack          = require('webpack');
var config           = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    contentBase : __dirname + '/build',
    hot         : true,
    noInfo      : true
}).listen(9000, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:9000');
});
