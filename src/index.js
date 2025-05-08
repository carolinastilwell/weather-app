function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let descriptionElement = document.querySelector("#current-temp-description");
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
    class="current-temp-icon"
    src=${response.data.condition.icon_url}
    alt="weather"
  />`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  descriptionElement.innerHTML = response.data.condition.description;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "t8afd90435a4767d2a3fo6db06469dbc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

searchCity("London");

// Date
function displayTime() {
  let currentTime = moment().format("dddd HH:mm:ss, Do of MMMM YYYY");
  let timeElement = document.querySelector("#current-date-time");
  timeElement.innerHTML = currentTime;
}
setInterval(displayTime, 1000);

// Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "t8afd90435a4767d2a3fo6db06469dbc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
  console.log(city);
}

function displayForecast(response) {
  console.log(response.data);

  let days = response.data.daily;
  let forecastHtml = "";

  days.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temp-max">${Math.round(
                day.temperature.maximum
              )}°</span>
              <span class="weather-forcast-temp-min">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
