import Picker from "pickerjs"
import  "pickerjs/dist/picker.css"
 const pickerInit =() => {
new Picker(document.querySelector('.start-time'), {
  format: 'HH:mm',
  headers: true,
  text: {
    title: 'Pick a time',
  },
});


new Picker(document.querySelector('.end-time'), {
  format: 'HH:mm',
  headers: true,
  text: {
    title: 'Pick a time',
  },
});

new Picker(document.querySelector('.break-start-time'), {
  format: 'HH:mm',
  headers: true,
  text: {
    title: 'Pick a time',
  },
});

new Picker(document.querySelector('.break-end-time'), {
  format: 'HH:mm',
  headers: true,
  text: {
    title: 'Pick a time',
  },
});
};

const picker = () => {
  if (document.querySelector('.break-start-time') && document.querySelector('.start-time')) {
    pickerInit();
  }
}

export { picker};
