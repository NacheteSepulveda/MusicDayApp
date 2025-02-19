import React from 'react'
import { useEffect } from 'react'
import MyPlaylist from '../components/MyPlaylist'
import { Button } from '@mui/material'
import { useNavigate } from'react-router-dom'
import { useState } from 'react'
import { deleteSong, getPlaylist, getTotalDuracion } from '../api/SongsApi'

function MyPlaylistPage() {

    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState([]);
    const [totalDuracion, setTotalDuracion] = useState([]);

    useEffect(() => {
        async function fetchPlaylist() {
            try {
                const data = await getPlaylist(); // ✅ Llamada correcta a la función
                setPlaylist(data);
            } catch (error) {
                console.error("❌ Error obteniendo la playlist:", error);
            }
        }
        fetchPlaylist();

        async function fetchTotalDuracion() {
            try {
                const response = await getTotalDuracion();
                setTotalDuracion(response.totalDuracion);
            } catch (error) {
                console.error("�� Error obteniendo la duración total:", error);
            }
        }   
        fetchTotalDuracion();
    }, [playlist]);

    const handleRemove = async (id) => {
        await deleteSong(id);
        setPlaylist((prevPlaylist) => prevPlaylist.filter(song => song.id !== id));     
    };

    const handleReplacePlaylist = async () => {
        await replacePlaylist();
        const updatedPlaylist = await getPlaylist();
        setPlaylist(updatedPlaylist);
        alert("🎵 Playlist actualizada con nuevas canciones!");
    };

  return (
    <div
    style={{
        position: "fixed", // 🔴 Fija la imagen de fondo en toda la pantalla
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://cdn.shopify.com/s/files/1/0657/3100/2634/files/papierpeintmusique-casqueaudio.png?v=1715586351)`,
        backgroundSize: "cover",
        backgroundPosition: "center", // 🔴 Cambiado de "absolute" a "center"
        backgroundRepeat: "fixed",
    }}>

        <h2 style={{color: "white"}}> Duración total de la Playlist: {totalDuracion} ⏱️ </h2>


        <MyPlaylist playlist={playlist} removeFromPlaylist={handleRemove} />

        <br />

        {/* 🔹 Asegurar que el botón de Material UI no esté dentro de un <button> */}
        <Button onClick={() => navigate('/')} variant="contained" color="primary">
            Volver al Inicio
        </Button>

            

    </div>
  )
}

export default MyPlaylistPage