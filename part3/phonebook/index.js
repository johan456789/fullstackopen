require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')  // database

const app = express()
app.use(express.json())  // remember this
app.use(express.static('build'))
app.use(cors())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/info', (req, res) => {
  const body = `Phonebook has info for ${persons.length} people.<br/><br/>${Date()}`
  res.send(body)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(id).then(person => res.json(person))
  // error handing is ex3.15-ex3.18
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findByIdAndRemove(id)
    .then(result => {
      if (result) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({error: 'Name or number missing'})
  }
  Person.exists({ name: body.name }).then(exists => {
    if (exists) {
      return res.status(404).json({ error: 'Name must be unique' })
    }
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save().then(savedPerson => res.json(savedPerson))
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number missing' })
  }

  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(id, person, {new: true})
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' })
  }
  next(error)  // middleware passes the error forward to the default Express error handler.
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})