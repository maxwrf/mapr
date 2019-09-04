import { initializePage } from "./activities";
import "bootstrap";
import "daemonite-material/js/material.js";
import Picker from "pickerjs";
import  "pickerjs/dist/picker.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import { initMapbox } from '../plugins/init_mapbox';
import { initGmap } from '../plugins/gmaps';
import { initPlaces } from '../plugins/init_autocomplete.js';
import { homePlaces } from '../plugins/init_autocomplete.js';
import { initPicker } from '../plugins/flatpickr';
import { initTopFunction } from '../plugins/button_scroll';
import { picker } from '../plugins/timepicker.js';
import { classGiver } from '../plugins/class_giver.js';
import { flatTimepicker } from '../plugins/flat_timepicker.js';


$(document).ready(function(){
  $(".category-choice").click(function(){
    $(this).toggleClass("active");
  });
});

initPicker();
initMapbox();
initGmap();
initPlaces();
homePlaces();
picker();
flatTimepicker();
// initTopFunction();
classGiver();

const activities_page = document.getElementById("activities_page");
if (activities_page) {
  initializePage();
};
