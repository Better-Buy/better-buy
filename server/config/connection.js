//creating a mongoose connection.
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = process.env.PORT || 3000

const URI = process.env.MONGODB_URI

mongoose.connect(
  URI || 'mongodb://localhost/Better-Buy',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err
    console.log('Connected to MongoDB!!!')
  }
)

module.exports = mongoose.connection
