import mapboxgl from 'mapbox-gl';

const mapElement = document.getElementById('map');

const buildMap = () => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10'
  });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .addTo(map);
  });
};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};

const addRouteToMap = (map, markers) => {
  console.log(markers);
  const coordinatesArr = [];
  markers.forEach(marker => coordinatesArr.push(`${marker["lat"]},${marker["lng"]}`));
  const coordinatesString = coordinatesArr.join(';');
  console.log(coordinatesString);
  $.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinatesString}?access_token=${mapboxgl.accessToken}&geometries=geojson`, data => {

    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: data.routes[0].geometry,
        },
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#ff7e5f',
        'line-width': 8,
      },
    })
  })
};

const initMapbox = () => {
  if (mapElement) {
    const map = buildMap();
    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
    addRouteToMap(map, markers);
  }
};

export { initMapbox };
