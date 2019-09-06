// if it doesnt work we kill this shit

const sliderInti = () => {


let counter = 1;
const carousels = document.querySelectorAll('.carousel-item');
const markerLength = document.querySelector('.marker-length')
const stepperCeroAmount = Number(markerLength.innerHTML);


const showCarrousel = (event) =>{
  let chooseNumber = event.currentTarget.classList[3].split('-')[1];
  const steppers = event.currentTarget.classList[2].split('-')[1];
  if (chooseNumber > stepperCeroAmount) { chooseNumber = chooseNumber - (stepperCeroAmount * steppers)}
  const carousel = document.querySelector(`.carousel-${chooseNumber}`);
  carousels.forEach((car) => {
    car.classList.remove('active');
  });
  carousel.classList.add('active');

};

const tabs = document.querySelectorAll('.stepper');

tabs.forEach((tab) =>{
  tab.classList.add(`tab-${counter}`)
  counter += 1;
  tab.addEventListener('click', showCarrousel)
});

}

export { sliderInti };

