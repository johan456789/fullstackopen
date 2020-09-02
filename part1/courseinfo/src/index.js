import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Header takes care of rendering the name of the course
const Head = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises}/>
      <Part part={parts[1].name} exercises={parts[1].exercises}/>
      <Part part={parts[2].name} exercises={parts[2].exercises}/>
    </div>
  )
}

const Part = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

// Total renders the total number of exercises.
const Total = ({parts}) => {
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Head course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      <div>{counter}</div>
    </div>
  )
}


ReactDOM.render(
  <App />, 
  document.getElementById('root')
)