import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = (filter === '') 
                        ? persons 
                        : persons.filter(p => p.name.toLowerCase().includes(filter))

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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={nameChangeHandler}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={numberChangeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        Filter names shown with (case-insensitive): <input 
          value={filter} onChange={filterChangeHandler}
        />
      </div>
        <dl>
          {personsToShow.map((p) => <dt key={p.name}>{p.name}: {p.number}</dt>)}
        </dl>
    </div>
  )
}

export default App