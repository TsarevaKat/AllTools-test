const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const WebpackFtpUpload = require('webpack-ftp-upload-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/dist'
  },
  devServer: {
    overlay: true,
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
    // new WebpackFtpUpload({
    //   host: '89.108.85.65',
    //   port: '22',
    //   username: 'katet771',
    //   password: 'pFvU80eRZl',
    //   local: path.join(__dirname, 'dist'),
    //   path: '/www/tsarevakat.ru/',
    // })
  ],
}