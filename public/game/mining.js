const iron = document.getElementById('iron');
const copper = document.getElementById('copper');
const water = document.getElementById('water');
const miningProgress = document.getElementById('miningProgress');

const resources = {};

window.onload = function () {
    const resourceStorage = JSON.parse(localStorage.getItem('resources'));
    if (resourceStorage) {
        Object.assign(resources, resourceStorage);
        resourceAmount();
    }
};

function mineWetPlanet() {
    // Disable the mining button to prevent multiple clicks during mining
    wetPlanet.disabled = true;

    setTimeout(function () {
        // After 5 seconds, update the resources
        resources.iron = (resources.iron || 0) + 100;
        resources.copper = (resources.copper || 0) + 200;
        resources.water = (resources.water || 0) + 20;

        resourceAmount();
        console.log(resources); // Log the updated resources

        // Re-enable the mining button
        wetPlanet.disabled = false;

        // Save the updated resources to localStorage
        localStorage.setItem('resources', JSON.stringify(resources));
    }, 5000); // 5000 milliseconds = 5 seconds

    miningProgress.style = "display: shown;"

    setTimeout(function () {
        miningProgress.value = 0;
    }, 1000);
    setTimeout(function () {
        miningProgress.value = 1;
    }, 2000);
    setTimeout(function () {
        miningProgress.value = 2;
    }, 3000);
    setTimeout(function () {
        miningProgress.value = 3;
    }, 4000);
    setTimeout(function () {
        miningProgress.value = 4;
        miningProgress.style = "display: none;"
    }, 5000);
    setTimeout(function () {
        miningProgress.value = 0;
    }, 6000);
}

function resourceAmount() {
    iron.title = `Iron: ${resources.iron || 0}`;
    copper.title = `Copper: ${resources.copper || 0}`;
    water.title = `Water: ${resources.water || 0}`;
}

resourceAmount();

const wetPlanet = document.getElementById('wetplanet');
wetPlanet.addEventListener('click', mineWetPlanet);
