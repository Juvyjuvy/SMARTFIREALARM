import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';

// Custom fire icon
const fireIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/619/619034.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

// Fire locations array
const fireLocations = [
  { lat: 8.228216, lng: 124.244895 },
  { lat: 8.228316, lng: 124.245195 },
  { lat: 8.228416, lng: 124.244695 },
  { lat: 8.228116, lng: 124.244995 },
];

function MapPage() {
  return (
    <div className='map-section'>
      <MapContainer center={[8.228216, 124.244895]} zoom={18} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {fireLocations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]} icon={fireIcon}>
            <Popup>🔥 Fire reported here</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapPage;
