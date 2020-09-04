import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const nameChangeHandler = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map((p) => p.name).includes(newName)) {
      console.log(`duplicate: ${newName}`)
      alert(`${newName} is already added to phonebook.`)
    } else {
      const personObject = {'name': newName}
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={nameChangeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <dl>
          {persons.map((p) => <dt key={p.name}>{p.name}</dt>)}
        </dl>
    </div>
  )
}

export default App