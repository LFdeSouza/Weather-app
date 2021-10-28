const formField = document.querySelector("[data-form]");
const cityInputField = document.querySelector("[data-city-input]");
const display = document.querySelector("[data-display]");
const cityName = document.querySelector("#city-name");
const condition = document.querySelector("#condition");
const temperature = document.querySelector("#temperature");
const feelsLike = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

//Event: get target city
formField.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cityInputField.value === "") return;
  const targetCity = cityInputField.value;
  getWeatherData(targetCity);
  clearField();
});

async function getWeatherData(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=cee38edd06735d034fa351f42962e20f`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City ${cityName} not found`);
      return null;
    }
    const data = await response.json();
    updateDataDisplay(data);
  } catch (error) {
    alert(error);
  }
}

function updateDataDisplay(data) {
  display.classList.add("active");
  cityName.textContent = `${data.name}`;
  condition.textContent = `${data.weather[0].main}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  feelsLike.textContent = `Feels like: ${data.main.feels_like}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind: ${data.wind.speed}km/h`;
}

function clearField() {
  cityInputField.value = null;
}
