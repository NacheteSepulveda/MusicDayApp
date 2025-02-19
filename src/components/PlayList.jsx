import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { addToMyPlaylist, getTotalDuracion} from "../api/SongsApi";



async function getSongDuration(url) {
  try {
    const trackId = url.split("/").pop();
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: { Authorization: `Bearer YOUR_SPOTIFY_ACCESS_TOKEN` },
    });
    const trackData = await response.json();

    if (!trackData || !trackData.duration_ms) {
      console.warn("⚠️ No se pudo obtener la duración. Asignando 00:01.");
      return "00:00:01"; // Valor predeterminado
    }

    const totalSeconds = Math.floor(trackData.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error("❌ Error obteniendo la duración de la canción:", error);
    return "00:00:01"; // Valor predeterminado en caso de error
  }
}

function PlayList({ songs}) {

  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddToPlaylist = async (song) => {
    setLoading(true);

    // 🔹 Verificar si playlist está definido antes de usar .some()
    if (!playlist) {
      console.error("❌ Error: playlist no está definido.");
      setLoading(false);
      return;
    }

    // 🔹 Verificar si la canción ya está en la playlist
    const alreadyInPlaylist = playlist.some(
      (item) =>
        item.nombre_cancion === song.nombre_cancion &&
        item.nombre_artista === song.nombre_artista
    );

    if (alreadyInPlaylist) {
      alert("⚠️ Canción ya insertada!");
      setLoading(false);
      return;
    }

    try {
      // 🔹 Obtener duración de Spotify
      const duracion = await getTotalDuracion(song.url);

      const newSong = {
        ...song,
        duracion, // Asignamos la duración obtenida
      };

      await addToMyPlaylist(newSong);

      setPlaylist([...playlist, newSong]); // 🔹 Asegurar que setPlaylist está disponible
      alert("✅ Canción añadida exitosamente!");
    } catch (error) {
      console.error("❌ Error al añadir canción a la playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",  
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
        <Table sx={{ minWidth: 400 }} aria-label="playlist table">
          <caption>Lista de canciones disponibles</caption>
          <TableHead>
            <TableRow>
              <TableCell>Nombre de la Canción</TableCell>
              <TableCell>Artista</TableCell>
              <TableCell>Álbum</TableCell>
              <TableCell>Reproducir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay canciones disponibles.
                </TableCell>
              </TableRow>
            ) : (
              songs
                .map((song, index) => (
                  <TableRow key={index}>
                    <TableCell>{song.nombre_cancion}</TableCell>
                    <TableCell>{song.nombre_artista}</TableCell>
                    <TableCell>{song.disco}</TableCell>
                    <TableCell>
                      <iframe
                        src={`https://open.spotify.com/embed/track/${song.url.split("/").pop()}`}
                        width="270"
                        height="80"
                        frameBorder="0"
                        allow="encrypted-media"
                        title={song.nombre_cancion}
                      ></iframe>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleAddToPlaylist(song)}>Agregar a PlayList ➕</Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>  
        </Table>
      </TableContainer>
    </div>
  );
}

export default PlayList;
