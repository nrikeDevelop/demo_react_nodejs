const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors')

// import rotues
const constants = require('./common/constants.js')
const indexRoutes = require('./routes/index.js')

// db connection
mongoose
  .connect(constants.URL_MONGO)
  .then(db => console.log('db connected'))
  .catch(err => console.log(err))

// settings
app.set('port', process.env.PORT || 3017)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use('/', indexRoutes)

// start server
app.listen(app.get('port'), () => {
  console.log('server on port ' + app.get('port'))
})
