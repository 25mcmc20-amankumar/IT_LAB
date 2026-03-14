import React, { useState, useEffect } from "react";

function Weather() {

  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "0198d6140c3345c06385cdf1e5fb895d";

  const fetchWeather = async (cityName) => {
    try {

      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);

    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <div>

      <h2>Weather App</h2>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />

      <button onClick={handleSearch}>Search</button>

      {error && <p style={{color:"red"}}>{error}</p>}

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}

    </div>
  );
}

export default Weather;