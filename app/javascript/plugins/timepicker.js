import Picker from "pickerjs"
import  "pickerjs/dist/picker.css"
 const picker =() => {
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

export { picker};
