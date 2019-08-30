import "bootstrap";
import "daemonite-material/js/material.js";
import Picker from "pickerjs";
import  "pickerjs/dist/picker.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import { initMapbox } from '../plugins/init_mapbox';
import { flatpickr } from '../plugins/flatpickr';
import { initGmap } from '../plugins/gmaps';
import { initPlaces } from '../plugins/init_autocomplete.js';
import {picker} from '../plugins/timepicker.js';

$(document).ready(function(){
  $(".category-choice").click(function(){
    $(this).toggleClass("active");
  });
});

// initMapbox();
initGmap();
initPlaces();
picker();
flatpickr();


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
