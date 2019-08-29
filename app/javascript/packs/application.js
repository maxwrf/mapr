
import "bootstrap";
import "daemonite-material/js/material.js";
import 'mapbox-gl/dist/mapbox-gl.css';
import { initMapbox } from '../plugins/init_mapbox';
import {initAutocomplete, endAutocomplete}  from'../plugins/init_autocomplete.js';
import {picker} from '../plugins/timepicker.js';

initMapbox();
initAutocomplete();
picker();
endAutocomplete();

const activities = document.getElementById("activities");
const b1 = document.getElementById("b1");

if (activities) {
  b1.addEventListener("click", (event) => {
    fetch("api/v1/activities")
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      activities.innerHTML = '';
      data.forEach((activity) => {
        activities.insertAdjacentHTML("beforeend",
          `<li>${activity.name}<br>${activity.description}<br>${activity.address}</li><br>` );
      });
    });
  });
};

