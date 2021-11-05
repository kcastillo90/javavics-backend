//------------ DEPENDENCIES --------------//
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')

//------------ CONFIGURATION --------------//
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT || 3003

//------------ MIDDLEWARE --------------//
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)

//------------ CONTROLLERS --------------//
const jVController = require('./controllers/javaVics.js')
app.use('/', jVController)

//------------ DATABASE --------------//
// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI = 'mongodb://localhost:27017/javaVics'
mongoose.connect(MONGODB_URI)

//------------ ERROR/SUCCESS --------------//
db.on('error', (err) => console.log(err.message + ' is mongo not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))

//------------ LISTENER --------------//
app.listen(PORT, () => {
  console.log(`🍀Listening on ${PORT}...🍀`)
})
