import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapElement = document.getElementById('map');

const buildMap = () => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
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
  markers.forEach(marker => coordinatesArr.push(`${marker["lng"]},${marker["lat"]}`));
  const coordinatesString = coordinatesArr.join(';');
  console.log(coordinatesString);
  console.log(markers)
  // const [marker1, marker2] = markers;
  // const formatted = []
  // markers.map(({lat, lng}) => formatted.push([lng, lat]))
  const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordinatesString}?access_token=${mapboxgl.accessToken}&geometries=geojson&steps=true`;
  const request = new XMLHttpRequest();
  request.responseType = 'json';
  request.open('GET', url, true);
  request.onload  = function() {
    var jsonResponse = request.response;
    var data = request.response.routes[0];
    var distance = jsonResponse.routes[0].distance*0.001;
    var duration = jsonResponse.routes[0].duration/60;
    var coords = jsonResponse.routes[0].geometry;
    console.log(distance);
    console.log(duration);
    console.log(coords.coordinates)
    var instructions = document.getElementById('instructions');
    var steps = data.legs[0].steps;

    var tripInstructions = [];
    for (var i = 0; i < steps.length; i++) {
      tripInstructions.push('<br><li>' + steps[i].maneuver.instruction) + '</li>';
      instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration / 60) + ' min 🚴 </span>' + tripInstructions;
    }
    map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": coords.coordinates
          }
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#888",
        "line-width": 8
      }
    });
  }
  request.send();
};



const initMapbox = () => {
  if (mapElement) {
    const map = buildMap();
    map.on("load", function(){

      const markers = JSON.parse(mapElement.dataset.markers);
      addMarkersToMap(map, markers);
      fitMapToMarkers(map, markers);
      addRouteToMap(map, markers);
    })
    // map.on("load", () => {
      // x(map);
    // })

  }
};



export { initMapbox };
