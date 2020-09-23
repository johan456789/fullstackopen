const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const app = express()
const blogRouter = require('./controllers/blog')

app.use(cors())
app.use(express.json())
app.use('/api', blogRouter)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('Error connection to MongoDB:', error.message)
  })

module.exports = app