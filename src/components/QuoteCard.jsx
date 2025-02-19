import React from 'react'
import { useEffect, useState } from "react";
import { FetchWeather } from "../api/WeatherApi";

function WeatherDisplay() {
    const [weather, setWeather] = useState({temperatura: "Cargando...", descripcion: "", icono: ""});

    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const data = await FetchWeather(lat, lon);
                setWeather(data);
            },
            (error) => {
                setLocationError("No se pudo obtener la ubicación.");
                console.error("Error de geolocalización:", error.message);
            }
        );
    } else {
        setLocationError("Geolocalización no soportada en este navegador.");
    }
    }, []); 


  return (
    <div className="p-4 border rounded-lg bg-gray-100 shadow-lg max-w-lg mx-auto mt-4">
      {locationError ? (
                <p className="text-red-500">{locationError}</p>
            ) : (
                <>
                    {weather.icono && <img src={weather.icono} alt="Icono del clima" className="w-12 h-12 mr-4" />}
                    <div>
                        <p className="text-lg font-semibold">{weather.temperatura}°C</p>
                        <p className="text-gray-600">{weather.descripcion}</p>
                    </div>
                </>
            )}
    </div>
  )
}

export default WeatherDisplay