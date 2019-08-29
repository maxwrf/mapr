import GMaps from 'gmaps/gmaps.js';


// function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
//   directionsService.route({
//     origin: pointA,
//     // waypoints: waypoints,
//     destination: pointB,
//     travelMode: google.maps.TravelMode.DRIVING
//   }, function(response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(response);
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   });
// }


// const directions = (markers, map) => {
//   var directionsService = new google.maps.DirectionsService;
//   var directionsDisplay = new google.maps.DirectionsRenderer({
//       map: map
//     });

//   var pointA = new google.maps.LatLng(markers[0].lat, markers[0].lng);
//   var pointB = new google.maps.LatLng(markers[markers.length-1].lat, markers[markers.length-1].lng);

//   markers.shift();
//   markers.pop();
//   console.log("hello")
//   calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB)
// }

// function calcRoute(markers, directionsService, directionsDisplay) {




// }

// const init = () => {
//   const mapElement = document.getElementById('map');
//   const markers = JSON.parse(mapElement.dataset.markers);
//   if (mapElement) { // don't try to build a map if there's no div#map to inject in
//     let map = new GMaps({ el: '#map', lat: 0, lng: 0 });
//     map.addMarkers(markers);

//     var start = new google.maps.LatLng(markers[0].lat, markers[0].lng);
//     var end = new google.maps.LatLng(markers[markers.length-1].lat, markers[markers.length-1].lng);

//     // map= Ext.getCmp('mapCanvas').getMap();
//     var directionsService = new google.maps.DirectionsService();
//     var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object

//     directionsDisplay.setMap(map); // map should be already initialized.

//     var request = {
//         origin : start,
//         destination : end,
//         travelMode : google.maps.TravelMode.DRIVING
//     };
//     var directionsService = new google.maps.DirectionsService();
//     directionsService.route(request, function(response, status) {
//         if (status == google.maps.DirectionsStatus.OK) {
//             directionsDisplay.setDirections(response);
//         }
//     });
//     if (markers.length === 0) {
//       map.setZoom(2);
//     } else if (markers.length === 1) {
//       map.setCenter(markers[0].lat, markers[0].lng);
//       map.setZoom(14);
//     } else {
//       map.fitLatLngBounds(markers);
//     }
//   }

// }

// function displayRoute(markers) {


// }




// function init() {
//   const mapElement = document.getElementById('map');
//   const markers = JSON.parse(mapElement.dataset.markers);
//     var pointA = new google.maps.LatLng(markers[0].lat, markers[0].lng),
//     pointB = new google.maps.LatLng(markers[markers.length-1].lat, markers[markers.length-1].lng),
//     myOptions = {
//       zoom: 7,
//       center: pointA
//     },
//     map = new google.maps.Map(document.getElementById('map'), myOptions),
//     // Instantiate a directions service.
//     directionsService = new google.maps.DirectionsService,
//     directionsDisplay = new google.maps.DirectionsRenderer({
//       map: map
//     }),
//     markerA = new google.maps.Marker({
//       position: pointA,
//       title: "point A",
//       label: "A",
//       map: map
//     }),
//     markerB = new google.maps.Marker({
//       position: pointB,
//       title: "point B",
//       label: "B",
//       map: map
//     });

//   // get route from A to B
//   calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
//   addMarkers(markers);
// }

// function addMarkers(makers, map) {
//   map.addMarkers(markers);
// };


// function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
//   directionsService.route({
//     origin: pointA,
//     destination: pointB,
//     travelMode: google.maps.TravelMode.DRIVING
//   }, function(response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(response);
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   });
// }

const init = () => {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  const mapElement = document.getElementById('map');
  const markers = JSON.parse(mapElement.dataset.markers);

  const map = new google.maps.Map(document.getElementById("map"));

  directionsDisplay.setMap(map);

  console.log("hello")

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
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
  //Check if request is successful.
  if (status == google.maps.DirectionsStatus.OK) {
    console.log(status);
    directionsDisplay.setDirections(response); //Display the directions result
  }
});
}

export { init };
