import React, { useState } from 'react';
import type { WeatherData } from './types';

interface WeatherFormProps {
  onAddData: (data: WeatherData) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onAddData }) => {
  const [formData, setFormData] = useState({
    city: '',
    temperature: '',
    condition: 'Sunny',
    humidity: '',
    windSpeed: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const temperature = Number(formData.temperature);
    const humidity = Number(formData.humidity);
    const windSpeed = Number(formData.windSpeed);

    if (!formData.city.trim() || formData.temperature === '' || formData.humidity === '' || formData.windSpeed === '') {
      alert("Please fill out all fields.");
      return;
    }

    if (temperature < -90 || temperature > 60 || humidity < 0 || humidity > 100 || windSpeed < 0) {
      alert("Enter a temperature from -90 to 60, humidity from 0 to 100, and a non-negative wind speed.");
      return;
    }
    
    const newWeatherData: WeatherData = {
      id: Date.now(),
      city: formData.city.trim(),
      temperature,
      condition: formData.condition,
      humidity,
      windSpeed,
      timestamp: new Date().toLocaleTimeString()
    };

    onAddData(newWeatherData);
    
    setFormData({
      city: '',
      temperature: '',
      condition: 'Sunny',
      humidity: '',
      windSpeed: ''
    });
  };

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City Name" aria-label="City name" />
      <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="Temperature (°C)" aria-label="Temperature in Celsius" min="-90" max="60" />
      
      <select name="condition" value={formData.condition} onChange={handleChange}>
        <option value="Sunny">Sunny</option>
        <option value="Cloudy">Cloudy</option>
        <option value="Rainy">Rainy</option>
        <option value="Stormy">Stormy</option>
      </select>

      <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} placeholder="Humidity (%)" aria-label="Humidity percentage" min="0" max="100" />
      <input type="number" name="windSpeed" value={formData.windSpeed} onChange={handleChange} placeholder="Wind Speed (km/h)" aria-label="Wind speed in kilometers per hour" min="0" />
      
      <button type="submit">Add Weather</button>
    </form>
  );
};

export default WeatherForm;