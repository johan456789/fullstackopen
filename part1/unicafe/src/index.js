import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Stats = ({text, count}) => {
  return (
    <p>{text} {count}</p>
  )
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <Header text='Give feedback' />
        <Button handleClick={() => setGood(good + 1)} text='Good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='Bad' />
      </div>
      <div>
        <Header text='Statistics' />
        <Stats text='Good' count={good} />
        <Stats text='Neutral' count={neutral} />
        <Stats text='Bad' count={bad} />
      </div>
    </>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)