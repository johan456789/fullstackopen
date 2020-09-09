import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect: countries')
    const promise = axios.get('https://restcountries.eu/rest/v2/all')
    const eventHandler = response => {
      console.log('promise fulfilled: countries')
      setCountries(response.data)
    }
    promise.then(eventHandler)
  }
  useEffect(hook, [])  // []: only run during the 1st render
  
  const countriesToShow = (filter === '') 
                        ? countries 
                        : countries.filter(p => 
                          p.name.toLowerCase().includes(filter.toLowerCase()))
  console.log('render', countriesToShow.length, 'countries')

  const filterChangeHandler = (event) => {
    const filter = event.target.value
    setFilter(filter)
  }

  return (
    <div>
      <h1>Find country</h1>
      <Filter filter={filter} changeHandler={filterChangeHandler}/>
      <Countries countries={countriesToShow}/>
    </div>
  )
}

export default App