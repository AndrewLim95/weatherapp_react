import { useState, useEffect } from 'react'
import axios from 'axios'

const ListOfCountry = ({country}) => {
  return (
      <li>{country.name.common}</li>
  )
} 

const App = (props) => {
  const [countries, setCountries] = useState(props.countries) 
  const [newFilter, setNewFilter] = useState('')

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

  const filteredCountry = countries.filter(country=> country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  console.log(filteredCountry)
  if (filteredCountry.length > 10){
  return (
    <div>
      <h2>Country</h2>
        filter: <input
        value={newFilter}
        onChange={handleFilterChange}/>
      <h2>List of Countries:</h2>
      <p>Too many matches, please specify</p>
    </div>
  )
      }
  else {
    return (
      <div>
        <h2>Country</h2>
          filter: <input
          value={newFilter}
          onChange={handleFilterChange}/>
        <h2>List of Countries:</h2>
          {
          filteredCountry.map(country => 
          <ListOfCountry key={country.id} country={country}/>)
          }
      </div>
    )
  }
}

export default App