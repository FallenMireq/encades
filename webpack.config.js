const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname, '.');

module.exports = () => {
    return {
        mode: 'production',
        resolve: {
            extensions: ['.ts', '.js'],
        },

        context: path.resolve(ROOT, 'src'),

        entry: {
            polyfills: ['./polyfills'],
            cadesplugin_api: ['./cadesplugin_api.js'],
            index: ['./index.ts'],
        },

        output: {
            path: path.resolve(ROOT, './dist'),
            library: 'encades',
            libraryTarget: 'window',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(ROOT, 'tsconfig.json'),
                            },
                        },
                    ],
                },
                {
                    test: /\.html/,
                    use: 'html-loader',
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], { root: ROOT }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(ROOT, 'src/index.html'),
            }),
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
    };
};
