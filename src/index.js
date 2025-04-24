function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
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

// Dates

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let now = new Date();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hour = now.getHours();
let minutes = now.getMinutes();
let date = now.getDate();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

if (hour < 10) {
  hour = `0${hour}`;
}

let formatedTime = `${day} ${hour}:${minutes}, ${date} of ${month}`;
let timeElement = document.querySelector("#current-date-time");
timeElement.innerHTML = formatedTime;
