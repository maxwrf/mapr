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

export { initAutocomplete, endAutocomplete };

