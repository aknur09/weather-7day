import React, { useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'f631ea87daddf959f8d7a12c30009e4c';

const Weather = () => {
  const [weatherData, setWeatherData] = React.useState(null);
  const [searchCity, setSearchCity] = React.useState('');
  const [error, setError] = React.useState('');

  const getWeather = async (city = 'Bishkek') => {
    try {
      const { data } = await axios.get(url + city + '&appid=' + apiKey);
      setWeatherData(data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('Город не найден');
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const changeSearchCity = (event) => {
    setSearchCity(event.target.value);
  };

  return (
    <header>
      <div className="container">
        <div className="search">
          <h1>Прогноз погоды</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getWeather(searchCity);
            }}
          >
            <input
              type="text"
              value={searchCity}
              placeholder="Введите название города"
              onChange={changeSearchCity}
              required
            />
            <button className="btn btn-outline-danger">Показать</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="weathers">
          {weatherData && (
            <div className="weather">
              <h1>{weatherData.name}</h1>
              <p>температура : {Math.round(weatherData.main.temp - 273.15)} °C</p>
              <p>{weatherData.weather[0].main}</p>
              <p>влажность :{weatherData.main.humidity} %</p>
             
              <img  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}  alt=""  />

            </div>
          )}
        </div>
      </div>
    </header>
  );
};




export default Weather;