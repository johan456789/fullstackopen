import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = (props) => {

  return (
    <div>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)