const sateliteCount = localStorage.getItem('sateliteCount');
const travelButton = document.getElementById('travel');
const planets = document.querySelectorAll('.planet');
const planetArray = Array.from(planets);

function setCurrentPlanet(planetId) {
    localStorage.setItem('currentPlanet', planetId);
}

function getCurrentPlanet() {
    return localStorage.getItem('currentPlanet');
}

document.addEventListener('DOMContentLoaded', function () {
    const savedPlanetId = getCurrentPlanet();

    if (savedPlanetId) {
        const savedPlanet = planetArray.find(planet => planet.id === savedPlanetId);

        if (savedPlanet) {
            for (const planet of planetArray) {
                planet.style.display = planet === savedPlanet ? 'block' : 'none';
            }
        }
    }
    if(!savedPlanetId) {
        wetPlanet.style.display = 'block';
    }
});


//Make it cost rocket fuel to travel
let lastDisplayedPlanetId = null; // Add this variable to keep track of the last displayed planet

travelButton.addEventListener('click', function () {
    const rocketTime = localStorage.getItem('rocketPowerCount') || 10000;

    // Find the currently displayed planet
    const savedPlanetId = getCurrentPlanet();
    const savedPlanet = planetArray.find(planet => planet.id === savedPlanetId);

    const rocketFlying = document.getElementById('rocketFlying');

    rocketFlying.style.display = 'block';

    travelButton.style.display = 'none';

    if (savedPlanet) {
        savedPlanet.style.display = 'none';

        setTimeout(() => {
            let randomIndex;
            let randomPlanet;

            do {
                randomIndex = Math.floor(Math.random() * planetArray.length);
                randomPlanet = planetArray[randomIndex];
            } while (randomPlanet.style.display === 'block' || randomPlanet.id === lastDisplayedPlanetId);

            setCurrentPlanet(randomPlanet.id);

            lastDisplayedPlanetId = randomPlanet.id; // Update the last displayed planet

            for (const planet of planetArray) {
                planet.style.display = planet === randomPlanet ? 'block' : 'none';
            }
            travelButton.style.display = 'block';
            rocketFlying.style.display = 'none';
        }, rocketTime);
    }
});



