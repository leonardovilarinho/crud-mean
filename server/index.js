require('dotenv').load()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')

/* Inicia a aplicação apenas se o banco de dados estiver disponível */
mongoose.connect(process.env.MONGODB_URI, err => {
  if (err) throw err

  const app = express()
  app.use(bodyParser.json())

  routes(app)

  app.listen(process.env.PORT || 3000, () => console.log('App done!'))
})
