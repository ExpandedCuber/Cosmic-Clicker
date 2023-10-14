const resources = JSON.parse(localStorage.getItem('resources')) || {
  iron: 0,
  copper: 0,
  water: 0
};

const wetPlanet = document.getElementById('wetplanet');
const progressBar = document.getElementById('miningProgress');
const miningTime = 5000; // Set the mining time in milliseconds (5 seconds in this example)

wetPlanet.addEventListener('click', () => {

  wetPlanet.disabled = true;
  
  setTimeout(() => {
    progressBar.style.display = 'block';
    resources.iron += 100;
    resources.copper += 200;
    resources.water += 20;

    localStorage.setItem('resources', JSON.stringify(resources));
    wetPlanet.disabled = false;
    resourceAmount();
  }, miningTime);

  setTimeout(() => {
    progressBar.value = 10;
  }, 1000);
  setTimeout(() => {
    progressBar.value = 20;
  }, 2000);
  setTimeout(() => {
    progressBar.value = 30;
  }, 3000);
  setTimeout(() => {
    progressBar.value = 10;
  }, 4000);
  setTimeout(() => {
    progressBar.value = 40;
  }, 5000);
  setTimeout(() => {
    progressBar.value = 0;
    progressBar.style.display = 'hidden';
  }, 6000);
});

function resourceAmount() {
  const iron = document.getElementById('iron');
  const copper = document.getElementById('copper');
  const water = document.getElementById('water');

  console.log(`Iron: ${resources.iron}`);
  console.log(`Copper: ${resources.copper}`);
  console.log(`Water: ${resources.water}`);

  iron.title = `Iron: ${resources.iron}`;
  copper.title = `Copper: ${resources.copper}`;
  water.title = `Water: ${resources.water}`;
}

document.addEventListener("DOMContentLoaded", function() {
  resourceAmount(); // Call resourceAmount to set the titles
});
