require('dotenv').load()
const express = require('express')
const routes = require('./routes')

const app = express()
app.use(bodyParser.json())

routes(app)

const server = app.listen(process.env.PORT || 3000)
