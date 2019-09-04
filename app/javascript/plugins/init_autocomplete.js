import places from 'places.js';

const initAutocomplete = () => {
  const addressInput = document.getElementById('city-point');
  if (addressInput) {
    places({ container: addressInput });
  }
};

const endAutocomplete = () => {
  const addressInput = document.getElementById('end-point');
  if (addressInput) {
    places({ container: addressInput });
  }
};

const homeAutocomplete = () => {
  const addressInput = document.getElementById('plan-city');
  if (addressInput) {
    places({ container: addressInput, type: "city" });
  }
};

const initPlaces = () => {
if (document.getElementById('end-point') && document.getElementById('city-point')) {
    initAutocomplete();
    endAutocomplete();
  }
}

const homePlaces = () => {
if (document.getElementById('plan-city')) {
  homeAutocomplete();
  }
}

export { initPlaces };
export { homePlaces };



