const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Usage: node mongo.js <password> [<name> <number>]')
  process.exit(1)
}
const password = process.argv[2]
const name_ = (process.argv.length === 5) ? process.argv[3] : null
const number = (process.argv.length === 5) ? process.argv[4] : null

const url = `mongodb+srv://fullstack:${password}@cluster0.kub0q.mongodb.net/phonebook-app?retryWrites=true`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

if (name_ && number) {
  const person = new Person({
    name: name_,
    number: number
  })
  
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
} else {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}