"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherInfo = document.getElementById("weatherInfo");
const API_KEY = "0198d6140c3345c06385cdf1e5fb895d"; // replace with your API key
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        weatherInfo.textContent = "Loading...";
        try {
            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("City not found or network error");
            }
            const data = yield response.json();
            weatherInfo.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Humidity: ${data.main.humidity} %</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
        }
        catch (error) {
            if (error instanceof Error) {
                weatherInfo.textContent = error.message;
            }
            else {
                weatherInfo.textContent = "Unknown error occurred";
            }
        }
    });
}
getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
    else {
        weatherInfo.textContent = "Please enter a city name";
    }
});
