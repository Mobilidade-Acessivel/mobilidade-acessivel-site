import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapPage.css'; 

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuZGFucDMiLCJhIjoiY20xdjNobGVtMDRkYjJrb296c2F3Nm81NCJ9.usT16SS5S-Evxx1M7v92vw'; 

const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null); 
  const [map, setMap] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
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

    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=${mapboxgl.accessToken}`);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].geometry.coordinates;
      setMapLocation([longitude, latitude]); 
    } else {
      alert('Local não encontrado.');
    }
  };

  const drawRoute = async () => {
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
            'line-color': '#007bff', // Azul
            'line-width': 6, // Ajuste a largura se necessário
          },
        });
      }

      // Adiciona um marcador na localização do destino
      new mapboxgl.Marker({ 
        // Altere o caminho para o seu ícone
        element: createCustomMarker(),
      })
      .setLngLat(mapLocation)
      .addTo(map);
    } else {
      alert('Rota não encontrada.');
    }
  };

  const createCustomMarker = () => {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'custom-marker'; // Adicione uma classe para estilização se necessário
    markerDiv.style.backgroundImage = 'url(./assets/pinoloc.png)'; // Substitua pelo caminho do seu ícone
    markerDiv.style.width = '30px'; // Ajuste o tamanho do ícone
    markerDiv.style.height = '30px'; // Ajuste o tamanho do ícone
    markerDiv.style.backgroundSize = 'cover'; // Para cobrir a div com a imagem
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
  }, [userLocation, mapLocation]);

  return (
    <div className="map-container">
      <div className="sidebar">
        <h2>Pesquisar Local</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Digite um local..."
        />
        <button onClick={searchLocation}>Buscar</button>
      </div>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default MapPage;
