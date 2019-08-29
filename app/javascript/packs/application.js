
import "bootstrap";
import "daemonite-material/js/material.js";
import Picker from "pickerjs";
import  "pickerjs/dist/picker.css";
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { initMapbox } from '../plugins/init_mapbox';
import { init } from '../plugins/gmaps';

init();
// initMapbox();


// CARL: PLEASE MOVE TO DIFFERENT FILE
// const test = () => {
//   b1.classList.add("btn-primary");
//   b1.classList.remove("btn-secondary");
// }

// const activities = document.getElementById("activities");
// const b1 = document.getElementById("b1");

// b1.addEventListener("click", (event) => {
//   fetch("api/v1/activities")
//   .then(response => response.json())
//   .then((data) => {
//     console.log(data);
//     activities.innerHTML = '';
//     data.forEach((activity) => {
//       activities.insertAdjacentHTML("beforeend",
//         `<li>${activity.name}<br>${activity.description}<br>${activity.address}</li><br>` );
//     });
//   });
// });

// const picker = document.querySelector('.start-time');

// if (picker) {
//   new Picker(document.querySelector('.start-time'), {
//     format: 'HH:mm',
//     headers: true,
//     text: {
//       title: 'Pick a time',
//     },

// import {initAutocomplete, endAutocomplete} from '../plugins/init_autocomplete.js';
// import {picker} from '../plugins/timepicker.js';


// initAutocomplete();
// picker();
// endAutocomplete();

// const activities = document.getElementById("activities");
// const b1 = document.getElementById("b1");

// if (activities) {
//   b1.addEventListener("click", (event) => {
//     fetch("api/v1/activities")
//     .then(response => response.json())
//     .then((data) => {
//       console.log(data);
//       activities.innerHTML = '';
//       data.forEach((activity) => {
//         activities.insertAdjacentHTML("beforeend",
//           `<li>${activity.name}<br>${activity.description}<br>${activity.address}</li><br>` );
//       });
//     });
//   });
// };


