const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4167,
        open: true,
        hot: true,
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.ts']
  },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                        MiniCssExtractPlugin.loader,
                      //  'style-loader',
                        'css-loader',
                        'sass-loader',
                ]
              },
            {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env',
                            '@babel/preset-typescript'
                  ],
                }
              }
            }
          ]

    }
}