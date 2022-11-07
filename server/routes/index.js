const express = require('express')

const day = require('./day')
const subject = require('./subject')


module.exports = function(app) { 

  app.use(express.json());
  app.use(require('body-parser').urlencoded({ extended: true }));
 

  app.use('/day', day)
  app.use('/subject', subject)
}
