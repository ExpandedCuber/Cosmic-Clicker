const rocketPower = document.getElementById('rocketpower');
const drillSpeedElement = document.getElementById('drillspeed');
const drillEfficiencyElement = document.getElementById('drillefficiency');
const sateliteElement = document.getElementById('satelite');
const rocketElement = document.getElementById('buildRocket');
const rocketPowerElement = document.getElementById('rocketPower');

//Make rocket fuel a buyable item costing like 100 methane and like something idk

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
    const speedUpgradeComplete = localStorage.getItem('speedCompleteUpgrade');
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
    const rocketUpgradeComplete = localStorage.getItem('rocketUpgradeComplete');
    if(rocketUpgradeComplete === 'true') {
      rocketPrice.innerHTML = `Upgrade<br>Complete!`;
    }

    const rocketPowerName = document.getElementById('rocketPowerName');
    rocketPowerName.innerHTML = `Rocket Power: ${rocketPowerCount / 1000}s`;
    const rocketPowerPrice = document.getElementById('rocketPowerPrice');
    rocketPowerPrice.innerHTML = `Iron: ${rocketPowerCost.iron}<br>Copper: ${rocketPowerCost.copper}<br>Water: ${rocketPowerCost.water}<br>Metal: ${rocketPowerCost.metal}`;
    rocketPowerPrice.style.marginBottom = '10px';
    const rocketPowerUpgradeComplete = localStorage.getItem('rocketPowerCompleteUpgrade');
    if(rocketPowerUpgradeComplete === 'true') {
      rocketPowerPrice.innerHTML = `Upgrade<br>Complete!`;
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
    updatedResources.water -= sateliteCost.water;
    sateliteCost.iron = Math.round(sateliteCost.iron * (1 + costIncreasePercentage / 100));
    sateliteCost.copper = Math.round(sateliteCost.copper * (1 + costIncreasePercentage / 100));
    sateliteCost.water = Math.round(sateliteCost.water * (1 + costIncreasePercentage / 100));
    updateText();

    sateliteCount += 1;

    if (sateliteCount >= maxSateliteCount) {
      sateliteCount = maxSateliteCount;
    }

    localStorage.setItem('resources', JSON.stringify(updatedResources));
    localStorage.setItem('sateliteCount', sateliteCount);
    localStorage.setItem('sateliteCost', JSON.stringify(sateliteCost));

    location.reload();
  } else {
    alert("Not enough resources to purchase the upgrade!");
  }
});

let rocketCost = { iron: 2000, copper: 2000, water: 400 };

rocketElement.addEventListener('click', () => {
  if (
    updatedResources.iron >= rocketCost.iron &&
    updatedResources.copper >= rocketCost.copper && 
    updatedResources.water >= rocketCost.water
  ) {
    updatedResources.iron -= rocketCost.iron;
    updatedResources.copper -= rocketCost.copper;
    updatedResources.water -= rocketCost.water;
    updateText();

    const travelButton = document.getElementById('travel');
    travelButton.style.display = 'block';

    console.log('clicked');

    localStorage.setItem('resources', JSON.stringify(updatedResources));
    localStorage.setItem('rocketCost', JSON.stringify(rocketCost));
    localStorage.setItem('rocketUpgradeComplete', 'true');

    location.reload();
  } else {
    alert("Not enough resources to purchase the upgrade!");
  }
});

let rocketPowerCount = 10000;
const minRocketPowerCount = 1000;

satelite
let rocketPowerCost = { iron: 500, copper: 1000, water: 100, metal: 100 };

rocketPowerElement.addEventListener('click', () => {
  let costIncreasePercentage = 100;
  const rocketPowerPrice = document.getElementById('rocketPowerPrice');
  if (rocketPowerCount <= minRocketPowerCount) {
    rocketPowerPrice.innerHTML = 'Upgrade<br>Complete!';
    localStorage.setItem('rocketPowerCompleteUpgrade', 'true');
    return;
  }

  if (
    updatedResources.iron >= rocketPowerCost.iron &&
    updatedResources.copper >= rocketPowerCost.copper && 
    updatedResources.water >= rocketPowerCost.water
  ) {
    updatedResources.iron -= rocketPowerCost.iron;
    updatedResources.copper -= rocketPowerCost.copper;
    updatedResources.water -= rocketPowerCost.water;
    rocketPowerCost.iron = Math.round(rocketPowerCost.iron * (1 + costIncreasePercentage / 100));
    rocketPowerCost.copper = Math.round(rocketPowerCost.copper * (1 + costIncreasePercentage / 100));
    rocketPowerCost.water = Math.round(rocketPowerCost.water * (1 + costIncreasePercentage / 100));
    updateText();

    rocketPowerCount -= 1000;

    if (rocketPowerCount <= minRocketPowerCount) {
      rocketPowerCount = minRocketPowerCount;
    }

    localStorage.setItem('resources', JSON.stringify(updatedResources));
    localStorage.setItem('rocketPowerCount', rocketPowerCount);
    localStorage.setItem('rocketPowerCost', JSON.stringify(rocketPowerCost));

    location.reload();
  } else {
    alert("Not enough resources to purchase the upgrade!");
  }
});

window.onload = function () {
  miningSpeed = localStorage.getItem('miningSpeed') || 5000;

  const storedDrillEfficiencyCost = JSON.parse(localStorage.getItem('drillEfficiencyCost'));
  drillEfficiency = parseInt(localStorage.getItem('drillEfficiency')) || 1;

  const storedSateliteCost = JSON.parse(localStorage.getItem('sateliteCost'));
  sateliteCount = parseInt(localStorage.getItem('sateliteCount')) || 1;

  const storedRocketCost = JSON.parse(localStorage.getItem('rocketCost'));
  const rocketPurchased = localStorage.getItem('rocketUpgradeComplete');

  const storedRocketPowerCost = JSON.parse(localStorage.getItem('rocketPowerCost'));
  rocketPowerCount = parseInt(localStorage.getItem('rocketPowerCount')) || 10000;


  if (storedRocketPowerCost) {
    rocketPowerCost = storedRocketPowerCost;
  }
  if (rocketPowerCount <= minRocketPowerCount) {
    rocketPowerCount = minRocketPowerCount;
  }

  if(rocketPurchased === 'true') {
    travelButton.style.display = 'block';
  }
  if (storedRocketCost) {
    rocketCost = storedRocketCost;
  }

  if (storedSateliteCost) {
    sateliteCost = storedSateliteCost;
  }
  if (sateliteCount >= maxSateliteCount) {
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


