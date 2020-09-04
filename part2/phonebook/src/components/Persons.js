import React from 'react';


const Person = ({name, number}) => {
  return (
    <dt>{name}: {number}</dt>
  )
}

const Persons = ({persons}) => {
  return (
    <dl>
      {persons.map((p) => <Person key={p.name} name={p.name} number={p.number} />)}
    </dl>
  )
}

export default Persons