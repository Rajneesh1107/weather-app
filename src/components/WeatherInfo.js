import React, { useState, useEffect } from "react";
import Forecast from "./Forecast";

const API_KEY = "f56f24967aaf51182d1d4df628297c6d";

function WeatherInfo({ city }) {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentWeatherData(data);
        setLoading(false);
        console.log(data)
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city]);

  return (
    <div>
      <div className="date-time">
        {loading ? "Loading date..." : new Date().toLocaleString("en-GB")}
      </div>
      <h1 className="city-name">
        {loading ? "Loading city..." : currentWeatherData.name}
      </h1>
      <div className="weather-info">
        {loading ? (
          <div>Loading icon...</div>
        ) : (
          <>
            <img
              className="weather-icon"
              src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@4x.png`}
              alt={currentWeatherData.weather[0].description}
            />
            <p>{currentWeatherData.weather[0].description}</p>
          </>
        )}
      </div>
      <h2 className="temperature">
        {loading
          ? "Loading temperature..."
          : `${currentWeatherData.main.temp}°C`}
      </h2>
      {loading ? (
        <div className="loading-forecast">Loading forecast...</div>
      ) : (
        <Forecast
          lat={currentWeatherData.coord.lat}
          lon={currentWeatherData.coord.lon}
        />
      )}

      {error && <div>{error}</div>}
    </div>
  );
}

export default WeatherInfo;
