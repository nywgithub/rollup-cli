const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
var APP_DIR = path.resolve(__dirname, '../src');
var BUILD_DIR = path.resolve(__dirname, '../dist');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const pkj = require('../package.json');
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const entryDir = path.resolve(APP_DIR, './entry');

function getEntry(entryDir) {
    let entryMap = {};

    var getFile = function (pageDir) {
        fs.readdirSync(pageDir).forEach((pathname) => {
            let fullPathName = path.resolve(pageDir, pathname);
            let stat = fs.statSync(fullPathName);
            if (stat.isDirectory()) {
                getFile(fullPathName)
            }
            if (stat.isFile()) {
                let _arr = fullPathName.split('.');
                _arr.pop();
                let _tar = _arr.join('.');
                let _rel_tar = path.relative(entryDir, _tar)
                entryMap[_rel_tar] = fullPathName;
            }

        });
    }
    getFile(entryDir);
    return entryMap;
}



module.exports = {
    entry: {
        'future': path.resolve(APP_DIR, './future.ts'),
        'style/future': path.resolve(APP_DIR, './style/future.ts'),
        'style/future-pure': path.resolve(APP_DIR, './style/future-pure.ts'),
        'style/future-simple': path.resolve(APP_DIR, './style/future-simple.ts'),
        'style/reset': path.resolve(APP_DIR, './style/reset.ts'),
        'style/fonts': path.resolve(APP_DIR, './style/fonts.ts'),
    },

    output: {
        library: "future",
        libraryTarget: "umd",
        path: BUILD_DIR,
        //publicPath: "//www.micstatic.com/xxxx/dist/",
        publicPath: "/",
        filename: '[name].js',
        chunkFilename: '[name].js?[chunkhash:8]'
    },
    externals: {
        $: 'window.$',
        template: 'window.template',
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                //exclude: /node_modules/,
                exclude: {
                    test: /node_modules/, // Exclude libraries in node_modules ...
                    not: [
                        // Except for a few of them that needs to be transpiled because they use modern syntax
                        /lit-html/,
                    ]
                },
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                //exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                //exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/i,
                //include: path.resolve(__dirname, '../lib/style'),
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]?[contenthash:8]',
                    outputPath: './assets/imgs',
                    publicPath: "../assets/imgs",
                    //publicPath: "//www.micstatic.com/xxx/imgs",
                    //emitFile:false
                }
            },
            {
                test: /\.(woff2?|woff|svg|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]?[contenthash:8]',
                    outputPath: './assets/fonts',
                    publicPath: "../assets/fonts",
                    limit: 8192
                }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            __WEBPACK_VERSION: JSON.stringify(pkj.version),
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css?[hash:8]',
            chunkFilename: "[name].css?[hash:8]"
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{
                from: 'src',
                globOptions: {
                    ignore: ["**.ts", "**.tsx", "**.html","**.scss",],
                },
            }, ],
        }),

    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.less', '.json'],
        alias: {}
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
}