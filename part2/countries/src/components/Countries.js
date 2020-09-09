import React, { useState, useEffect } from 'react'
import axios from 'axios'

const showCountry = (x) => {
  return (
    <dl>
      <Country key={x.name} name={x.name} flag={x.flag} capital={x.capital}
        population={x.population} lang={x.languages} />
    </dl>
  )
}

const Country = ({name, flag, capital, population, lang}) => {
  return (
    <>
      <h2>{name}</h2>
      <img height='200px' alt='flag' src={flag} />
      <dl>
        <dt>
          Capital: {capital}
        </dt>
        <dt>
          Population: {population.toLocaleString('en-US')}
        </dt>
      </dl>
      <h3>Languages</h3>
      <div>
        {lang.map((x) => <li key={x.name}>{x.name}</li>)}
      </div>
      <Weather city={capital} />
    </>
  )
}

const CountryListItem = ({country}) => {
  const [countryItem, setCountryItem] = useState(
    <dt>
      {country.name} <button onClick={() => setCountryItem(showCountry(country))}>show</button>
    </dt>
  )
  return countryItem
}

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return 'Too many matches, specify another filter.'
  } else if (countries.length === 1){
    return showCountry(countries[0])
  }
  return (
    <dl>
      {countries.map((x) => <CountryListItem key={x.name} country={x}/>
      )}
    </dl>
  )
}

const Weather = ({city}) => {
  const [weather, setWeather] = useState('')
  const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY
  const params = {
    access_key: api_key,
    query: city,
    units: 'm'
  }
  const url = 'http://api.weatherstack.com/current'

  const hook = () => {
    console.log('effect: weather')
    const promise = axios.get(url, {params})
    const eventHandler = response => {
      console.log('promise fulfilled: weather')
      setWeather(response.data['current'])
    }
    promise.then(eventHandler)
  }
  useEffect(hook, [])  // []: only run during the 1st render

  const title = <h3>Weather in {city}</h3>
  if (weather === '')
    return <>{title} Loading weather...</>

  return (
    <>
      {title}
      <dl>
        <img alt='weather icon' src={weather['weather_icons'][0]} />
        <dt>
          Temperature: {weather['temperature']} Celsius
        </dt>
        <dt>
          Wind: {weather['wind_speed']} kph direction {weather['wind_dir']}
        </dt>
      </dl>
    </>
  )
}

export default Countries