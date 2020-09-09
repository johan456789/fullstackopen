import React, {useState} from 'react';

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
          Population: {population}
        </dt>
      </dl>
      <h3>Languages</h3>
      <div>
        {lang.map((x) => <li key={x.name}>{x.name}</li>)}
      </div>
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

export default Countries