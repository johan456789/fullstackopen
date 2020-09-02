import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

function randBetween(min, max, exclude) {
  let randNum = Math.round(Math.random() * (max - min) + min);
  if (exclude !== randNum) {
    return randNum;
  } else {
    console.log('same number!')
    return randBetween(min, max, exclude);
  }
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Quote = ({anecdotes, index}) => {
  return (
    <div>
      {anecdotes[index]}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  return (
    <>
      <Quote anecdotes={anecdotes} index={selected} />
      <Button onClick={() => setSelected(randBetween(0, anecdotes.length - 1, selected))} text='next anecdote'/>
    </>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)