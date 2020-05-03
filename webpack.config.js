'use strict'
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
  mode: 'production',
  watch: process.env.NODE_ENV === 'development',
  entry: [
    './frontend/app.js'
  ],
  output: {
    path: path.join(__dirname, 'static'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin() //applies other loades (like scss) to elements inside Vue files
  ]
}