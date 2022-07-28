import axios from 'axios'
import { useState, useEffect } from 'react';


const Countries = (props) => {
  //const api_key = process.env.REACT_APP_API_KEY

  const { countries, filter, setCountries} = props;
  const [weather, setWeather] = useState("")
  const [wind, setWind] = useState("")
  const [icon ,setIcon] = useState("")
  let countriesToShow =
    filter === ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        );

  useEffect(() => {
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${countriesToShow[0]?.capital}&appid=96c7e8a269eebdea73ef1da7adb8a411`)
      .then(response => {
        console.log(response.data.main.temp)
        setWeather(response.data.main.temp)
        setWind(response.data.wind.speed)
        console.log(response.data.wind.speed)
        setIcon(response.data.weather[0].icon)
      }
      )})
  //handles the empty search case where every country is shown
  if (countriesToShow.length > 10) {
    return (
    <div>Too many matches. Specify another filter</div>
    );
  } 

  else if (countriesToShow.length === 1) {
    return (
      <>
        <h1>{countriesToShow[0].name.common}</h1>
        <p>Capital: {countriesToShow[0].capital}</p>
        <p>Area: {countriesToShow[0].area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(countriesToShow[0].languages).map((lang) => (
            <li key={countriesToShow[0].flag}>{lang}</li>
          ))}
        </ul>
        <img alt="flag" src={countriesToShow[0].flags.png} />
        <h2>Weather in {countriesToShow[0].capital}</h2>
        <p>Temperature is: {weather} °C </p>
        <img alt="weather icon" src={"http://openweathermap.org/img/wn/" + icon + "@2x.png"}/>
        <p>Wind: {wind} m/s </p>
      </>
    );
  }
  
  return (
    <div>
      <ul>
        {countriesToShow.map((country) => (
          <li key={country.flag}>
            {country.name.common}
            <button type="button" onClick={() => setCountries([country])}>show</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
