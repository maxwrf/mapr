import GMaps from 'gmaps/gmaps.js';

const styles = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "hue": "#FFA800"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 0
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "hue": "#53FF00"
            },
            {
                "saturation": -73
            },
            {
                "lightness": 40
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "hue": "#FBFF00"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 0
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "hue": "#00FFFD"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 30
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#00BFFF"
            },
            {
                "saturation": 6
            },
            {
                "lightness": 8
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "hue": "#679714"
            },
            {
                "saturation": 33.4
            },
            {
                "lightness": -25.4
            },
            {
                "gamma": 1
            }
        ]
    }
];

const initOverall = () => {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  const mapElement = document.getElementById('mapall');
  const markers = JSON.parse(mapElement.dataset.markers);
  let travelMode = JSON.parse(mapElement.dataset.travelmode).toUpperCase();
  if (travelMode == "TRANSIT") {travelMode = "DRIVING"}

  const map = new google.maps.Map(document.getElementById(`mapall`));

  directionsDisplay.setMap(map);

  console.log(travelMode)

  let drop = markers.slice();
  drop.shift();
  drop.pop();



  let waypts = [];
  drop.forEach((marker) => waypts.push({
        location: marker,
        stopover: true
      }))



  var request = {
    origin: new google.maps.LatLng(markers[0].lat, markers[0].lng),
    waypoints: waypts,
    destination: new google.maps.LatLng(markers[markers.length-1].lat, markers[markers.length-1].lng),
    travelMode: eval(`google.maps.DirectionsTravelMode.${travelMode}`)
  };
  directionsService.route(request, function(response, status) {
  //Check if request is successful.
  if (status == google.maps.DirectionsStatus.OK) {
    directionsDisplay.setDirections(response); //Display the directions result
    // response.routes[0].legs.forEach((leg) => {console.log(leg.start_address); console.log(leg.end_address); console.log(leg.distance); console.log(leg.duration); console.log(leg.steps);})
  }
});
}

const init = (mapElement, index) => {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  // const mapElement = document.getElementById('map');
  const markers = JSON.parse(mapElement.dataset.markers);
  const travelMode = JSON.parse(mapElement.dataset.travelmode).toUpperCase();

  const map = new google.maps.Map(document.getElementById(`map${index}`, {
          center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
          zoom: 8,
          gestureHandling: 'cooperative'
        }));

  directionsDisplay.setMap(map);

  console.log(travelMode)

  var request = {
    origin: new google.maps.LatLng(markers[0].lat, markers[0].lng),
    // waypoints: waypts,
    destination: new google.maps.LatLng(markers[markers.length-1].lat, markers[markers.length-1].lng),
    travelMode: eval(`google.maps.DirectionsTravelMode.${travelMode}`)
  };
  directionsService.route(request, function(response, status) {
  //Check if request is successful.
  if (status == google.maps.DirectionsStatus.OK) {

    directionsDisplay.setDirections(response); //Display the directions result

    const start = document.getElementById(`start${index}`)
    const end = document.getElementById(`end${index}`)
    const time = document.getElementById(`time${index}`)
    start.innerHTML = `Start: ${response.routes[0].legs[0].start_address}`;
    end.innerHTML = `To: ${response.routes[0].legs[0].end_address}`;
    time.innerHTML = `Travel duration: ${response.routes[0].legs[0].duration.text}`;


    const steps = document.getElementById(`instructionsteps${index}`)
    response.routes[0].legs[0].steps.forEach((step) => {steps.insertAdjacentHTML('beforeend', `<li>${step.instructions}</li>`)})
  }
});
}

const initGmap = () => {
  const mapElementAll = document.getElementById(`mapall`);
  if (mapElementAll) {initOverall(mapElementAll)};
  const mapElements = document.getElementsByClassName('map');
  if (mapElements) {
    var index;
    for (index = 0; index < mapElements.length; ++index) {
      const mapElement = document.getElementById(`map${index}`);
      init(mapElement, index);
    }
  };
}

export { initGmap };
