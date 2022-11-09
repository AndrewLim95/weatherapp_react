import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryData = ({country}) => {
  return (
    <div key={country.id}>
    <h1>{country.name.common}</h1>
    <p>{country.capital}</p>
    <p>{country.area}</p>
    <h2>Languages:</h2>
    {Object.values(country.languages).map(language => 
    <li key={language.id}>{language}</li>
    )
    }
    <img src={country.flags.png} alt="country flag" />
    </div>
  )
}

const App = (props) => {
  const [countries, setCountries] = useState(props.countries) 
  const [newFilter, setNewFilter] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const showMessage = (bool) => {
    setShow({show: bool})
  }

  const filteredCountry = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  console.log(filteredCountry)
  if (filteredCountry.length > 10){
  return (
    <div>
      <h2>Find Country</h2>
        filter: <input
        value={newFilter}
        onChange={handleFilterChange}/>
      <h2>List of Countries:</h2>
      <p>Too many matches, please specify</p>
    </div>
  )
  }
  else if (filteredCountry.length === 1){
    return (
      <div>
        <h2>Find Country</h2>
          filter: <input
          value={newFilter}
          onChange={handleFilterChange}/>
          <h2>Country data</h2>
          {filteredCountry.map(country => 
          <CountryData key={country.id} country={country}/>
          )}
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>Find Country</h2>
          filter: <input
          value={newFilter}
          onChange={handleFilterChange}/>
        <h2>List of Countries:</h2>
        {console.log(show)}
          {filteredCountry.map(country => 
          <li key={country.id}>{country.name.common} 
          <button onClick={showMessage.bind(null, true)}>show</button>
          <button onClick={showMessage.bind(null, false)}>hide</button>
          {show && <CountryData key={country.id} country={country}/>}</li>
          )}
      </div>
    )
  }
}

export default App