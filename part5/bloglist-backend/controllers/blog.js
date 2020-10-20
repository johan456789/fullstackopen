const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/blogs', (request, response) => {
  Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/blogs', async (request, response, next) => {
  const body = request.body
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!body.likes) {
      body.likes = 0
    } else if (!body.title || !body.url) {
      return response.status(400).end()
    }
    body.user = decodedToken.id

    const user = await User.findById(decodedToken.id)
    const blog = new Blog(body)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/blogs/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const blogObject = {
    id: id,
    likes: body.likes
  }
  Blog.findByIdAndUpdate(id, blogObject, { new: true, useFindAndModify: false })
    .then(updatedBlog => response.json(updatedBlog))
    .catch(error => next(error))
})


blogRouter.delete('/blogs/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(id)
    if (blog.user.toString() === decodedToken.id.toString()) {
      const result = await Blog.findByIdAndDelete(id)
      const statusCode = result ? 204 : 404
      response.status(statusCode).end()
    } else {
      response.status(403).end()
    }
  } catch(error) {
    next(error)
  }
})

module.exports = blogRouter