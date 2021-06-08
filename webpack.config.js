'use strict'

const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

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
          resolve(__dirname, './node_modules/')
        ],
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: ['@babel/transform-runtime'],
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.(ico|png|jpe?g|gif|webp)$/i,
        loader: 'file-loader',
        options: {
          name: 'build/client/images/[name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
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
    filename: '[contenthash].bundle.js',
    path: resolve(__dirname, './build/client/'),
    publicPath: '/'
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      favicon: './client/src/images/logo.svg',
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
