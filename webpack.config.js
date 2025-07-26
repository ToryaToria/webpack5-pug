
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const loader = require('sass-loader');


let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + '---mode')

module.exports = {
    mode: mode,
    output: {
        assetModuleFilename: 'assets/[name]_[hash][ext][query]',
        clean: true,
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),

        new HtmlWebpackPlugin({
            // template: "./src/index.html" 
            template: "./src/index.pug", // для работы с паг
        }),
    ],

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    (mode === "development") ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            //options
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|svg|jgp|gpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff2|woff|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /(node_modules|bower_components)/,
            },
        ]
    },
}
