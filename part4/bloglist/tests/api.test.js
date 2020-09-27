const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

afterAll(() => {
  mongoose.connection.close()
})