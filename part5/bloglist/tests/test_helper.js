const User = require('../models/user')

const initialUser = {
  blogs: [],
  username: 'Test user',
  name: 'Test name',
  passwordHash: '$2b$10$NB45rENioPVTHtSsM35VcuJKRZ2.l5vhclyPoYnpXce6Bmz3wSlK2'
  // password: "not_random_insecure_password"
}

const initialUserLoginInfo = {
  username: 'Test user',
  password: 'not_random_insecure_password'
}

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
  initialUser,
  initialUserLoginInfo,
  initialBlogs,
  usersInDb
}