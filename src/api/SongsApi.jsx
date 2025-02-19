export async function FetchSongs() {
    try {
        const response = await fetch("http://localhost:3001/api/songs");
        if (!response.ok) {
            throw new Error("Error al obtener canciones");
        }
        return await response.json();
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

export async function FetchSongsByClima(clima) {
    try {
        const response = await fetch(`http://localhost:3001/api/songsxclima/${clima}`);
        if (!response.ok) {
            throw new Error("Error al obtener canciones");
        }
        return await response.json();
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

export async function FetchSongsByAnimo(animo) {
    try {
        const response = await fetch(`http://localhost:3001/api/songsxanimo/${animo}`);
        if (!response.ok) {
            throw new Error("Error al obtener canciones");
        }
        return await response.json();
    } catch (err) {
        console.error("Error:", err.message);
        throw err;
    }
}

export async function getPlaylist() {
    try {
        const response = await fetch("http://localhost:3001/api/miplaylist/");
        if (!response.ok) {
            throw new Error("❌ Error al obtener la playlist.");
        }
        return await response.json();
    } catch (error) {
        console.error("❌ Error:", error.message);
        throw error;
    }
}

export async function addToMyPlaylist(song) {
    try {
        // Primero, obtenemos la playlist actual para verificar duplicados
        const playlist = await getPlaylist();
        const alreadyExists = playlist.some(
            (item) => item.nombre_cancion === song.nombre_cancion &&
                      item.nombre_artista === song.nombre_artista
        );

        if (alreadyExists) {
            console.warn("Esta canción ya está en la playlist.");
            return { message: "La canción ya está en la playlist!." };
        }

        // Si no está duplicada, la agregamos
        const response = await fetch("http://localhost:3001/api/miplaylist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(song),
        });

        if (!response.ok) {
            throw new Error("Error al agregar la canción a la playlist");
        }

        return await response.json();
    } catch (err) {
        console.error("Error al agregar canción:", err.message);
        throw err;
    }
}

export async function deleteSong(id) {
    try {
        const response = await fetch(`http://localhost:3001/api/miplaylist/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("❌ Error al eliminar la canción de la playlist.");
        }

        alert("Canción eliminada exitosamente! ");

        return await response.json();
    } catch (error) {
        console.error("❌ Error al eliminar la canción:", error);
        throw error;
    }
}

export async function getTotalDuracion() {
    try {
        const response = await fetch("http://localhost:3001/api/miplaylist/duraciontotal");
        if (!response.ok) {
            throw new Error("❌ Error al obtener la playlist.");
        }
        return await response.json();
    } catch (error) {
        console.error("❌ Error:", error.message);
        throw error;
    }
}





