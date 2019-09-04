import flatpickr from "flatpickr";
import "flatpickr/dist/themes/airbnb.css";


const time_1 = () => {
flatpickr(".flat_timepicker_1", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      defaultDate: "09:00"
  });
}

const time_2 = () => {
flatpickr(".flat_timepicker_2", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      defaultDate: "18:00"
  });
}

const time_3 = () => {
flatpickr(".flat_timepicker_3", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      defaultDate: "12:00"
  });
}

const time_4 = () => {
flatpickr(".flat_timepicker_4", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      defaultDate: "15:00"
  });
}

const flatTimepicker = () => {
if (document.querySelectorAll('.flat_timepicker_1')
  && document.querySelectorAll('.flat_timepicker_2')
  && document.querySelectorAll('.flat_timepicker_3')
  && document.querySelectorAll('.flat_timepicker_4')) {
  time_1();
  time_2();
  time_3();
  time_4();
  }
}

export { flatTimepicker };

