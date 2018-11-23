const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
          ]
        },
      },
    ];
    if (preProcessor) {
        if (Array.isArray(preProcessor)) {
            for (let i = 0; i < preProcessor.length; i++) {
              const element = preProcessor[i];
      
              if (typeof(element) === 'string') {
                loaders.push(require.resolve(element));
              } else {
                  loaders.push(Object.assign(element, {
                    loader: require.resolve(element.loader)
                  }));
              }
            }
        } else {
            loaders.push(require.resolve(preProcessor));
        }
    }
    return loaders;
  };

const config = {
    entry: {
        app: [
            './src/main.js',
            './src/style.scss'
        ]
    },
    node: {
        fs: 'empty'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
    },
    devtool: "source-map",
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
                use: [
                    require.resolve('babel-loader'),
                ],
                enforce: "pre"
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /\.module\.s[ac]ss$/,
                loader: getStyleLoaders({ importLoaders: 2 }, [
                  'sass-loader',
                  {
                    loader: "sass-resources-loader",
                    options: {
                      resources: require(path.join(process.cwd(), "src/sass/utils.js")),
                    }
                  }
                ]),
                sideEffects: true,
            },
            {
                test: /\.module\.s[ac]ss$/,
                use: getStyleLoaders(
                    {
                        importLoaders: 2,
                        modules: true,
                        getLocalIdent: getCSSModuleLocalIdent,
                    },
                    [
                        'sass-loader',
                        {
                            loader: "sass-resources-loader",
                            options: {
                                resources: require(path.join(process.cwd(), "src/sass/utils.js")),
                            }
                        }
                    ]
                ),
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
            template: 'src/html/index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[name].chunk.css',
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