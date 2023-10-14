const rocketPower = document.getElementById('rocketpower');
const drillSpeedElement = document.getElementById('drillspeed');
const drillEfficiencyElement = document.getElementById('drillefficiency');

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
setInterval(checkForUpdates, 1000);

function updateText() {
    const drillSpeedName = document.getElementById('drillSpeedName');
    drillSpeedName.innerHTML = `Drill Speed: ${miningSpeed / 1000}s`;
    const drillEfficiencyName = document.getElementById('drillEfficiencyName');
    drillEfficiencyName.innerHTML = `Drill Efficiency: ${drillEfficiency}x`;
    const drillSpeedPrice = document.getElementById('drillSpeedPrice');
    drillSpeedPrice.innerHTML = `Iron: ${drillSpeedCost}<br>Copper: 0<br>Water: 0`;
    const upgradeComplete = localStorage.getItem('completeUpgrade');
    if(upgradeComplete === 'true') {
      drillSpeedPrice.innerHTML = `Upgrade<br>Complete!`;
    }
    const drillEfficiencyPrice = document.getElementById('drillEfficiencyPrice');
    drillEfficiencyPrice.innerHTML = `Iron: ${drillEfficiencyCost.iron}<br>Copper: ${drillEfficiencyCost.copper}<br>Water: 0`
}

let miningSpeed = 5000;
const minMiningSpeed = 1000; // Minimum mining speed
let costIncreasePercentage = 100;
let drillSpeedCost = 100;

drillSpeedElement.addEventListener('click', () => {
  const drillSpeedPrice = document.getElementById('drillSpeedPrice');
  if (miningSpeed <= minMiningSpeed) {
    drillSpeedPrice.innerHTML = 'Upgrade<br>Complete!';
    localStorage.setItem('completeUpgrade', 'true');
    return;
  }

  if (updatedResources.iron >= drillSpeedCost) {
    updatedResources.iron -= drillSpeedCost;
    drillSpeedCost = Math.round(drillSpeedCost * (1 + costIncreasePercentage / 100));
    updateText();

    miningSpeed -= 500;

    if (miningSpeed <= minMiningSpeed) {
      miningSpeed = minMiningSpeed;
    }

    // console.log(miningSpeed);
    localStorage.setItem('resources', JSON.stringify(updatedResources));
    localStorage.setItem('miningSpeed', miningSpeed);
    localStorage.setItem('drillSpeedCost', drillSpeedCost);

    location.reload();
  } else {
    alert("Not enough resources to purchase the upgrade!");
  }
});

let drillEfficiency = 1;
const maxEfficiency = 10;

let drillEfficiencyCost = { iron: 100, copper: 200 };

drillEfficiencyElement.addEventListener('click', () => {
  let costIncreasePercentage = 200;
  const drillEfficiencyPrice = document.getElementById('drillEfficiencyPrice');
  if (drillEfficiency >= maxEfficiency) {
    drillEfficiencyPrice.innerHTML = 'Upgrade<br>Complete!';
    localStorage.setItem('completeUpgrade', 'true');
    return;
  }

  if (
    updatedResources.iron >= drillEfficiencyCost.iron &&
    updatedResources.copper >= drillEfficiencyCost.copper
  ) {
    updatedResources.iron -= drillEfficiencyCost.iron;
    updatedResources.copper -= drillEfficiencyCost.copper;
    drillEfficiencyCost.iron = Math.round(drillEfficiencyCost.iron * (1 + costIncreasePercentage / 100));
    drillEfficiencyCost.copper = Math.round(drillEfficiencyCost.copper * (1 + costIncreasePercentage / 100));
    updateText();

    drillEfficiency += 1;

    if (drillEfficiency >= maxEfficiency) {
      drillEfficiency = maxEfficiency;
    }

    // console.log(drillEfficiency);
    localStorage.setItem('resources', JSON.stringify(updatedResources));
    localStorage.setItem('drillEfficiency', drillEfficiency);
    localStorage.setItem('drillEfficiencyCost', JSON.stringify(drillEfficiencyCost));

    location.reload();
  } else {
    alert("Not enough resources to purchase the upgrade!");
  }
});

window.onload = function () {
  miningSpeed = localStorage.getItem('miningSpeed') || 5000;
  drillEfficiency = parseInt(localStorage.getItem('drillEfficiency')) || 1;
  const storedDrillEfficiencyCost = JSON.parse(localStorage.getItem('drillEfficiencyCost'));

  if (storedDrillEfficiencyCost) {
    drillEfficiencyCost = storedDrillEfficiencyCost;
  }
  if (miningSpeed <= minMiningSpeed) {
    miningSpeed = minMiningSpeed;
  }
  if (drillEfficiency >= maxEfficiency) {
    drillEfficiency = maxEfficiency;
  }
  drillSpeedCost = parseInt(localStorage.getItem("drillSpeedCost")) || 100;
  // console.log(drillSpeedCost);
  // console.log(miningSpeed);
  updateText();
}


