const express = require('express')
const app = express()
const consola = require('consola')



const db = require('./db/db');
db.connect();


require('./routes/index')(app)

module.exports = {
  path: '/api',
  handler: app
}

