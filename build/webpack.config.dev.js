'use strict'
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: [
    './frontend/app.js'
  ],
  output: {
    path: path.join(__dirname + '/..', 'static'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}