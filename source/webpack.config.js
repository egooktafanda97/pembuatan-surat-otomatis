const webpack = require('webpack');
const path = require('path');

const fx = require('./function/fx');

module.exports = {
  entry: {
    script: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../js/'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.json5$/i,
        loader: 'json',
        options: {
          esModule: true,
        },
        type: 'javascript/auto',
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new webpack.DefinePlugin({
      _: fx,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', 'scss', 'css', '.json'],
  },
};
