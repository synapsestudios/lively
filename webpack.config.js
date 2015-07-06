var Webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpack       = require('html-webpack-plugin');
var WebpackError      = require('webpack-error-notification');
var path              = require('path');

var environment = (process.env.APP_ENV || 'development');
var bowerPath   = path.resolve(__dirname, 'bower_components');
var npmPath     = path.resolve(__dirname, 'node_modules');

var config      = {
    entry   : [
        'webpack/hot/dev-server',
        './application/bootstrap.js'
    ],
    plugins : [
        new ExtractTextPlugin('app.css', {allChunks : true}),
        new HtmlWebpack({template : './application/index.html'}),
        new Webpack.DefinePlugin({
            __BACKEND__     : '\'' + process.env.BACKEND + '\'',
            __ENVIRONMENT__ : '\'' + environment + '\''
        })
    ],
    reactLoaders : ['jsx?insertPragma=React.DOM'],
    sassOptions  : (
        '?outputStyle=' + (environment === 'production' ? 'compressed' : 'nested') +
        '&includePaths[]=' + bowerPath +
        '&includePaths[]=' + npmPath
    )
};

if (environment === 'development' || environment === 'qa') {
    config.entry = [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:9001'
    ].concat(config.entry);

    config.reactLoaders = ['react-hot'].concat(config.reactLoaders);

    config.plugins.push(new Webpack.HotModuleReplacementPlugin());

    if (process.platform !== 'win32') {
        config.plugins.push(new WebpackError(process.platform));
    }
}

module.exports = {
    name   : 'browser bundle',
    entry  : config.entry,
    output : {
        filename : 'app.js',
        path     : path.resolve(__dirname, 'build'),
    },
    module : {
        preLoaders : [
            {
                test    : /\.js$/,
                loader  : 'jshint-loader',
                exclude : [npmPath, bowerPath]
            },
            {
                test    : /\.jsx$/,
                loader  : 'jsxhint-loader',
                exclude : [npmPath, bowerPath]
            }
        ],
        loaders : [
            {
                test   : /\.(eot|ico|jpg|png|svg|ttf|woff|woff2)$/,
                loader : 'file-loader',
                query  : {
                    name    : '[path][name].[ext]',
                    context : './media/'
                }
            },
            {
                test    : /\.jsx$/,
                loaders : config.reactLoaders,
                exclude : npmPath
            },
            {
                test   : /\.json$/,
                loader : 'json-loader'
            },
            {
                test   : /\.scss$/,
                loader : ExtractTextPlugin.extract(
                    'style-loader',
                    'css!autoprefixer!sass' + config.sassOptions
                )
            },
            {
                test   : /\.md$/,
                loader : 'html!markdown'
            }
        ]
    },
    plugins : config.plugins,
    resolve : {
        extensions : ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js']
    },
    devtool : '#inline-source-map',
    jshint : {
        globalstrict : true
    }
};
