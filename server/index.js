require('dotenv').load()
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
app.use(bodyParser.json())

routes(app)

app.listen(process.env.PORT || 3000)
