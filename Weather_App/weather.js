"use strict";

// convert longi and lati to city name
const ConverLongiAndLati = async () => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=kolkata&limit=5&appid=6b556005dae9d19ffd7918ac69d92c9f`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log("convert longi and lati to city name", data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
// ConverLongiAndLati();

// waether data fething
const fetchWeatherData = async () => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=6b556005dae9d19ffd7918ac69d92c9f",
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

fetchWeatherData();

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
