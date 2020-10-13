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
  } else if (!body.title || !body.url) {
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

blogRouter.put('/blogs/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const blogObject = {
    id: id,
    likes: body.likes
  }
  Blog.findByIdAndUpdate(id, blogObject, { new: true })
    .then(updatedBlog => response.json(updatedBlog))
    .catch(error => next(error))
})


blogRouter.delete('/blogs/:id', (request, response, next) => {
  const id = request.params.id

  Blog.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

module.exports = blogRouter