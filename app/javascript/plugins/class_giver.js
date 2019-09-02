const addClass = (event) => {
  event.currentTarget.classList.toggle('active');
  const number = event.currentTarget.classList[3].split("-")[1];
  const inputToChange = document.querySelector(`.input-${number}`);
  inputToChange.value = 1;
};

const classGiver = () => {
  const labls = document.querySelectorAll(`.js-btn`);
  const inputs = document.querySelectorAll(`#fromGroupTransport input`);
  if (labls) {
    let counter = 1;
    labls.forEach((labl) => {
      labl.classList.add(`label-${counter}`)
      labl.addEventListener('click', addClass);
      counter += 1;
    });
  }
  if (inputs) {
    let counter = 1;
     inputs.forEach((input) => {
      input.classList.add(`input-${counter}`)
      input.value = 0;
      counter += 0.5;
     });
  };
};

export { classGiver }
