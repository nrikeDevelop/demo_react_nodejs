const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const fs = require('fs')
const News = require('../models/news')
const constants = require('./../common/constants.js')

router.get('/', (req, res) => {
  res.send({
    message: 'Api news demo',
    success: true
  })
})

router.get('/news', async (req, res) => {
  News.find({ archiveDate: null })
    .sort('date')
    .exec(function (err, result) {
      if (err) throw err
      res.send({
        message: result,
        success: true
      })
    })
})

router.get('/archive', async (req, res) => {
  News.find({ archiveDate: { $ne: null } })
    .sort('-archiveDate')
    .exec(function (err, result) {
      if (err) throw err
      res.send({
        message: result,
        success: true
      })
    })
})

router.get('/update/:id', async (req, res) => {
  const { id } = req.params
  News.update({ _id: id }, { archiveDate: new Date().getTime() }, function (
    err,
    response
  ) {
    if (err) throw err
    res.send({
      message: 'Item updated correctly ',
      success: true
    })
  })
})

router.get('/trash/:id', async (req, res) => {
  const { id } = req.params
  News.remove({ _id: id }, function (err, response) {
    if (err) throw err
    res.send({
      message: 'Item removed correctly ',
      success: true
    })
  })
})

router.get('/restore', (req, response) => {
  MongoClient.connect(
    constants.URL_MONGO,
    function (err, db) {
      if (err) throw err

      fs.readFile(__dirname + '/../assets/db.json', 'UTF-8', function (
        err,
        data
      ) {
        var news = JSON.parse(data)
        if (err) throw err
        var dbo = db.db('news_demo')
        dbo.collection('news').insertMany(news, function (err, res) {
          if (err) throw err
          response.send({
            message: 'Items has been restored correctly',
            success: true
          })
          db.close()
        })
      })
    }
  )
})

module.exports = router
