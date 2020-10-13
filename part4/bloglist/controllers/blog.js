const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

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
  const decodedToken = jwt.verify(token, process.env.SECRET)
  try {
    const token = getTokenFrom(request)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!body.likes) {
      body.likes = 0
    } else if (!body.title || !body.url) {
      return response.status(400).end()
    }
    body.user = decodedToken._id

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