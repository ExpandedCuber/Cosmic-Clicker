const rocketPower = document.getElementsByClassName('rocketpowerprice')[0];
const drillSpeed = document.getElementsByClassName('drillspeedprice')[0];

rocketPower.addEventListener('click', purchaseRocketPower);

import { resources } from './mining.js';

const costIncreasePercentage = 100;

let rocketPowerCost = 100; 

function purchaseRocketPower() {

    if ( resources.iron >= rocketPowerCost) {

        resources.iron -= rocketPowerCost;

        rocketPowerCost = Math.round(rocketPowerCost * (1 + costIncreasePercentage / 100));
    } else {
        alert("Not enough resources to purchase the upgrade!");
    }
}

function priceText() {

    rocketPowerPrice.textContent = rocketPowerCost;

    localStorage.setItem('resources', JSON.stringify(resources));
}

function price() {

    upgradeCost.rocketPowerPrice = (upgradeCost.rocketPowerPrice || 0) + 100;
}