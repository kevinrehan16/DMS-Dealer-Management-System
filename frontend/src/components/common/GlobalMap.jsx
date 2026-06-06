import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

// Fix para sa marker icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

function SearchControl({ setPosition }) {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      autoClose: true,
      searchLabel: 'Mag-search ng lugar...',
      keepResult: true, // Pananatilihin ang marker sa lugar kahit tapos na ang search
      retainZoomLevel: false, // Hahayaan ang flyTo na mag-zoom ng maayos
      animateZoom: true,
    });
    map.addControl(searchControl);

    // Event kapag may napili sa search
    map.on('geosearch/showlocation', (result) => {
      const { x, y } = result.location; // x = lng, y = lat
      setPosition({ lat: y, lng: x });
    });

    return () => map.removeControl(searchControl);
  }, [map, setPosition]);
  return null;
}

function MapClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      // Kapag kinlik ng user ang mapa, lipat ang marker sa lat/lng na yun
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function SimpleMap() {
  const [position, setPosition] = useState({ lat: 14.455594, lng: 121.052184 });

  // Event handler para kapag na-drag ang marker
  const onDragEnd = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setPosition({ lat, lng });
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', marginTop: '10px' }}>
        <strong>Coordinates:</strong> {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
      </div>

      <div style={{ width: '100%', height: '500px' }}>
        {/* key={JSON.stringify(position)} forces the map to re-center when position changes */}
        <MapContainer 
          key={`${position.lat}-${position.lng}`} 
          center={[position.lat, position.lng]} 
          zoom={19} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <SearchControl setPosition={setPosition} />
          
          <MapClickHandler setPosition={setPosition} />

          <Marker 
            position={[position.lat, position.lng]} 
            draggable={true} 
            eventHandlers={{ dragend: onDragEnd }} 
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default SimpleMap;