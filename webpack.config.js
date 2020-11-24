const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].css'
    })
];

module.exports = (env, argv) => {
    let isDev = argv.mode === 'development';

    let conf = {
        plugins,
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, './dist/'),
            filename: '[name].js',
            publicPath: 'dist/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                "@babel/plugin-transform-react-jsx",
                                [ "@babel/plugin-proposal-decorators", { "legacy": true } ],
                                 [ "@babel/plugin-proposal-class-properties", { "loose" : true } ]
                            ]
                        }
                    }
                },
                {
                    test: /\.module\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName: '[local]__[sha1:hash:hex:7]'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /^((?!\.module).)*css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                }
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        devServer: {
            historyApiFallback: true,
            overlay: true,
            proxy: {
                '/reactcourseapi/**': {
                    target: 'http://faceprog.ru',
                    secure: false,
                    changeOrigin: true
                }
            }
        },
        devtool: isDev ? 'eval-cheap-module-source-map' : 'none',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: `chunk-vendors`,
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: 'initial'
                    },
                    common: {
                        name: `chunk-common`,
                        minChunks: 2,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true
                    }
                }
            }
        }
    }

    return conf;
}
