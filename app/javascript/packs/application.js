import "bootstrap";
import "daemonite-material/js/material.js";

const test = () => {
  b1.classList.add("btn-primary");
  b1.classList.remove("btn-secondary");
}

const activities = document.getElementById("activities");
const b1 = document.getElementById("b1");

b1.addEventListener("click", (event) => {
  fetch("api/v1/activities")
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    activities.innerHTML = '';
    data.forEach((activity) => {
      activities.insertAdjacentHTML("beforeend",
        `<li>${activity.name}<br>${activity.description}<br>${activity.address}</li><br>` );
    });
  });
});
