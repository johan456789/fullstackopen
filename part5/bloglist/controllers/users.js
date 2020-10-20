const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// baseUrl: /api/users
usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.username.length < 3 || body.password.length < 3) {
      return response.status(400).json({ error:
        'Both username and password must be at least 3 characters long'
      }).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter