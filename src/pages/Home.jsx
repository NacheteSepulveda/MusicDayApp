import React from 'react'
import WeatherCard from '../components/WeatherCard'
import FeelingCard from '../components/FeelingCard'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate(); 

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center">¡Bienvenido, que gusto tenerte aqui!</h1>
      <br />
      
      <h2 className="text-2xl font-bold text-center">Cuentanos, ¿Cómo te sientes?</h2>
      <FeelingCard />

      <br />
      <h2 className="text-2xl font-bold text-center">¿Qué nos deparará el día de hoy?</h2>
      <WeatherCard />

      <br />
      <h2 className="text-2xl font-bold text-center">¿Quieres encender el momento? ¡Esta es tu playlist! 🎵</h2>
      <button onClick={() => navigate("/MyPlaylist")}>
      Ir a Mi Playlist
      </button>

      <br />

    </div>
  )
}

export default Home