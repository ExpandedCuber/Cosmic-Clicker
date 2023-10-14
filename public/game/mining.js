const resources = JSON.parse(localStorage.getItem('resources')) || {
  iron: 0,
  copper: 0,
  water: 0
};

const wetPlanet = document.getElementById('wetplanet');
const progressBar = document.getElementById('miningProgress');
let startTime;
let miningSpeed = localStorage.getItem('miningSpeed') || 5000; // Move this line outside the event listener

function checkForUpdates() {
  const updatedMiningSpeed = localStorage.getItem('miningSpeed');

  if (updatedMiningSpeed) {
    miningSpeed = updatedMiningSpeed;
  }
  
}

// Periodically check for updates (e.g., every few seconds)
setInterval(checkForUpdates, 3000);

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

document.addEventListener("DOMContentLoaded", function () {
  resourceAmount(); 

  wetPlanet.addEventListener('click', () => {
    updateProgressBar(); 

    wetPlanet.disabled = true;
    progressBar.style.display = 'block';
    setTimeout(() => {
      resources.iron += 1000;
      resources.copper += 200;
      resources.water += 20;

      localStorage.setItem('resources', JSON.stringify(resources));
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

  console.log(`Iron: ${resources.iron}`);
  console.log(`Copper: ${resources.copper}`);
  console.log(`Water: ${resources.water}`);

  iron.title = `Iron: ${resources.iron}`;
  copper.title = `Copper: ${resources.copper}`;
  water.title = `Water: ${resources.water}`;
}
