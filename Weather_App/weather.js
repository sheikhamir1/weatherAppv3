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

const weatherTypes = document.querySelector(".types");

// convert longi and lati to city name
const ConverLongiAndLati = async () => {
  const userInput = document.querySelector(".myCls2").value;
  const city = document.querySelector(".myCls3");
  const country = document.querySelector(".myCls4");
  document.querySelector(".myCls2").value = "";

  // console.log(temp, cel, fer, types);
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
    // console.log("city longitude", cityLogitude, "city latitude", cityLatitude);
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
const forecastData = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=28.6517178&lon=77.2219388&cnt=7&appid=6b556005dae9d19ffd7918ac69d92c9f`,

      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log("Weather forecast data:", data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
// forecastData();

// get location from user
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
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log("Latitude: " + latitude);
  console.log("Longitude: " + longitude);
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
