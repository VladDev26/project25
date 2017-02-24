const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoprefixer = require('autoprefixer');

const production = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});


module.exports = {
  entry: path.resolve(__dirname + '/src/index.js'),
  output: {
    path: path.join(__dirname, "assets"),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  
  module: {
    rules: [
      { 
        test: /\.scss$/i, 
        use: ExtractTextPlugin.extract([
          'css-loader', 
          'sass-loader',
          {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
          }
        ])
      },

      { 
        test: /.*\.(gif|png|jpg)$/i, 
        loader: "file-loader?name=img/[name].[ext]"
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles/bundle.min.css')
  ]
};
