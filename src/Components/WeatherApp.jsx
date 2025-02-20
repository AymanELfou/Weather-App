import './style.css';
import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);

    const apiKey = "7f0a8492114966345169cb1a198e9c30";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    async function checkWeather() {
        if (!city.trim()) return;

        try {
            const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
            const data = await response.json();
            console.log("API Response:", data); // Vérifier la réponse

            if (response.status === 404 || data.cod === "404") {
                setError(true);
                setWeather(null);
            } else {
                setError(false);
                setWeather(data);
            }
        } catch (err) {
            console.error("Error fetching weather data:", err);
            setError(true);
            setWeather(null);
        }
    }

    useEffect(() => {
        console.log("Weather state updated:", weather);
    }, [weather]); // Vérifier si l'état change

    return (
        <div className="weather-card">
            <div className="search">
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city name" 
                />
                <button onClick={checkWeather}>
                    <img src="images/search.png" alt="Search" />
                </button>
            </div>

            {error && <div className="error">Invalid city name</div>}

            {weather && weather.main && weather.weather && (
                <div className="current-weather">
                    <img 
                        src={`images/${weather.weather[0].main.toLowerCase()}.png`} 
                        alt={weather.weather[0].main} 
                        className="weather-icon" 
                    />
                    <h1>{Math.round(weather.main.temp)}°C</h1>
                    <h2>{weather.name}</h2>
                    <div className="details">
                        <div className="weather-detail">
                            <img src="images/humidity.png" alt="Humidity" />
                            <div>
                                <p className="humidity">{weather.main.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="weather-detail">
                            <img src="images/wind.png" alt="Wind Speed" />
                            <div>
                                <p className="wind">{weather.wind.speed} km/h</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
