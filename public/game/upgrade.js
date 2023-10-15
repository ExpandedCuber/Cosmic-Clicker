const rocketPower = document.getElementById('rocketpower');
const drillSpeedElement = document.getElementById('drillspeed');
const drillEfficiencyElement = document.getElementById('drillefficiency');
const sateliteElement = document.getElementById('satelite');
const rocketElement = document.getElementById('buildRocket');

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
    sateliteName.innerHTML = `Satellite: ${sateliteCount} Planets`;
    const satelitePrice = document.getElementById('satelitePrice');
    satelitePrice.innerHTML = `Iron: ${sateliteCost.iron}<br>Copper: ${sateliteCost.copper}<br>Water: ${sateliteCost.water}`;
    const sateliteUpgradeComplete = localStorage.getItem('sateliteCompleteUpgrade');
    if(sateliteUpgradeComplete === 'true') {
      satelitePrice.innerHTML = `Upgrade<br>Complete!`;
    }

    const drillSpeedName = document.getElementById('drillSpeedName');
    drillSpeedName.innerHTML = `Drill Speed: ${miningSpeed / 1000}s`;
    const drillSpeedPrice = document.getElementById('drillSpeedPrice');
    drillSpeedPrice.innerHTML = `Iron: ${drillSpeedCost}<br>Copper: 0<br>Water: 0`;
    const speedUpgradeComplete = localStorage.getItem('completeUpgrade');
    if(speedUpgradeComplete === 'true') {
      drillSpeedPrice.innerHTML = `Upgrade<br>Complete!`;
    }

    const drillEfficiencyName = document.getElementById('drillEfficiencyName');
    drillEfficiencyName.innerHTML = `Drill Efficiency: ${drillEfficiency}x`;
    const drillEfficiencyPrice = document.getElementById('drillEfficiencyPrice');
    drillEfficiencyPrice.innerHTML = `Iron: ${drillEfficiencyCost.iron}<br>Copper: ${drillEfficiencyCost.copper}<br>Water: 0`
    const efficiencyUpgradeComplete = localStorage.getItem('efficiencyCompleteUpgrade');
    if(efficiencyUpgradeComplete === 'true') {
      drillEfficiencyPrice.innerHTML = `Upgrade<br>Complete!`;
    }

    const rocketName = document.getElementById('rocketName');
    rocketName.innerHTML = `Build Rocket:`;
    const rocketPrice = document.getElementById('rocketPrice');
    rocketPrice.innerHTML = `Iron: ${rocketCost.iron}<br>Copper: ${rocketCost.copper}<br>Water: ${rocketCost.water}`;
    const rocketUpgradeComplete = localStorage.getItem('rocketCompleteUpgrade');
    if(rocketUpgradeComplete === 'true') {
      rocketPrice.innerHTML = `Upgrade<br>Complete!`;
    }
}

let miningSpeed = 5000;
const minMiningSpeed = 1000; // Minimum mining speed
let costIncreasePercentage = 100;
let drillSpeedCost = 100;

drillSpeedElement.addEventListener('click', () => {
  const drillSpeedPrice = document.getElementById('drillSpeedPrice');
  if (miningSpeed <= minMiningSpeed) {
    drillSpeedPrice.innerHTML = 'Upgrade<br>Complete!';
    localStorage.setItem('speedCompleteUpgrade', 'true');
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
    localStorage.setItem('efficiencyCompleteUpgrade', 'true');
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
const maxSateliteCount = 10;

let sateliteCost = { iron: 1000, copper: 2000, water: 200 };

sateliteElement.addEventListener('click', () => {
  let costIncreasePercentage = 150;
  const satelitePrice = document.getElementById('satelitePrice');
  if (sateliteCount >= maxSateliteCount) {
    satelitePrice.innerHTML = 'Upgrade<br>Complete!';
    localStorage.setItem('sateliteCompleteUpgrade', 'true');
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


let maxRocketCount = 1;
let rocketCount = 0;
let rocketCost = { iron: 2000, copper: 2000, water: 400 };

rocketElement.addEventListener('click', () => {
  const rocketPrice = document.getElementById('rocketPrice');
  if (rocketCount >= maxrocketCount) {
    rocketPrice.innerHTML = 'Upgrade<br>Complete!';
    localStorage.setItem('rocketCompleteUpgrade', 'true');
    return;
  }

  if (
    updatedResources.iron >= rocketCost.iron &&
    updatedResources.copper >= rocketCost.copper && 
    updatedResources.water >= rocketCost.water
  ) {
    updatedResources.iron -= rocketCost.iron;
    updatedResources.copper -= rocketCost.copper;
    updatedResources.copper -= rocketCost.copper;
    updateText();

    rocketCount += 1;

    const travelButton = document.getElementById('travel');
    travelButton.style.display = 'block';

    if (rocketCount >= maxRocketCount) {
      rocketCount = maxRocketCount;
    }

    localStorage.setItem('resources', JSON.stringify(updatedResources));
    localStorage.setItem('rocketCount', rocketCount);
    localStorage.setItem('rocketCost', JSON.stringify(rocketCost));

    location.reload();
  } else {
    alert("Not enough resources to purchase the upgrade!");
  }
});

window.onload = function () {
  miningSpeed = localStorage.getItem('miningSpeed') || 5000;
  drillEfficiency = parseInt(localStorage.getItem('drillEfficiency')) || 1;
  sateliteCount = parseInt(localStorage.getItem('sateliteCount')) || 1;
  rocketCount = parseInt(localStorage.getItem('rocketCount')) || 0;
  const storedDrillEfficiencyCost = JSON.parse(localStorage.getItem('drillEfficiencyCost'));
  const storedSateliteCost = JSON.parse(localStorage.getItem('sateliteCost'));
  const storedRocketCost = JSON.parse(localStorage.getItem('rocketCost'));

  if (storedRocketCost) {
    rocketCost = storedRocketCost;
  }
  if (rocketCount <= maxRocketCount) {
    rocketCount = maxRocketCount;
  }

  if (storedSateliteCost) {
    sateliteCost = storedSateliteCost;
  }
  if (sateliteCount <= maxSateliteCount) {
    sateliteCount = maxSateliteCount;
  }

  if (storedDrillEfficiencyCost) {
    drillEfficiencyCost = storedDrillEfficiencyCost;
  }
  if (drillEfficiency >= maxEfficiency) {
    drillEfficiency = maxEfficiency;
  }

  if (miningSpeed <= minMiningSpeed) {
    miningSpeed = minMiningSpeed;
  }
  drillSpeedCost = parseInt(localStorage.getItem("drillSpeedCost")) || 100;
  // console.log(drillSpeedCost);
  // console.log(miningSpeed);
  // console.log(sateliteCount);
  // console.log(sateliteCost);
  updateText();
}


