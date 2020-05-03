const {ipcMain} = require('electron')
const hyperswarm = require('hyperswarm')
const hypercore = require('hypercore')
const core = require('hypercore')

module.exports = function initialize() {
  registerEvents()
}

/* eslint-disable no-unused-vars */
function registerEvents() {
  ipcMain.on('create-game', (event, arg) => {
    createHypercore().then(feed => {
      console.log(feed.key.toString('hex'))
    })
  })
}

function createHypercore() {
  var feed = hypercore('./game-data', {valueEncoding: 'json', overwrite: true})

  return new Promise(function(resolve, reject) {
    feed.on('ready', function() {
      resolve(feed)
    })
  })
}