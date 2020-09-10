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
                      : persons.filter(p => 
                        p.name.toLowerCase().includes(filter)
                      )
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
    const personObject = {'name': newName, 'number': newNumber}
    let existingPerson = persons.filter(p => p.name === newName)
    
    if (existingPerson.length !== 0) {
      const updatedPerson = { ...existingPerson[0], number: newNumber }
      if (window.confirm(`${newName} is already added to phonebook, `
          + `replace the old number with a new one?`)) {
        PersonsService
          .update(updatedPerson.id, updatedPerson)
          .then(setPersons(persons.filter(p => p.name !== newName)
                                  .concat(updatedPerson)))
          .then(setNewName(''))
          .then(setNewNumber(''))
      }
    } else {
      PersonsService.create(personObject)
        .then(data => {
          setPersons(persons.concat({ ...personObject, id: data.id }))
        })
        .then(setNewName(''))
        .then(setNewNumber(''))
    }
  }

  const delPerson = (person) => {
    if (!persons.map(p => p.id).includes(person.id)) {
      console.log(`No person ${person.id}`)
    } else if (window.confirm(`Delete ${person.name}?`)) {
        PersonsService.delete_(person.id)
          .then(setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new</h2>
        <Form  onSubmit={addPerson} newValues={[newName, newNumber]} 
        changeHandler={[nameChangeHandler, numberChangeHandler]} />
      <h2>Numbers</h2>
      <Filter filter={filter} changeHandler={filterChangeHandler}/>
      <Persons persons={personsToShow} delPerson={delPerson}/>
    </div>
  )
}

export default App