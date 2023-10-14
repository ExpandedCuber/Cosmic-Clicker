const rocketPower = document.getElementById('rocketpower');
const drillSpeedElement = document.getElementById('drillspeed');

let updatedResources = {}; // Initialize as an empty object

// Check Local Storage for updates
function checkForUpdates() {
  const updatedMiningSpeed = localStorage.getItem('miningSpeed');
  const storedResources = JSON.parse(localStorage.getItem('resources'));

  if (updatedMiningSpeed) {
    // Apply the updated mining speed
    miningSpeed = parseInt(updatedMiningSpeed);
  }
  
  if (storedResources) {
    // Assign stored resources to the new variable
    updatedResources = storedResources;
  }
}

// Periodically check for updates (e.g., every few seconds)
setInterval(checkForUpdates, 3000);

function updateText() {
    const drillSpeedPrice = document.getElementById('drillSpeedPrice');
    drillSpeedPrice.textContent = `Iron: ${drillSpeedCost}`;
}

let miningSpeed = 5000;
const costIncreasePercentage = 100;

let drillSpeedCost = 100;

drillSpeedElement.addEventListener('click', () => {
  if (updatedResources.iron >= drillSpeedCost) { // Use the updated resources
    updatedResources.iron -= drillSpeedCost;
    drillSpeedCost = Math.round(drillSpeedCost * (1 + costIncreasePercentage / 100));
    updateText();

    miningSpeed -= 1000;
    console.log(miningSpeed)
    localStorage.setItem('resources', JSON.stringify(updatedResources)); // Update the updated resources
    localStorage.setItem('miningSpeed', miningSpeed);
    localStorage.setItem('drillSpeedCost', drillSpeedCost);

  } else {
    alert("Not enough resources to purchase the upgrade!");
  }
});

window.onload = function () {
  miningSpeed = localStorage.getItem('miningSpeed') || 5000;
  drillSpeedCost = parseInt(localStorage.getItem("drillSpeedCost")) || 100;
  console.log(drillSpeedCost);
  console.log(miningSpeed);
  updateText();
}
