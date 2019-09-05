 const NEXT_STEP_ENDPOINT = "/plans/:id"; // TODO set to final stage realtive path
 const activities = document.getElementById("activities");
 const cat_buttons = document.querySelectorAll('.cat-btn');
 const shortlistList = document.getElementById('shortlist');
 const submitShortlistButton = document.getElementById('submit_shortlist');
 let shortlist = [];
 let activityIndex = {};

 const fetchActivities = (params) => {
  console.log("api/v1/activities?" + params)
  fetch("api/v1/activities?" + params)
  .then(response => response.json())
  .then((data) => {
    actionActivitiesData(data);
  });
};

const actionActivitiesData = (data, insert = false) => {
  if (insert) {
    activities.insertAdjacentHTML('afterbegin', data.html);
  }
  else {
    activities.innerHTML = data.html;
  }
    data.activities.forEach((activity) => {
      activityIndex[activity.place_id] = activity;
      const cardButton = document.getElementById(`b_${ activity.place_id}`);
      if (shortlist.includes(activity.place_id)) {
        createRemoveFromShortlistButton(cardButton);
      }
      else {
        createAddToShortlistButton(cardButton);
      }
      const card = document.getElementById(activity.place_id);
      card.addEventListener('click', handleShowDetails);
    });
};

const createAddToShortlistButton = (target) => {
  target.innerHTML = 'add_box';
  target.classList.remove('col-thematic-inv');
  // target.classList.add('btn-primary');
  target.removeEventListener('click', handleRemoveFromShortlist);
  target.addEventListener('click', handleAddToShortlist);
  const card = document.getElementById(target.dataset.placeId);
   card.classList.remove('on-list');
  // card.classList.add('off-list');
};

const addToShortlist = (placeId) => {
  console.log(`Adding ${ placeId }`);
  const activity = activityIndex[placeId];
  shortlist.push(placeId)
  shortlistList.insertAdjacentHTML("beforeend", buildShortlistCard(placeId, activity));
  const cardButton = document.getElementById(`b_${ placeId }`);
  createRemoveFromShortlistButton(cardButton);
  const shortlistButton = document.getElementById(`sb_${ placeId }`);
  shortlistButton.addEventListener('click', handleRemoveFromShortlist);
  if (shortlist.length == 1 ) {
    toggleItineraryButton();
  }
};

const toggleItineraryButton = () => {
  if (submitShortlistButton.classList.contains('d-none')) {
    submitShortlistButton.classList.remove('d-none');
    window.setTimeout( () => {
      submitShortlistButton.classList.add('opac-1-fadein');
      submitShortlistButton.classList.remove('opac-0');
    },10 );
  }
  else {
    submitShortlistButton.classList.add('opac-0', 'd-none');
    submitShortlistButton.classList.remove('opac-1-fadein');
  }
}

const handleAddToShortlist = (event) => {
  addToShortlist(event.currentTarget.dataset.placeId);
};

// when on shortlist

const createRemoveFromShortlistButton = (target) => {
  target.innerHTML = 'restore_from_trash';
  // target.classList.remove('btn-primary');
  target.classList.add('col-thematic-inv');
  target.removeEventListener('click', handleAddToShortlist);
  target.addEventListener('click', handleRemoveFromShortlist);
  const card = document.getElementById(target.dataset.placeId);
  // card.classList.remove('off-list');
   card.classList.add('on-list');
};

const handleRemoveFromShortlist = (event) => {
  removeFromShortlist(event.currentTarget.dataset.placeId);
};

const removeFromShortlist = (placeId) => {
  console.log(`Removing ${ placeId }`);
  const activity = activityIndex[placeId];
  if (shortlist.length == 1 ) {
    toggleItineraryButton();
  }
  const index = shortlist.indexOf(placeId);
  if (index > -1) {
     shortlist.splice(index, 1);
  }
  const activityShortlistCard = document.getElementById(`s_${ placeId }`);
  activityShortlistCard.parentNode.removeChild(activityShortlistCard);
  const cardButton = document.getElementById(`b_${ placeId }`);
  createAddToShortlistButton(cardButton);
};

 const saveShortlist = (goto_url) => {
  fetch("api/v1/shortlist/save", {
      method: 'POST',
      body: JSON.stringify(shortlist)
    })
    .then(response => response.json())
    .then((data) => {
      console.log(`Shortlist save response = ${data.plan_id}`);
      goto_url = goto_url.replace(':id', data.plan_id)
      window.location.pathname = goto_url;
    })
};

 const createSubmitShortlistButton = () => {
  submitShortlistButton.addEventListener("click", (event) => {
    saveShortlist(NEXT_STEP_ENDPOINT);
  });
};

const handleShowDetails = (event) => {
  // ignore event if shortlist button was clicked
  const excludeId = `b_${event.currentTarget.id}`;
  if (event.target.id != excludeId) {
    fetchDetails(event.currentTarget.id);
  }
};

const fetchDetails = (place_id) => {
  const endpoint = `api/v1/details?place_id=${place_id}`
  fetch(endpoint)
  .then(response => response.json())
  .then((data) => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = data.html;
    $('#modal').modal();
  });
}

const handleSearchSubmit = (event) => {
  event.preventDefault();
  const input = document.getElementById('search-input');
  //const tempConstantSearch = 'Berliner Unterwelten'
  const endpoint = `api/v1/search?q=${input.value}`;
  fetch(endpoint)
  .then(response => response.json())
  .then((data) => {
    //window.alert(`search response => ${data.activities}`);
    actionActivitiesData(data, false);
    input.value = '';
    input.blur();
  });
}

const buildShortlistCard = (placeId, activity) => {
  const name = activity.name.length > 45 ? `${activity.name.slice(0, 50)}...` : activity.name;
  const imgSrc = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${activity.image_ref}&key=AIzaSyBOlf31U3nrHuWMj_pjtDcKCrhfG1RZHv0`
  return `<div id='s_${ placeId }' class="mt-2 col-sm-12">
            <div class="card shortlist-card" style="background-image: linear-gradient(110deg, rgba(0,0,0,0.3) 0%, rgba(33,49,77,1) 90%), url('${imgSrc}');">
              <div class="card-body">
                <div class="row no-gutters pr-2 pl-2 h-100 no-wrap justify-content-between align-items-center">
                  <div class='col-10'>
                    <h5 class='m-0 card-title text-left'>${ name }</h5>
                    <div class='m-0 mini-rating'>${ activity.average_rating } <i class="fas fa-star"></i></div>
                  </div>
                  <div class='col-2 text-right' id='sb_${ placeId }' class="shortlist-button-container" data-place-id='${ placeId }'>
                    <i class="material-icons remove-icon shortlist-card-btn">delete</i>
                  </div>
                </div>
              </div>
            </div>
          </div>`
}

export const initializePage = () => {
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', handleSearchSubmit);
  cat_buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let params = `q=${event.currentTarget.innerText}`;
        fetchActivities(params);
    });
    createSubmitShortlistButton()
    //cat_buttons[0].classList.add('current-cat'); // TODO: make this change with cat chnages
  });
  fetchActivities("api/v1/activities?q=" + cat_buttons[0].innerText);
};
