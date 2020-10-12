const User = require('../models/user')


const initialBlogs = [
  {
    title: 'Test',
    author: 'No name',
    url: 'https://example.com',
    likes: 999
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  usersInDb
}