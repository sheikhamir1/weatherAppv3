"use strict";
// all targeted elements

// convert longi and lati to city name
const ConverLongiAndLati = async () => {
  const userInput = document.querySelector(".myCls2").value;
  // console.log(userInput);
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
    console.log("city longitude", cityLogitude, "city latitude", cityLatitude);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// ConverLongiAndLati();

// waether data fething
const fetchWeatherData = async () => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=22.5414185&lon=88.35769124388872&appid=6b556005dae9d19ffd7918ac69d92c9f",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log("Weather data:", data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// fetchWeatherData();

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

// current date and time
const CurrentDate = () => {
  const date = new Date();
  // console.log(`${date.toDateString()} | ${date.toTimeString()}`);
  return `${date.toDateString()} | ${date.toTimeString()}`;
};
const CurrentTimeDate = CurrentDate();
// console.log(CurrentTimeDate);

const TimeDate = document.querySelector(".myCls");
// console.log(TimeDate);
const setTimeAndDate = (TimeDate.textContent = CurrentTimeDate);

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
