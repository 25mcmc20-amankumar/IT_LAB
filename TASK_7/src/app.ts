
interface WeatherApiResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  name: string;
}

const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const getWeatherBtn = document.getElementById("getWeatherBtn") as HTMLButtonElement;
const weatherInfo = document.getElementById("weatherInfo") as HTMLDivElement;

const API_KEY = "0198d6140c3345c06385cdf1e5fb895d"; 

async function getWeather(city: string): Promise<void> {
  weatherInfo.textContent = "Loading...";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found or network error");
    }

    const data: WeatherApiResponse = await response.json();

    weatherInfo.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Humidity: ${data.main.humidity} %</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    if (error instanceof Error) {
      weatherInfo.textContent = error.message;
    } else {
      weatherInfo.textContent = "Unknown error occurred";
    }
  }
}
getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    weatherInfo.textContent = "Please enter a city name";
  }
});
