const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Test',
    author: 'No name',
    url: 'https://example.com',
    likes: 999
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


test('getting blog posts', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('check id property exists', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  expect(blogs[0].id).toBeDefined()
})

test('add a new blog post', async () => {
  // get initial blogs
  let response = await api.get('/api/blogs')
  let blogs = response.body
  const initialLength = blogs.length

  // add new blog post
  const newBlog = {
    title: 'Test2',
    author: 'No name2',
    url: 'https://example.com2',
    likes: 1000
  }
  response = await api.post('/api/blogs')
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

  let response = await api.post('/api/blogs').send(newBlog)
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

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})