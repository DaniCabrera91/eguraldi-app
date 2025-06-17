import { useState } from "react";
import WeatherMap from "./WeatherMap";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city) return setError("Por favor ingresa una ciudad");
    try {
      const response = await fetch(
        `https://eguraldi-app.onrender.com/weather?city=${city}`
      );
      if (!response.ok) throw new Error("Ciudad no encontrada");
      const result = await response.json();
      setData(result);
      setError("");
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const handleMapClick = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://eguraldi-app.onrender.com/weather/coords?lat=${lat}&lon=${lon}`
      );
      if (!response.ok)
        throw new Error("Error al obtener clima por coordenadas");
      const result = await response.json();
      setData(result);
      setCity(result.city);
      setError("");
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div className="container">
      <h2>Buscar tiempo por ciudad</h2>
      <input
        type="text"
        placeholder="Ej: Madrid"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch} disabled={!city.trim()}>
        Buscar
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <>
          <div style={{ marginTop: "1rem" }}>
            <h3>Tiempo en {data.city}</h3>
            <p>Temperatura: {data.temperature}°C</p>
            <p>Descripción: {data.weather}</p>
          </div>
          <WeatherMap
            lat={data.lat}
            lon={data.lon}
            city={data.city}
            weather={data.weather}
            onMapClick={handleMapClick}
          />
        </>
      )}
    </div>
  );
};

export default WeatherSearch;
