import React from 'react';


const Language = ({lang}) => {
  return (
    <li>{lang}</li>
  )
}

const Country = ({name, flag, capital, population, lang}) => {
  console.log(flag)
  return (
    <>
      <h1>{name}</h1>
      <img height='200px' alt='flag' src={flag} />
      <dl>
        <dt>
          Capital: {capital}
        </dt>
        <dt>
          Population: {population}
        </dt>
      </dl>
      <h2>Languages</h2>
      <div>
        {lang.map((x) => <Language key={x.name} lang={x.name} />)}
      </div>
    </>
  )
}

const CountryList = ({name}) => {
  return (
    <dt>{name}</dt>
  )
}

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return 'Too many matches, specify another filter.'
  } else if (countries.length === 1){
    return (
      <dl>
        {countries.map((x) => 
          <Country key={x.name} name={x.name} flag={x.flag} capital={x.capital}
          population={x.population} lang={x.languages} />
        )}
      </dl>
    )
  }
  return (
    <dl>
      {countries.map((x) => <CountryList key={x.name} name={x.name}/>
      )}
    </dl>
  )
}

export default Countries