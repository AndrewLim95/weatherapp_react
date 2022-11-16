import { useState, useEffect } from 'react'
import axios from 'axios'
import GetWeather from './components/weatherApi'

const InputCountry = ({newFilter, handleFilterChange})=>{
  return (
    <div>
    <h2>Find Country</h2>
          filter: <input
          value={newFilter}
          onChange={handleFilterChange}/>
    </div>
  ) 
}

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
    <GetWeather capital={country.capital}/>
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

  const filteredCountry = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  console.log(filteredCountry)

  const handleButtonClick = () =>{
    setShow(!show)
  }

  if (filteredCountry.length > 10){
  return (
    <div>
      <InputCountry newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>List of Countries:</h2>
      <p>Too many matches, please specify</p>
    </div>
  )
  }
  else if (filteredCountry.length === 1){
    return (
      <div>
        <InputCountry newFilter={newFilter} handleFilterChange={handleFilterChange}/>
          <h2>Country data</h2>
          <CountryData key={filteredCountry.uid} country={filteredCountry[0]}/>
      </div>
    )
  }
  else {
    if (show){
      return (
        <div>
          <InputCountry newFilter={newFilter} handleFilterChange={handleFilterChange}/>
          <h2>List of Countries:</h2>
            {filteredCountry.map(country => 
            <li key={country.uid2}>{country.name.common} 
            <button onClick={handleButtonClick}>show</button>
            <CountryData country={country}/>
            </li>
            )}
        </div>
      )
    }
    return (
      <div>
        <InputCountry newFilter={newFilter} handleFilterChange={handleFilterChange}/>
        <h2>List of Countries:</h2>
          {filteredCountry.map(country => 
          <li key={country.uid2}>{country.name.common} 
          <button onClick={handleButtonClick}>show</button>
          </li>
          )}
      </div>
    )
  }
}
export default App