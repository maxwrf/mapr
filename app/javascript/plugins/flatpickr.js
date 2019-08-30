import flatpickr from "flatpickr"
import "flatpickr/dist/themes/airbnb.css" // Note this is important!


const go = () => {
flatpickr(".datepicker", {
  altInput: true
});
}

const initPicker = () => {
  if (document.querySelectorAll('.datepicker')) {
    go()
  };
};

export { initPicker };
