const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FetchWritePlugin = require('../dist/cjs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ENTRY = path.resolve(__dirname, 'index.js')

module.exports = {
  mode: 'development',
  entry: {
    simple1: ENTRY,
    simple2: ENTRY
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({ verbose: true }),
    new FetchWritePlugin([
      {
        fetchOpts: {
          url: 'http://localhost:4080/get/style',
          retryOn: true,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        output: {
          name: 'style.json',
          basePath: './static/bundle'
        }
      },
      {
        fetchOpts: {
          url: 'http://localhost:4080/get/name',
          retryOn: true,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        output: {
          name: 'name',
          ext: 'json'
        }
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ]
}
