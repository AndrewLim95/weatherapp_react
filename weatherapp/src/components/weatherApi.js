import { useEffect,useState } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const GetWeather = ({capital})=> {
  const [weatherInfo, setWeatherInfo] = useState('')
  console.log(capital)
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
      .then(response => {
        setWeatherInfo(response.data)
      })
  }, [])

  const iconUrl = 'http://openweathermap.org/img/wn/10d@2x.png'

  return(
    <div>
    {console.log(weatherInfo.weather)}
    {Object.values(weatherInfo.weather).map(desc => 
    <p> {desc.main}: {desc.description}</p>
    )}
    {<img src={iconUrl} alt= "weather icon"/>}
    </div>
  )
}


export default GetWeather