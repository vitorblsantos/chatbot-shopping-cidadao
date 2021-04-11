'use strict'

const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const BundleTracker = require('webpack-bundle-tracker')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  entry: './client/index.js',
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          resolve(__dirname, './build/'),
          resolve(__dirname, './node_modules/'),
          resolve(__dirname, './test/')
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
    filename: '[name].bundle.js',
    path: resolve(__dirname, './build/client/'),
    publicPath: '/'
  },
  plugins: [
    new BundleTracker({ filename: 'webpack-stats.json' }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './client/src/index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new WebpackManifestPlugin({ filename: 'manifest.json' })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
