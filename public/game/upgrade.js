const rocketPower = document.getElementById('rocketpower');
const drillSpeedElement = document.getElementById('drillspeed');

drillSpeedElement.addEventListener('click', drillSpeed);

const resources = JSON.parse(localStorage.getItem('resources')) || {};

console.log(resources.iron);
console.log(resources.copper);
console.log(resources.water);

function updateText() {
    drillSpeedElement.textContent = `Iron: ${drillSpeedCost}`;
}


let miningSpeed = 5000;
const costIncreasePercentage = 100;

let drillSpeedCost = 100;

function drillSpeed() {
    if (resources.iron >= drillSpeedCost) {
        resources.iron -= drillSpeedCost;
        drillSpeedCost = Math.round(drillSpeedCost * (1 + costIncreasePercentage / 100));
        updateText();

        miningSpeed -= 1000; // Decrease miningSpeed by 1000 milliseconds

        localStorage.setItem('miningSpeed', miningSpeed);
        localStorage.setItem('resources', JSON.stringify(resources));
        localStorage.setItem('drillSpeedCost', drillSpeedCost);
    } else if (resources.iron < drillSpeedCost) {
        alert("Not enough resources to purchase the upgrade!");
    }
}


window.onload = function () {
    drillSpeedCost = parseInt(localStorage.getItem("drillSpeedCost")) || 100;
    updateText();
}