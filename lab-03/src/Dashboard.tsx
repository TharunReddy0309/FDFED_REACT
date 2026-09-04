import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import WeatherForm from './WeatherForm';
import WeatherCard from './WeatherCard';
import type { WeatherData } from './types';

const CITIES = ["London", "Tokyo", "New York", "Sydney", "Mumbai", "Paris", "Berlin"];
const CONDITIONS = ["Sunny", "Cloudy", "Rainy", "Stormy"];

const generateRandomWeather = (): WeatherData => ({
  id: Date.now() + Math.random(),
  city: CITIES[Math.floor(Math.random() * CITIES.length)],
  temperature: Math.floor(Math.random() * 50),
  condition: CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)],
  humidity: Math.floor(Math.random() * 101),
  windSpeed: Math.floor(Math.random() * 151),
  timestamp: new Date().toLocaleTimeString(),
});

const Dashboard: React.FC = () => {
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherList((prevList) => [generateRandomWeather(), ...prevList]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (weatherList.length > 0) {
      const latestTemp = weatherList[0].temperature;
      if (latestTemp < 20) setTheme('#add8e6');
      else if (latestTemp >= 20 && latestTemp <= 30) setTheme('#90ee90');
      else if (latestTemp >= 31 && latestTemp <= 40) setTheme('#ffb347');
      else setTheme('#ff6961');
    }
  }, [weatherList, setTheme]);

  const handleAddData = (data: WeatherData) => {
    setWeatherList((prevList) => [data, ...prevList]);
  };

  const handleDelete = (id: number) => {
    setWeatherList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const filteredList = weatherList.filter((item) =>
    item.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Live conditions</p>
          <h1>Smart Weather Dashboard</h1>
        </div>
        <span className="update-badge">Updates every 5 seconds</span>
      </header>
      
      <div className="controls">
        <WeatherForm onAddData={handleAddData} />
        
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search for a city..."
          aria-label="Search weather by city"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>

      <div className="cards-grid">
        {filteredList.length > 0 ? (
          filteredList.map((weather) => (
            <WeatherCard key={weather.id} data={weather} onDelete={handleDelete} />
          ))
        ) : (
          <h2>No weather data available</h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;