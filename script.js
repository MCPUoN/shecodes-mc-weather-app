let now = new Date();
console.log(now);

function formatDate(date) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dateNow = date.getDate();
  let dayNow = days[date.getDay()];
  let monthNow = months[date.getMonth()];
  let yearNow = date.getFullYear();
  let hoursNow = date.getHours();
  let minutesNow = date.getMinutes();
  let formatDate = `${dayNow},<br />${dateNow} ${monthNow} ${yearNow}, ${hoursNow}:${minutesNow} hrs`;
  return formatDate;
}

let mainDay = document.querySelector(".rowMainDay");
mainDay.innerHTML = formatDate(new Date());

function capatilizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

//weather today

function showTemp(response) {
  document.querySelector("#cityTyped").innerHTML = response.data.name;
  document.querySelector("#temperatureNow").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("temp-min-0").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#temp-max-0").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#wind-0").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity-0").innerHTML = response.data.main.humidity;
  console.log(response);
  console.log(response.data.name);
}

// info based on city search
function searchInput(city) {
  let apiKey = "4cca19136987fd45a7562c340065ee08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityShown}&units=metric`;
  let cityShown = "Madrid";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function whatCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#cityTyped");
  let cityShown = document.querySelector("#cityShown");
  let value = searchInput.value;
  cityShown.innerHTML = `${value}`;
  let apiKey = "4cca19136987fd45a7562c340065ee08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityShown}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemp);
}
let form = document.querySelector("#whatCity");
form.addEventListener("submit", whatCity);

// geoloc data
let currentLocButton = document.querySelector(".currLocBtn");
currentLocButton.addEventListener("click", currLocSearch);

function currLocSearch(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4cca19136987fd45a7562c340065ee08";
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&units=metric}`;
  axios.get(geoApiUrl).then(showTemp);
}
navigator.geolocation.getCurrentPosition(currLocSearch);

function showYourTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data.main.temp);
  let tempNow = document.querySelector("#temperatureNow");
  tempNow.innerHTML = `${temperature}`;
}

// let apiKey = "4cca19136987fd45a7562c340065ee08";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityShown}&units=metric`;
// let cityShown = "Madrid";
// axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
