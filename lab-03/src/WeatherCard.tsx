import React from 'react';
import type { WeatherData } from './types';

interface WeatherCardProps {
  data: WeatherData | null;
  onDelete: (id: number) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, onDelete }) => {
  if (!data) {
    return <div className="no-data">No weather data available</div>;
  }

  return (
    <div className="weather-card">
      <div className="weather-info">
        <h2>{data.city}</h2>
        <p><strong>Temperature:</strong> {data.temperature}°C</p>
        <p><strong>Condition:</strong> {data.condition}</p>
        <p><strong>Humidity:</strong> {data.humidity}%</p>
        <p><strong>Wind Speed:</strong> {data.windSpeed} km/h</p>
        <p className="timestamp">Last Updated: {data.timestamp}</p>
      </div>
      <button className="delete-btn" onClick={() => onDelete(data.id)}>Delete</button>
    </div>
  );
};

export default WeatherCard;