import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlayList from "../components/PlayList";
import { FetchSongsByAnimo } from "../api/SongsApi";
import { Button } from "@mui/material";

function FeelingPage() {

  const imagesAnimo = {
    "feliz": "https://static.vecteezy.com/system/resources/previews/009/931/402/non_2x/happy-smiling-emoji-cartoon-happiness-emoticon-smile-face-vector.jpg",
    "triste": "https://static.vecteezy.com/system/resources/previews/022/932/677/non_2x/disappointed-emoji-sad-face-unhappy-emoticon-free-vector.jpg",
    "melancolico": "https://www.psicologosencostarica.com/wp-content/uploads/2023/06/Estado-melancolico.jpg"
  };

  const emojisAnimo = {
    "feliz": "😃",
    "triste": "😢",
    "melancolico": "🎭"
  };

  const { animo } = useParams();
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    FetchSongsByAnimo(animo)
      .then((data) => {
        console.log("📌 Canciones recibidas:", data);
        if (data.error) {
          setError("❌ Error en la API: " + data.error);
        } else {
          setSongs(data);
        }
      })
      .catch((error) => {
        console.error("❌ Error en la API:", error);
        setError("❌ No se pudo obtener las canciones.");
      })
      .finally(() => setLoading(false));
  }, [animo]);

  return (
    <div
      style={{
        position: "fixed", // 📌 Fija el fondo en toda la pantalla
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${imagesAnimo[animo]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 🔴 Capa de desenfoque */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)", // Oscurece el fondo
          backdropFilter: "blur(10px)", // 🔴 Difuminado
        }}
      ></div>

      {/* 🔴 Contenido Principal */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "white" }}>
        <h2 className="text-3xl font-bold">Playlist para estar {animo} {emojisAnimo[animo]}</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {loading ? (
          <p>Cargando canciones...</p>
        ) : (
          <PlayList songs={songs} />
        )}

        {/* Botón de volver */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
}

export default FeelingPage;
