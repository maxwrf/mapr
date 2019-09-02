import { initializePage } from "./activities";
import "bootstrap";
import "daemonite-material/js/material.js";
import Picker from "pickerjs";
import  "pickerjs/dist/picker.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import { initMapbox } from '../plugins/init_mapbox';
import { initPicker } from '../plugins/flatpickr';
import { initGmap } from '../plugins/gmaps';
import { initPlaces } from '../plugins/init_autocomplete.js';
import { picker } from '../plugins/timepicker.js';
import { classGiver} from '../plugins/class_giver.js';

$(document).ready(function(){
  $(".category-choice").click(function(){
    $(this).toggleClass("active");
  });
});

// initMapbox();
initGmap();
initPlaces();
picker();
initPicker();
classGiver();

const activities_page = document.getElementById("activities_page");
if (activities_page) {
  initializePage();
};
