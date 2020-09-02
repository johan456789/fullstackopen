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
  const randNum = Math.round(Math.random() * (max - min) + min);
  if (exclude !== randNum) {
    return randNum;
  } else {
    console.log('same number!')
    return randBetween(min, max, exclude);
  }
}

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Quote = ({anecdotes, index, votes}) => {
  return (
    <>
      <div>
        {anecdotes[index]}
      </div>
      <div>
        has {votes[index]} votes.
      </div>
    </>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const quoteNum = anecdotes.length
  const [votes, setVotes] = useState(Array.apply(null, new Array(quoteNum)).map(Number.prototype.valueOf, 0))

  const setVotesHelper = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVoteIndex = votes.indexOf(Math.max(...votes));  // less efficient one-liner
  
  console.log('votes', votes)
  return (
    <>
      <Header title='Anecdote of the day' />
      <Quote anecdotes={anecdotes} index={selected} votes={votes}/>
      <Button onClick={() => setVotesHelper(selected)} text='Vote!'/>
      <Button onClick={() => setSelected(randBetween(0, quoteNum - 1, selected))} text='Next anecdote'/>
      <Header title='Anecdote with most votes' />
      <Quote anecdotes={anecdotes} index={maxVoteIndex} votes={votes} />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)