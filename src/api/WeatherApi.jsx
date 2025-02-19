const API_KEY = "8b4cdb987eccf3981ff8b4e7241ebb30"; // Reemplaza con tu API Key
const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

export async function FetchWeather(lat, lon) {
    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric&lang=es`);
        if (!response.ok) {
            throw new Error("Error al obtener clima");
        }
        const data = await response.json();

        return {
            temperatura: data.current.temp,
            descripcion: data.current.weather[0].description,
            icono: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`  
        };

    } catch (error) {
        console.error("Error:", error.message);
        return { temperatura: "N/A", descripcion: "Error al obtener el clima" };
    }
}