import React, { useState, useEffect } from "react";

function Weather() {

  const API_KEY = "0198d6140c3345c06385cdf1e5fb895d";

  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  // fetch weather
  const fetchWeather = async (cityName) => {

    try {

      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if(!res.ok){
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);

      fetchForecast(cityName);

    } catch(err){
      setError(err.message);
      setWeather(null);
      setForecast([]);
    }

  };

  // fetch forecast
  const fetchForecast = async (cityName) => {

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    const daily = data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    setForecast(daily);

  };

  // lifecycle
  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (

    <div style={{textAlign:"center"}}>

      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e)=>setCity(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {error && <p style={{color:"red"}}>{error}</p>}

      {weather && (

        <div>

          <h2>{weather.name}</h2>

          <p>Temperature: {weather.main.temp} °C</p>

          <p>Humidity: {weather.main.humidity} %</p>

          <p>Condition: {weather.weather[0].description}</p>

        </div>

      )}

      {forecast.length > 0 && (

        <div>

          <h2>5 Day Forecast</h2>

          {forecast.map((item,index)=>(
            <div key={index}>

              <p>{item.dt_txt}</p>

              <p>Temp: {item.main.temp} °C</p>

              <p>{item.weather[0].description}</p>

              <hr/>

            </div>
          ))}

        </div>

      )}

    </div>
  );
}

export default Weather;