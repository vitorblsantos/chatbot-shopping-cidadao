'use strict'

const BundleTracker = require('webpack-bundle-tracker')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname),
    stats: 'errors-only'
  },
  entry: path.resolve(__dirname, './client/index.js'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          path.resolve(__dirname, './build/'),
          path.resolve(__dirname, './node_modules/'),
          path.resolve(__dirname, './test/')
        ],
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: ['@babel/transform-runtime'],
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `${packageName.replace('@', '')}`
          }
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, './build/client/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/src/index.html')
    }),
    new BundleTracker({ filename: 'webpack-stats.json' }),
    new WebpackManifestPlugin({ filename: 'manifest.json' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
