// // start call Api

// main variables
let ApiKey = "fac80ded2aa68a76d7b04791015ca6d1";
let inputTemb = document.querySelector(".city-search");
let search = document.querySelector(".search");
let time = document.querySelector(".time");

search.addEventListener("click", checkApi);
let timer;
// start function
function checkApi() {
  if (inputTemb.value !== "") {
    let city = inputTemb.value;
    let Api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
    fetch(Api)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod == 404) {
          alert(`Erorr: This City Not Found `);
        }
        // show Temp
        showTemp(data);
        return data;
      })
      .catch((err) => {
        console.error(`Erorr: This ${err.message || `City Not Found`} `);
      });
  }
  inputTemb.value = "";
}

// show temp
function showTemp(data) {
  console.log(data);
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".degree").innerHTML = `${Math.floor(
    data.main.temp
  )} <span>°C</span>`;
  document.querySelector(
    "img"
  ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.querySelector(
    ".describe"
  ).innerHTML = `Description: ${data.weather[0].description}`;
  clearInterval(timer);
  showTime(data);
  timer = setInterval(() => {
    showTime(data);
  }, 1000);
}

function showTime(data) {
  let dataNow =
    new Date().getTime() + new Date().getTimezoneOffset() * 1000 * 60;
  let timeZone = new Date(dataNow + data.timezone * 1000);

  let hours = timeZone.getHours();
  let minutes = timeZone.getMinutes();
  let seconds = timeZone.getSeconds();

  // check to add 0 before unit
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  if (hours >= 12) {
    time.innerHTML = `${hours}:${minutes}:${seconds} Pm`;
  } else {
    time.innerHTML = `${hours}:${minutes}:${seconds} Am`;
  }
}
