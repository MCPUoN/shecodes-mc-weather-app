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
  document.querySelector("#temp-min0").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#temp-max0").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#wind0").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity0").innerHTML = response.data.main.humidity;
  console.log(response);
  console.log(response.data.name);
}

// info based on city search
function searchInput(city) {
  let apiKey = "4cca19136987fd45a7562c340065ee08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityTyped").value;
  cityShown.innerHTML = `${city}`;
  searchInput(city);
}

let form = document.querySelector("#whatCity");
form.addEventListener("submit", inputCity);

// geoloc data
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4cca19136987fd45a7562c340065ee08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&units=metric}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
function currLocSearch(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocButton = document.querySelector(".currLocBtn");
currLocBtn.addEventListener("click", currLocSearch);
