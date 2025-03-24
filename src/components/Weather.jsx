import React, { useEffect, useState } from 'react';
import {
  WiCloud,
  WiRain,
  WiDaySunny,
  WiCloudy,
  WiThermometer,
} from 'react-icons/wi';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Chenaran');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('City not found or invalid request');
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Clouds':
        return <WiCloudy />;
      case 'Rain':
        return <WiRain />;
      default:
        return <WiCloud />;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center p-6">
        <div className="text-5xl font-semibold">{city.toUpperCase()}</div>
        <div className="text-lg text-gray-400">
          {weather.weather[0].description.toUpperCase()}
        </div>
        <div className="text-[14rem] py-4">
          {getWeatherIcon(weather.weather[0].main)}
        </div>
        <div className="flex items-center space-x-4 py-4">
          <div className="mr-0 flex-shrink-0 h-7">
            <WiThermometer className="text-4xl" />
          </div>
          <div className="text-2xl">{weather.main.temp_min - 1}°</div>
          <div className="text-2xl">/</div>
          <div className="text-3xl font-bold flex items-center">
            <div>{weather.main.temp}°</div>
          </div>
          <div className="text-2xl">/</div>
          <div className="text-2xl">{weather.main.temp_max + 1}°</div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
