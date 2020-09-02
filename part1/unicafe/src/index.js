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

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>No feedback given.</p>
    )
  }

  return (
    <div>
      <Stat text='Good' number={good} />
      <Stat text='Good' number={good} />
      <Stat text='Neutral' number={neutral} />
      <Stat text='Bad' number={bad} />
      <Stat text='All' number={good + neutral + bad} />
      <Stat text='Average' number={(good * 1 + neutral * 0 + bad * -1) / 3} />
      <Stat text='Positive' number={good / (good + neutral + bad) * 100} unit='%' />
    </div>
  )
}

const Stat = ({text, number, unit}) => {
  return (
    <p>{text} {number} {unit}</p>
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
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)