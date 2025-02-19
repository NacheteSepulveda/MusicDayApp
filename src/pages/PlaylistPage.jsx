import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from'react-router-dom'
import PlayList from '../components/PlayList'
import { FetchSongs } from '../api/SongsApi'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MyPlaylist from '../components/MyPlaylist'

function PlaylistPage() {

    const images = {
      "soleado": "https://previews.123rf.com/images/rozum/rozum1108/rozum110800071/10122270-paisaje-hermoso-y-soleado-composici%C3%B3n-de-la-naturaleza.jpg",
      "nublado": "https://img.freepik.com/fotos-premium/puesta-sol-playa-dia-nublado-verano_212328-909.jpg",
      "lluvioso": "https://previews.123rf.com/images/sergpet/sergpet1703/sergpet170300078/74551314-gotas-de-lluvia-en-la-ventana-d%C3%ADa-lluvioso.jpg"
    }

    const emojisClima = {
      "soleado": "☀️",
      "nublado": "🌥️",
      "lluvioso": "🌧️"
    };
    

    const {clima} = useParams();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
      setLoading(true);
      FetchSongs(clima)
          .then((data) => {
              setSongs(data);
              setLoading(false);
          })
          .catch((error) => {
              console.error("Error al obtener canciones:", error);
              setLoading(false);
          });
  }, [clima]);

  const handleReturn = () => {
    navigate('/'); 
  };

  const addToPlaylist = (song) => {
    setPlaylist((prev) => {
      // Verificamos si la canción ya existe en la playlist
      if (!prev.some((item) => item.nombre_cancion === song.nombre_cancion)) {
        return [...prev, song]; // 📌 Agregar si no está en la lista
      }
      return prev; // Si ya existe, no hacer nada
    });
  };

    
    return (
      <div
      style={{
        position: "fixed", // 🔴 Fija la imagen de fondo en toda la pantalla
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${images[clima]})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // 🔴 Cambiado de "absolute" a "center"
        backgroundRepeat: "fixed",
      }}
    >
      {/* 🔴 Capa de desenfoque */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(3px)", // 🔴 Difuminado
          zIndex: 0,
        }}
      ></div>

      {/* 🔴 Contenido Principal */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <h2 className="text-3xl font-bold" 
        style={{color: "#eee"}} >Playlist para un día {clima} {emojisClima[clima]}</h2>

        {loading ? (
          <p>Cargando canciones...</p>
        ) : (
          <PlayList songs={songs} addToPlaylist={addToPlaylist}/>
        )}

        {/* Botón de volver */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleReturn}
          style={{ marginTop: "20px" }}
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
}

export default PlaylistPage