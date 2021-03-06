const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)
let initialUserID = null
let initialUserToken = null

const getInitialUserToken = async (api, { username, password }) => {
  const response = await api
    .post('/api/login')
    .send({ username: username, password: password })
  const token = response.body.token
  if (token) {
    return token
  } else {
    throw new Error(`${response.body.error}`)
  }
}

describe('when there is initially one blog post in db', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    // add initialUser
    let userObject = new User(helper.initialUser)
    await userObject.save()
    initialUserID = userObject._id

    // assuming all blogs are made by initialUser
    let blogIDs = []
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog({ ...blog, user: initialUserID })
      await blogObject.save()
      blogIDs.push(blogObject._id)
    }

    // add blog info to initialUser in DB
    User.findByIdAndUpdate(initialUserID, { blogs: blogIDs }, { new: true, useFindAndModify: false })
  })

  test('getting blog posts', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('check id property of 1st blog exists', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs[0].id).toBeDefined()
  })

  test('delete one blog post', async () => {
    // get initial blogs
    let response = await api.get('/api/blogs')
    let blogs = response.body
    const blogID = blogs[0].id
    const initialLength = blogs.length

    // delete one blog
    initialUserToken = await getInitialUserToken(api, helper.initialUserLoginInfo)
    await api
      .delete(`/api/blogs/${blogID}`)
      .set('Authorization', `bearer ${initialUserToken}`)
      .expect(204)

    // get updated blogs
    response = await api.get('/api/blogs')
    blogs = response.body
    let deletedBlog = blogs.filter(x => x.id === blogID)
    expect(blogs).toHaveLength(initialLength - 1)
    expect(deletedBlog).toEqual([])
  })

  test('update one blog likes', async () => {
    // get initial blogs
    let response = await api.get('/api/blogs')
    let blogs = response.body
    const blogID = blogs[0].id

    // update one blog likes
    const newLikes = 123
    await api.put(`/api/blogs/${blogID}`)
      .send({ likes: newLikes })
      .expect(200)

    // get updated blogs
    response = await api.get('/api/blogs')
    blogs = response.body
    let updatedBlog = blogs.filter(x => x.id === blogID)[0]
    expect(updatedBlog.likes).toBe(newLikes)
  })
})

describe('blog adding requests', () => {
  test('add a new blog post', async () => {
    // get initial blogs
    let response = await api.get('/api/blogs')
    let blogs = response.body
    const initialLength = blogs.length

    // get initialUser
    response = await api.get('/api/users')
    let initialUser = response.body[0]
    delete initialUser.blogs

    // add new blog post
    const newBlog = {
      title: 'Test2',
      author: 'No name2',
      url: 'https://example.com2',
      likes: 1000,
      user: initialUser
    }
    initialUserToken = await getInitialUserToken(api, helper.initialUserLoginInfo)
    response = await api.post('/api/blogs')
      .set('Authorization', `bearer ${initialUserToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogID = response.body.id

    // get updated blogs
    response = await api.get('/api/blogs')
    blogs = response.body
    let addedBlog = blogs.filter(x => x.id === blogID)[0]
    delete addedBlog.id
    expect(blogs).toHaveLength(initialLength + 1)
    expect(addedBlog).toEqual(newBlog)
  })

  test('likes defaults to 0 if missing', async () => {
    const newBlog = {
      title: 'Test2',
      author: 'No name2',
      url: 'https://example.com2',
    }

    initialUserToken = await getInitialUserToken(api, helper.initialUserLoginInfo)
    let response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${initialUserToken}`)
      .send(newBlog)
      .expect(201)
    const blogID = response.body.id

    response = await api.get('/api/blogs')
    const blogs = response.body
    let addedBlog = blogs.filter(x => x.id === blogID)[0]
    expect(addedBlog.likes).toBe(0)
  })

  test('bad request: missing title and url', async () => {
    const newBlog = {
      author: 'No name2',
      likes: 999
    }

    initialUserToken = await getInitialUserToken(api, helper.initialUserLoginInfo)
    await api.post('/api/blogs')
      .set('Authorization', `bearer ${initialUserToken}`)
      .send(newBlog)
      .expect(400)
  })

  test('401 unauthorized if no token provided', async () => {
    const newBlog = {
      title: 'Test2',
      author: 'No name2',
      url: 'https://example.com2',
    }
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { })
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const spy = jest.spyOn(console, 'error').mockImplementation(() => { })
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'xx',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Both username and password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'salainen',
      name: 'Superuser',
      password: 'xx',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Both username and password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})



afterAll(() => {
  mongoose.connection.close()
})