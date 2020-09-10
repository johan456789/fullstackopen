import React from 'react';




const Person = ({ name, number, delHandler}) => {
  return (
    <dt>{name}: {number} <button onClick={delHandler}>delete</button></dt>
  )
}

const Persons = ({ persons, delPerson}) => {
  return (
    <dl>
      {persons.map((p) => <Person key={p.name} name={p.name} number={p.number} 
                          delHandler={() => delPerson(p)}/>)}
    </dl>
  )
}

export default Persons