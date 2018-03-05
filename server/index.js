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
  const distDir = __dirname + '../dist/'
  app.use(express.static(distDir))

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)

    next()
  })

  routes(app)

  app.listen(process.env.PORT || 3000, () => console.log('App done!'))
})
