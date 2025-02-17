import './style.css'
import React from 'react'
import { useState } from 'react'

export default function WheatherApp() {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);
  
    const apiKey = "7f0a8492114966345169cb1a198e9c30";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";











  return (
    <div>
      
    </div>
  )
}
