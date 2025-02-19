import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { deleteSong } from "../api/SongsApi";


function MyPlaylist({playlist}) {
  return (
    <div 
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "80vh", // 📌 Mantiene la tabla centrada en la pantalla
    }}>

    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Canción</TableCell>
              <TableCell>Artista</TableCell>
              <TableCell>Reproducir</TableCell>
              <TableCell>Agregado El: </TableCell>
              <TableCell>Duracion: </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlist.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No hay canciones en la playlist.</TableCell>
              </TableRow>
            ) : (
              playlist.map((song, index) => (
                <TableRow key={index}>
                  <TableCell>{song.nombre_cancion}</TableCell>
                  <TableCell>{song.nombre_artista}</TableCell>
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
                  <TableCell>{song.fecha_agregado}</TableCell>
                  <TableCell>{song.duracion}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteSong(song.id)}
                    >
                      ❌ Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      
    </div>
  )
}

export default MyPlaylist