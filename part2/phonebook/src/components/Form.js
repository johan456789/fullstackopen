import React from 'react';


const Form = ({onSubmit, newValues, changeHandler}) => {
  const [newName, newNumber] = newValues
  const [nameChangeHandler, numberChangeHandler] = changeHandler
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={newName} onChange={nameChangeHandler} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
  
export default Form