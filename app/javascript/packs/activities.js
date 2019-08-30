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
    activities.innerHTML = '';
    data.forEach((activity) => {
      activityIndex[activity.place_id] = activity;
      activities.insertAdjacentHTML("beforeend",
        `<li>${activity.name}
         <br>${activity.average_rating}
         <br>${activity.address}
         <br>${activity.latitude}
         <br>${activity.longitude}
         <br>${activity.place_id}`);
      if (shortlist.includes(activity.place_id)) {
        activities.insertAdjacentHTML("beforeend",
        `<br><span id="${activity.place_id}" class="btn btn-warning">remove from shortlist</span>
         </li><br>`);
        let button = document.getElementById(activity.place_id);
        button.addEventListener("click", handleRemoveFromShortlist);
      }
      else {
        activities.insertAdjacentHTML("beforeend",
        `<br><span id="${activity.place_id}" class="on-shortlist btn btn-primary">add to shortlist</span>
         </li><br>`);
        let button = document.getElementById(activity.place_id);
        button.addEventListener("click", handleAddToShortlist);
      }
    });
  });
};

 const handleAddToShortlist = (event) => {
  addToShortlist(event.currentTarget.id);
};

 const addToShortlist = (placeId) => {
  console.log(`Adding ${placeId}`);
  const activity = activityIndex[placeId];
  shortlist.push(placeId)
  shortlistList.insertAdjacentHTML("beforeend",
        `<li id="s_${placeId}">${activity.name}
         <br>${activity.average_rating}</li><br>`);
  const activityMainCardButton = document.getElementById(placeId);
  createRemoveFromShortlistButton(activityMainCardButton);
  activityMainCardButton.removeEventListener('click', handleAddToShortlist);
  activityMainCardButton.addEventListener('click', handleRemoveFromShortlist);
};

 const createRemoveFromShortlistButton = (target) => {
  target.innerHTML = '';
  target.insertAdjacentHTML("beforeend", 'remove from shortlist');
  target.classList.remove('off-list', 'btn-primary');
  target.classList.add('on-list', 'btn-warning');
};

 const handleRemoveFromShortlist = (event) => {
          removeFromShortlist(event.currentTarget.id);
};

 const removeFromShortlist = (placeId) => {
  console.log(`Removing ${placeId}`);
  const activity = activityIndex[placeId];
  const index = shortlist.indexOf(placeId);
  if (index > -1) {
     shortlist.splice(index, 1);
  }
  const activityShortlistCard = document.getElementById(`s_${placeId}`);
  activityShortlistCard.parentNode.removeChild(activityShortlistCard);
  const activityMainCardButton = document.getElementById(placeId);
  createAddToShortlistButton(activityMainCardButton);
  activityMainCardButton.removeEventListener('click', handleRemoveFromShortlist);
  activityMainCardButton.addEventListener('click', handleAddToShortlist);
};

 const createAddToShortlistButton = (target) => {
  target.innerHTML = '';
  target.insertAdjacentHTML("beforeend", 'add to shortlist');
  target.classList.remove('on-list', 'btn-warning');
  target.classList.add('off-list', 'btn-primary');
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
      window.location.pathname = '/';
    })
};

 const createSubmitShortlistButton = () => {
  submitShortlistButton.addEventListener("click", (event) => {
    saveShortlist(NEXT_STEP_ENDPOINT);
  });
};

export const initializePage = () => {
  cat_buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let params = `q=${event.currentTarget.innerText}`;
        fetchActivities(params);
    });
    createSubmitShortlistButton()
    // cat_buttons[0].classList.add('current-cat'); // TODO: make this change with cat chnages
    fetchActivities("api/v1/activities?" + cat_buttons[0].innerText);
  });
};
