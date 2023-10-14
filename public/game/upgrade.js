const rocketPower = document.getElementById('rocketpower');
const drillSpeedElement = document.getElementById('drillspeed');
const drillEfficiencyElement = document.getElementById('drillefficiency');
const sateliteElement = document.getElementById('satelite');

let updatedResources = {}; 

function checkForUpdates() {
  const updatedMiningSpeed = localStorage.getItem('miningSpeed');
  const storedResources = JSON.parse(localStorage.getItem('resources'));

  if (updatedMiningSpeed) {
    miningSpeed = parseInt(updatedMiningSpeed);
  }
  
  if (storedResources) {
    updatedResources = storedResources;
  }
}

setInterval(checkForUpdates, 1000);

function updateText() {
    const sateliteName = document.getElementById('sateliteName');
    sateliteName.innerHTML = `Satelite: ${sateliteCount} Planets`;
    const satelitePrice = document.getElementById('satelitePrice');
    satelitePrice.innerHTML = `Iron: ${sateliteCost.iron}<br>Copper: ${sateliteCost.copper}<br>Water: ${sateliteCost.water}`;
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

let sateliteCount = 1;
const maxSateliteCount = 100;

let sateliteCost = { iron: 1000, copper: 2000, water: 200 };

sateliteElement.addEventListener('click', () => {
  let costIncreasePercentage = 150;
  const satelitePrice = document.getElementById('satelitePrice');
  if (sateliteCount >= maxSateliteCount) {
    satelitePrice.innerHTML = 'Upgrade<br>Complete!';
    localStorage.setItem('completeUpgrade', 'true');
    return;
  }

  if (
    updatedResources.iron >= sateliteCost.iron &&
    updatedResources.copper >= sateliteCost.copper && 
    updatedResources.water >= sateliteCost.water
  ) {
    updatedResources.iron -= sateliteCost.iron;
    updatedResources.copper -= sateliteCost.copper;
    updatedResources.copper -= sateliteCost.copper;
    sateliteCost.iron = Math.round(sateliteCost.iron * (1 + costIncreasePercentage / 100));
    sateliteCost.copper = Math.round(sateliteCost.copper * (1 + costIncreasePercentage / 100));
    sateliteCost.water = Math.round(sateliteCost.water * (1 + costIncreasePercentage / 100));
    updateText();

    sateliteCount += 1;

    if (sateliteCount >= maxSateliteCount) {
      sateliteCount = maxSateliteCount;
    }

    // console.log(drillEfficiency);
    localStorage.setItem('resources', JSON.stringify(updatedResources));
    localStorage.setItem('sateliteCount', sateliteCount);
    localStorage.setItem('sateliteCost', JSON.stringify(sateliteCost));

    location.reload();
  } else {
    alert("Not enough resources to purchase the upgrade!");
  }
});

window.onload = function () {
  miningSpeed = localStorage.getItem('miningSpeed') || 5000;
  drillEfficiency = parseInt(localStorage.getItem('drillEfficiency')) || 1;
  const storedDrillEfficiencyCost = JSON.parse(localStorage.getItem('drillEfficiencyCost'));
  const storedSateliteCost = JSON.parse(localStorage.getItem('sateliteCost'));

  if (storedSateliteCost) {
    sateliteCost = storedSateliteCost;
  }
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
  console.log(sateliteCount);
  console.log(sateliteCost);
  updateText();
}


