const resources = JSON.parse(localStorage.getItem('resources')) || {
  iron: 0,
  copper: 0,
  water: 0
};

const planets = document.querySelectorAll('.planet');
const wetPlanet = document.getElementById('wetplanet');
const dryPlanet = document.getElementById('dryplanet');
const progressBar = document.getElementById('miningProgress');
let startTime;
let miningSpeed = localStorage.getItem('miningSpeed') || 5000;
let drillEfficiency = localStorage.getItem('drillEfficiency') || 1;

function checkForUpdates() {
    const updatedMiningSpeed = localStorage.getItem('miningSpeed');
    let updatedDrillEfficiencyStorage = localStorage.getItem('drillEfficiency');

    if (updatedDrillEfficiencyStorage) {
      drillEfficiency = updatedDrillEfficiencyStorage;
    }

    if (updatedMiningSpeed) {

      miningSpeed = updatedMiningSpeed;
    }
  }


setInterval(checkForUpdates, 1000);

function updateProgressBar() {
  progressBar.setAttribute('value', 0);
  startTime = Date.now();

  function update() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const progress = (elapsedTime / miningSpeed) * 100; 

    progressBar.setAttribute('value', progress);

    if (progress < 100) {
      requestAnimationFrame(update);
    } else {
      progressBar.setAttribute('value', 100); 
    }
  }

  update();
}

let isMining = false; // Add a variable to track the mining state

document.addEventListener("DOMContentLoaded", function () {
  resourceAmount(); 

  wetPlanet.addEventListener('click', () => {
    if (isMining) {
      return;
    }
    
    isMining = true; // Set the mining state to true
    updateProgressBar(); 

    wetPlanet.disabled = true;
    progressBar.style.display = 'block';

    setTimeout(() => {
      resources.iron +=  drillEfficiency * 100 || 100;
      resources.copper += drillEfficiency * 200 || 200;
      resources.water += drillEfficiency * 20 || 100;

      localStorage.setItem('resources', JSON.stringify(resources));
      isMining = false; // Set the mining state back to false
      wetPlanet.disabled = false;
      resourceAmount();
      progressBar.style.display = 'none';
    }, miningSpeed);
  });

  dryPlanet.addEventListener('click', () => {
    if (isMining) {
      return;
    }

    isMining = true; // Set the mining state to true
    updateProgressBar(); 

    dryPlanet.disabled = true;
    progressBar.style.display = 'block';

    setTimeout(() => {
      resources.iron +=  drillEfficiency * 100 || 100;
      resources.copper += drillEfficiency * 200 || 200;
      resources.water += drillEfficiency * 20 || 100;

      localStorage.setItem('resources', JSON.stringify(resources));
      isMining = false; // Set the mining state back to false
      wetPlanet.disabled = false;
      resourceAmount();
      progressBar.style.display = 'none';
    }, miningSpeed);
  });
});


function resourceAmount() {
  const iron = document.getElementById('iron');
  const copper = document.getElementById('copper');
  const water = document.getElementById('water');

  // console.log(`Iron: ${resources.iron}`);
  // console.log(`Copper: ${resources.copper}`);
  // console.log(`Water: ${resources.water}`);

  iron.title = `Iron: ${resources.iron}`;
  copper.title = `Copper: ${resources.copper}`;
  water.title = `Water: ${resources.water}`;
}
