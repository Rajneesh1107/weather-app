import React, { useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import "./App.css";

function App() {
  const [city, setCity] = useState("Jaunpur");
  const [inputValue, setInputValue] = useState(city); // Manage the input value separately

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCitySearch = (event) => {
    event.preventDefault();
    setCity(inputValue); // Set city when search button is clicked
  };

  const handleSuggestedCityClick = (cityName) => {
    setInputValue(cityName); // Reflect the selected city in the input field
    setCity(cityName); // Update the city state
  };

  return (
    <div className="weather-app">
      <div className="search-box">
        <input
          className="city-search-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter city..."
        />
        <button type="submit" onClick={handleCitySearch}>
          <span role="img" aria-label="search" className="glass-icon">
            🔍
          </span>
        </button>
        <div className="suggested-cities">
          {["Delhi", "Sultanpur", "Pratapgarh", "Goa", "Sikkim"].map(
            (suggestedCity) => (
              <button
                key={suggestedCity}
                className="city-button"
                onClick={() => handleSuggestedCityClick(suggestedCity)}
              >
                {suggestedCity}
              </button>
            )
          )}
        </div>
      </div>
      <WeatherInfo city={city} />
    </div>
  );
}
export default App;
