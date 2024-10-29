import React, { useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapPage.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuZGFucDMiLCJhIjoiY20xdjNobGVtMDRkYjJrb296c2F3Nm81NCJ9.usT16SS5S-Evxx1M7v92vw';

const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [mapLocation, setMapLocation] = useState(null);

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    } else {
      alert('Geolocalização não é suportada pelo seu navegador');
    }
  };

  const searchLocation = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=${mapboxgl.accessToken}`);
      const data = await response.json();

      if (data.features && Array.isArray(data.features) && data.features.length > 0) {
        const locations = data.features.map(feature => ({
          name: feature.place_name,
          coordinates: feature.geometry.coordinates,
        }));
        setSuggestions(locations);
      } else {
        alert('Local não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar local:', error);
      alert('Ocorreu um erro ao buscar o local.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (suggestions.length > 0) {
        const selectedLocation = suggestions[0];
        setMapLocation(selectedLocation.coordinates);
        setSearchTerm(selectedLocation.name);
        setSuggestions([]);
      } else {
        searchLocation();
      }
    }
  };

  const handleSuggestionClick = (coordinates, name) => {
    setMapLocation(coordinates);
    setSearchTerm(name);
    setSuggestions([]);
  };

  const drawRoute = useCallback(async () => {
    if (!userLocation || !mapLocation) return;

    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${mapLocation[0]},${mapLocation[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const routeGeoJSON = {
        type: 'Feature',
        geometry: data.routes[0].geometry,
      };

      if (map.getSource('route')) {
        map.getSource('route').setData(routeGeoJSON.geometry);
      } else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: routeGeoJSON,
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#007bff',
            'line-width': 6,
          },
        });
      }

      new mapboxgl.Marker({
        element: createCustomMarker(),
      })
        .setLngLat(mapLocation)
        .addTo(map);
    } else {
      alert('Rota não encontrada.');
    }
  }, [userLocation, mapLocation, map]);

  const createCustomMarker = () => {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'custom-marker';
    markerDiv.style.backgroundImage = 'url(./assets/pinoloc.png)';
    markerDiv.style.width = '700px';
    markerDiv.style.height = '30px';
    markerDiv.style.backgroundSize = 'cover';
    return markerDiv;
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const initializedMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation,
        zoom: 12,
      });

      new mapboxgl.Marker().setLngLat(userLocation).addTo(initializedMap);
      setMap(initializedMap);
      return () => initializedMap.remove();
    }
  }, [userLocation]);

  useEffect(() => {
    if (userLocation && mapLocation) {
      drawRoute();
    }
  }, [userLocation, mapLocation, drawRoute]);

  return (
    <div className="map-container">
      <div className="sidebar">
        <h2>Pesquisar Local</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchLocation(); // Pesquisa enquanto o usuário digita
          }}
          onKeyPress={handleKeyPress}
          placeholder="Digite um local..."
        />
        <button onClick={searchLocation}>Buscar</button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion.coordinates, suggestion.name)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div id="map"></div> {/* Removido estilo inline */}
    </div>
  );
};

export default MapPage;
