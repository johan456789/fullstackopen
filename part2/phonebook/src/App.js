import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsService from './services/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    PersonsService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])  // []: only run during the 1st render
  
  const personsToShow = (filter === '') 
                      ? persons 
                      : persons.filter(p => p.name.toLowerCase().includes(filter))
  console.log('render', personsToShow.length, 'persons')


  const nameChangeHandler = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const numberChangeHandler = (event) => {
    const number = event.target.value
    setNewNumber(number)
  }

  const filterChangeHandler = (event) => {
    const filter = event.target.value
    setFilter(filter)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map((p) => p.name).includes(newName)) {
      console.log(`duplicate: ${newName}`)
      alert(`${newName} is already added to phonebook.`)
    } else {
      const personObject = {'name': newName, 'number': newNumber}

      PersonsService.create(personObject)
        .then(setPersons(persons.concat(personObject)))
        .then(setNewName(''))
        .then(setNewNumber(''))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new</h2>
        <Form  onSubmit={addPerson} newValues={[newName, newNumber]} changeHandler={[nameChangeHandler, numberChangeHandler]} />
      <h2>Numbers</h2>
      <Filter filter={filter} changeHandler={filterChangeHandler}/>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App