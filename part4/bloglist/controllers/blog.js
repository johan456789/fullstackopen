const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/blogs', (request, response, next) => {
  const body = request.body
  if (!body.likes) {
    body.likes = 0
  } else if (!body.title && !body.url) {
    response.status(400).end()
    return
  }
  const blog = new Blog(body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogRouter