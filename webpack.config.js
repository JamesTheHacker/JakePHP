const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let TARGET = process.env.ENV_MODE;

let common = {
  entry: [
    './entry.js'
  ],
  output: {
    path: path.join(__dirname, '/app/public'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'react'
          ]
        }
      }
    ]
  },
  postcss: [
    require('postcss-import'),
    require('postcss-custom-media'),
    require('postcss-nested'),
    require('precss'),
    require('lost'),
    require('autoprefixer')({
      browsers: 'last 2 version'
    })
  ]
};

if(TARGET == 'dev') {
  module.exports = merge(common, {
    entry: [
      'webpack/hot/only-dev-server'
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: [
            'style-loader',
            'css-loader?importLoaders=1',
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      hot: true,
      inline: true,
      contentBase: path.join(__dirname, '/app/public'),
      proxy: {
        '*': {
          target: 'http://localhost:8000',
          secure: false
        }
      }
    }
  });
} else {
  module.exports = merge(common, {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader')
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        },
        mangle: {
          except: ['$super', '$', 'exports', 'require']
        },
        output: {
          comments: false
        }
      }),
      new ExtractTextPlugin("app.css")
    ]
  });
}
