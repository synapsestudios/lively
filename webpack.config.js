var Webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpack       = require('html-webpack-plugin');
var WebpackError      = require('webpack-error-notification');

var environment = (process.env.APP_ENV || 'development');

var config      = {
    entry   : ['./application/bootstrap.js'],
    plugins : [
        new ExtractTextPlugin('app.css', {allChunks : true}),
        new HtmlWebpack({template : './application/index.html'}),
        new Webpack.DefinePlugin({
            __BACKEND__     : process.env.BACKEND,
            __ENVIRONMENT__ : '\'' + environment + '\''
        })
    ],
    reactLoaders : ['jsx?insertPragma=React.DOM'],
    sassOptions  : (
        '?outputStyle=' + (environment === 'production' ? 'compressed' : 'nested') +
        '&includePaths[]=' + __dirname + '/node_modules'
    )
};

if (environment === 'development') {
    config.entry = [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:9000'
    ].concat(config.entry);

    config.reactLoaders = ['react-hot'].concat(config.reactLoaders);

    config.plugins = config.plugins.concat([
        new Webpack.HotModuleReplacementPlugin(),
        new WebpackError(process.platform)
    ]);
}

module.exports = {
    name   : 'browser bundle',
    entry  : config.entry,
    output : {
        filename : 'app.js',
        path     : __dirname + '/build'
    },
    module : {
        preLoaders : [
            {
                test    : /\.js?/,
                loader  : 'jshint-loader',
                exclude : __dirname + '/node_modules'
            },
            {
                test    : /\.jsx?/,
                loader  : 'jsxhint-loader',
                exclude : __dirname + '/node_modules'
            }
        ],
        loaders : [
            {
                test   : /\.(ico|jpg|png)$/,
                loader : 'file-loader',
                query  : {name : '[path][name].[ext]?[hash]'}
            },
            {
                test    : /\.(js|jsx)$/,
                loaders : config.reactLoaders,
                exclude : /node_modules/
            },
            {
                test   : /\.json$/,
                loader : 'json-loader'
            },
            {
                test   : /\.scss$/,
                loader : ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!sass-loader' + config.sassOptions
                )
            }
        ]
    },
    plugins : config.plugins,
    resolve : {
        extensions : ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js']
    },
    devtool : '#inline-source-map',
};
