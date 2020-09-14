const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
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

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/info', (req, res) => {
  const body = `Phonebook has info for ${persons.length} people.<br/><br/>${Date()}`
  res.send(body)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  console.log(person)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!persons.find(p => p.id === id)) {
    res.status(404).end()
  }
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.use(express.json())  // remember this
app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({error: 'Name or number missing'})
  }
  if (persons.find(p => p.name === body.name)) {
    return res.status(404).json({error: 'name must be unique'})
  }

  getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
  const personObject = {
    "name": body.name,
    "number": body.number,
    "id": getRandomInt(1<<10)
  }
  persons = persons.concat(personObject)
  res.json(personObject)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})