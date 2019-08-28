import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  // console.log(markers);
  const coordinatesArr = [];
  markers.forEach(marker => coordinatesArr.push(`${marker["lat"]},${marker["lng"]}`));
  const coordinatesString = coordinatesArr.join(';');
  // console.log(coordinatesString);
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinatesString}?access_token=${mapboxgl.accessToken}&geometries=geojson`;
  const request = new XMLHttpRequest();
  request.responseType = 'json';
  request.open('GET', url, true);
  request.onload  = function() {
    var jsonResponse = request.response;
    var distance = jsonResponse.routes[0].distance*0.001;
    var duration = jsonResponse.routes[0].duration/60;
    var coords = jsonResponse.routes[0].geometry;
    console.log(distance);
    console.log(duration);
    console.log(coords)
    map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": coords
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#3b9ddd",
        "line-width": 8,
        "line-opacity": 0.8
      }
    });
  }
  request.send();
};

const initMapbox = () => {
  if (mapElement) {
    const map = buildMap();
    map.on("load", () => {
    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
      addRouteToMap(map, markers);
    })

  }
};

export { initMapbox };
