const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: [
            './src/js/main.js',
            './src/sass/style.scss'
        ]
    },

    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },

    module: {
        rules: [
            { 
                test: /\.html$/, 
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, './node_modules'),
                ],
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.eot|ttf|woff2?$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './img/[name].[ext]'
                        }
                    },

                    'img-loader'
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            publicPath: '/img/'
                        }
                    },
                    'svgo-loader'
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("[name].css"),
        new SpriteLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/html/main.html.js'
        }),
        // new PurifyCSSPlugin({
        //     paths: glob.sync(path.join(__dirname, 'index.html')),
        // }),
    ],

    optimization: {
        minimizer: []
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        // Plagins
        config.plugins.unshift(
            new CleanWebpackPlugin(['build'],
                {
                    root: __dirname,
                    verbose: true,
                    dry: false
                }
            )
        )
        config.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
            })
        );

        // Minimizing
        config.optimization.minimizer.push(
            new UglifyJsPlugin()
        );
    }

    return config;
};