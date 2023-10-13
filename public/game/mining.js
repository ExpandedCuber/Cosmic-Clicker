const iron = document.getElementById('iron');
const copper = document.getElementById('copper');
const water = document.getElementById('water');
const miningProgress = document.getElementById('miningProgress');
const wetPlanet = document.getElementById('wetplanet');
wetPlanet.addEventListener('click', mineWetPlanet);
const resources = {};

window.onload = function () {
    const resourceStorage = JSON.parse(localStorage.getItem('resources'));
    if (resourceStorage) {
        Object.assign(resources, resourceStorage);
        resourceAmount();
    }
};

function mineWetPlanet() {
    wetPlanet.disabled = true;

    const miningSpeed = parseInt(localStorage.getItem('miningSpeed'));

    let progress = 0;

    const updateProgressBar = () => {
        miningProgress.value = progress;
        if (progress < 100) {
            progress += 1;
            setTimeout(updateProgressBar, miningSpeed / 100);
        } else {
            resources.iron = (resources.iron || 0) + 100;
            resources.copper = (resources.copper || 0) + 200;
            resources.water = (resources.water || 0) + 20;

            // Update the resources in localStorage
            localStorage.setItem('resources', JSON.stringify(resources));

            resourceAmount();

            wetPlanet.disabled = false;
            miningProgress.value = 0;
        }
    }

    updateProgressBar();
}

function resourceAmount() {
    const resourceStorage = JSON.parse(localStorage.getItem('resources')) || {};
    iron.title = `Iron: ${resourceStorage.iron || 0}`;
    copper.title = `Copper: ${resourceStorage.copper || 0}`;
    water.title = `Water: ${resourceStorage.water || 0}`;
}

resourceAmount();