import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonsService from './services/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState([null, 0]) // [msg, error]

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
          .then(() => {
            setPersons(persons.filter(p => p.name !== newName)
              .concat(updatedPerson))
            setMessage([`Updated ${newName}`, 0])
          })
          .catch(error => {
            const errorMsg = error.response.data.error
            console.log(errorMsg)
            setMessage([errorMsg, 1])
          })
          .then(() => {
            setNewName('')
            setNewNumber('')
          })
          .then(setTimeout(() => {
            setMessage([null, null])
          }, 1000))
      }
    } else {
      PersonsService.create(personObject)
        .catch(error => {
          const errorMsg = error.response.data.error
          console.error(errorMsg)
          setMessage([errorMsg, 1])
        })
        .then(data => {
          setPersons(persons.concat({ ...personObject, id: data.id }))
          setMessage([`Added ${newName}`, 0])
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          setNewName('')
          setNewNumber('')
        })
        .then(setTimeout(() => {
          setMessage([null, null])
        }, 1000))
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
      <Notification message={message[0]} error={message[1]}/>
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