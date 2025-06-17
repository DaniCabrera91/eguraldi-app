import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

// Marcador personalizado
const icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1116/1116453.png",
  iconSize: [32, 32],
});

// Mover el mapa al cambiar lat/lon
const ChangeMapView = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 10);
  }, [lat, lon, map]);
  return null;
};

// Manejador de clics en el mapa
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });
  return null;
};

const WeatherMap = ({ lat, lon, city, weather, onMapClick }) => {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={10}
      scrollWheelZoom={false}
      className="map-wrapper"
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <ChangeMapView lat={lat} lon={lon} />

      <Marker position={[lat, lon]} icon={icon}>
        <Popup>
          {city}: {weather}
        </Popup>
      </Marker>

      <MapClickHandler onMapClick={onMapClick} />
    </MapContainer>
  );
};

export default WeatherMap;
