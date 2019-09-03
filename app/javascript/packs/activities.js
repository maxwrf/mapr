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
  target.innerHTML = 'Shortlist <i class="fas fa-plus-square"></i>';
  target.classList.remove('btn-warning');
  target.classList.add('btn-primary');
  target.removeEventListener('click', handleRemoveFromShortlist);
  target.addEventListener('click', handleAddToShortlist);
  const card = document.getElementById(target.dataset.placeId);
  card.classList.remove('on-list');
  card.classList.add('off-list');
};

const addToShortlist = (placeId) => {
  console.log(`Adding ${ placeId }`);
  const activity = activityIndex[placeId];
  shortlist.push(placeId)
  shortlistList.insertAdjacentHTML("beforeend",
        `<li id="s_${ placeId }">${ activity.name }
         <br>${ activity.average_rating }</li><br>`);
  const cardButton = document.getElementById(`b_${ placeId }`);
  createRemoveFromShortlistButton(cardButton);
};

const handleAddToShortlist = (event) => {
  addToShortlist(event.currentTarget.dataset.placeId);
};

// when on shortlist

const createRemoveFromShortlistButton = (target) => {
  target.innerHTML = '<i class="far fa-trash-alt"></i>';
  target.classList.remove('btn-primary');
  target.classList.add('btn-warning');
  target.removeEventListener('click', handleAddToShortlist);
  target.addEventListener('click', handleRemoveFromShortlist);
  const card = document.getElementById(target.dataset.placeId);
  card.classList.remove('off-list');
  card.classList.add('on-list');
};

const handleRemoveFromShortlist = (event) => {
  removeFromShortlist(event.currentTarget.dataset.placeId);
};

const removeFromShortlist = (placeId) => {
  console.log(`Removing ${ placeId }`);
  const activity = activityIndex[placeId];
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
  const tempConstantSearch = 'Berliner Unterwelten'
  const endpoint = `api/v1/search?q=${tempConstantSearch}`
  console.log(endpoint)
  fetch(endpoint)
  .then(response => response.json())
  .then((data) => {
    //window.alert(`search response => ${data.activities}`);
    actionActivitiesData(data, false);
  });
}

export const initializePage = () => {
  const searchSubmit = document.getElementById('searchSubmit');
  searchSubmit.addEventListener("click", handleSearchSubmit);
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
