"use strict";
// all targeted elements
const temp = document.querySelector(".temp");
const feri = document.querySelector(".feri");
const cel = document.querySelector(".cel");
const fer = document.querySelector(".fer");
const img = document.querySelector("#test");
const feel = document.querySelector(".feel");
const humi = document.querySelector(".humi");
const wind = document.querySelector(".wind");
const sectionTwo = document.querySelector(".sectionTwo");
const sectionThree = document.querySelector(".sectionThree");
const test2 = document.querySelector(".test2");
const weatherTypes = document.querySelector(".types");
// test
const city = document.querySelector(".myCls3");
const country = document.querySelector(".myCls4");

// convert longi and lati to city name
const ConverLongiAndLati = async () => {
  const userInput = document.querySelector(".myCls2").value;
  document.querySelector(".myCls2").value = "";

  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=6b556005dae9d19ffd7918ac69d92c9f`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    console.log("convert longi and lati to city name", data);
    const cityLogitude = data[0].lon;
    const cityLatitude = data[0].lat;

    city.textContent = data[0].name;
    country.textContent = data[0].country;

    fetchWeatherData(cityLogitude, cityLatitude);
    forecastData(cityLogitude, cityLatitude);
    // console.log("city longitude", cityLogitude, "city latitude", cityLatitude);
    // sectionTwo.style.display = "block";
    // sectionThree.style.display = "block";
    test2.style.display = "block";
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }

  const CurrentDate = () => {
    const date = new Date();
    // console.log(`${date.toDateString()} | ${date.toTimeString()}`);
    return `${date.toDateString()} | ${date.toTimeString()}`;
  };
  const CurrentTimeDate = CurrentDate();
  // console.log(CurrentTimeDate);

  document.querySelector(".myCls").textContent = CurrentTimeDate;
  // console.log(TimeDate);
};

// ConverLongiAndLati();

// user current location
const getLocation = () => {
  if (navigator.geolocation) {
    // Use the geolocation API to get the current position
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
// getLocation();

// user current location (longitude and latitude)
function showPosition(position) {
  // Once location is obtained, you can access latitude and longitude
  const latitudeUser = position.coords.latitude;
  const longitudeUser = position.coords.longitude;

  // console.log("Latitude: " + latitudeUser);
  // console.log("Longitude: " + longitudeUser);

  fetchWeatherData(longitudeUser, latitudeUser);
  forecastData(longitudeUser, latitudeUser);
  const CurrentDate = () => {
    const date = new Date();
    // console.log(`${date.toDateString()} | ${date.toTimeString()}`);
    return `${date.toDateString()} | ${date.toTimeString()}`;
  };
  const CurrentTimeDate = CurrentDate();
  // console.log(CurrentTimeDate);

  document.querySelector(".myCls").textContent = CurrentTimeDate;
  // console.log(TimeDate);
  // sectionTwo.style.display = "block";
  // sectionThree.style.display = "block";
  test2.style.display = "block";
}

// Handle any errors that occur while getting the user location
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

// waether data fething
const fetchWeatherData = async (cityLogitude, cityLatitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLogitude}&appid=6b556005dae9d19ffd7918ac69d92c9f`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log("Weather data:", data);
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const Lcity = data.name;
    const Lcountry = data.sys.country;

    city.textContent = Lcity;
    country.textContent = Lcountry;
    // console.log(feelsLike, humidity, windSpeed);
    feel.textContent = feelsLike;
    humi.textContent = humidity;
    wind.textContent = windSpeed;

    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // console.log("weather:", data.weather[0].main);
    let type = data.weather[0].main;
    weatherTypes.textContent = type;
    let temperatureKelvin = data.main.temp;

    // Convert Kelvin to Celsius and Fahrenheit
    let temperatureCelsius = kelvinToCelsius(temperatureKelvin, feelsLike);
    temp.innerHTML = temperatureCelsius;
    let temperatureFahrenheit = kelvinToFahrenheit(temperatureKelvin);
    feri.innerHTML = temperatureFahrenheit;
    // console.log(
    //   `Temperature: ${temperatureCelsius}°C and ${temperatureFahrenheit}°F`
    // );

    const feelsLikeCelsius = kelvinToCelsiusForFeels(feelsLike);
    feel.innerHTML = feelsLikeCelsius;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Function to convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(0);
}

// Function to convert Kelvin to Fahrenheit
function kelvinToFahrenheit(kelvin) {
  return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
}
function kelvinToCelsiusForFeels(feelsLike) {
  return (feelsLike - 273.15).toFixed(0);
}
// weather forecast data for upcoming days
const forecastData = async (cityLogitude, cityLatitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?&lat=${cityLatitude}&lon=${cityLogitude}&cnt=7&appid=6b556005dae9d19ffd7918ac69d92c9f`,

      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log("Weather forecast data:", data);
    // console.log(data.list[0].weather[0].main);
    // console.log(data.list[0].weather[0].icon);
    const listdata = document.querySelector(".listData");
    listdata.innerHTML = "";

    data.list.forEach((item) => {
      const forecastTemp = item.main.temp;
      const forecastIcon = item.weather[0].icon;
      const forecastType = item.weather[0].main;

      const Temp = (forecastTemp - 273.15).toFixed(0);
      // console.log(forecastTemp, forecastIcon, forecastType);
      listdata.innerHTML += `
      <div class="border border-white rounded-2xl sm:h-32 p-4 " style="border: 2px solid #fff;">
      <div class="flex justify-center my-2">
      <img class="w-24 h-24" src="http://openweathermap.org/img/wn/${forecastIcon}@2x.png" alt="" />
      </div>
      <p class="text-4xl font-semibold text-center text-gray-800"><span>Temp: </span>${Temp}<span>&deg;C</span></p>
      <p class="text-xl text-center text-gray-600 font-medium"><span>Weather: </span>${forecastType}</p>
      </div>
      `;
    });

    // console.log(data.list[0].main.temp);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
