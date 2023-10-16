const resources = JSON.parse(localStorage.getItem('resources')) || {
  iron: 0,
  copper: 0,
  water: 0,
  metal: 0,
  methane: 0
};
const wetPlanet = document.getElementById('wetplanet');
const dryPlanet = document.getElementById('dryplanet');
const gasPlanet = document.getElementById('gasplanet');
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
      resources.water += drillEfficiency * 20 || 20;

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
      resources.iron +=  drillEfficiency * 150 || 150;
      resources.copper += drillEfficiency * 250 || 250;
      resources.metal += drillEfficiency * 10 || 10;

      localStorage.setItem('resources', JSON.stringify(resources));
      isMining = false; // Set the mining state back to false
      dryPlanet.disabled = false;
      resourceAmount();
      progressBar.style.display = 'none';
    }, miningSpeed);
  });
});

gasPlanet.addEventListener('click', () => {
  if (isMining) {
    return;
  }

  isMining = true;
  updateProgressBar(); 

  gasPlanet.disabled = true;
  progressBar.style.display = 'block';

  setTimeout(() => {
    resources.metal += drillEfficiency * 20 || 20;
    resources.methane += drillEfficiency * 30 || 30;

    localStorage.setItem('resources', JSON.stringify(resources));
    isMining = false;
    gasPlanet.disabled = false;
    resourceAmount();
    progressBar.style.display = 'none';
  }, miningSpeed);
});

const cheatCode = document.getElementById('cheatCode').addEventListener('click', function () {
  resources.iron += 100000;
  resources.copper += 100000;
  resources.water += 100000;
  resources.metal += 100000;
  resources.methane += 100000;
  console.log('cheater!');
  localStorage.setItem('resources', JSON.stringify(resources));
  resourceAmount();
});


function resourceAmount() {
  const iron = document.getElementById('iron');
  const copper = document.getElementById('copper');
  const water = document.getElementById('water');
  const metal = document.getElementById('metal');
  const methane = document.getElementById('methane');

  // console.log(`Iron: ${resources.iron}`);
  // console.log(`Copper: ${resources.copper}`);
  // console.log(`Water: ${resources.water}`);
  // console.log(`Metal: ${resources.metal}`);

  iron.title = `Iron: ${resources.iron}`;
  copper.title = `Copper: ${resources.copper}`;
  water.title = `Water: ${resources.water}`;
  metal.title = `Metal: ${resources.metal}`;
  methane.title = `Methane: ${resources.methane}`;
}
