'use strict'

const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  entry: './client/index.js',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          resolve(__dirname, 'build'),
          resolve(__dirname, 'node_modules')
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
          name: 'images/[name].[ext]'
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
    minimize: true,
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
    filename: '[hash].bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/'
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      favicon: './client/src/images/logo.svg',
      filename: 'index.html',
      minify: {
        removeComments: true
      },
      template: resolve(__dirname, './client/src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[hash].css'
    }),
    new WebpackManifestPlugin({ filename: 'manifest.json' })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  }
}
