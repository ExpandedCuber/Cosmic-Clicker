
const travelButton = document.getElementById('travel');
const planets = Array.from(document.querySelectorAll('.planet'));
const rocketFlying = document.getElementById('rocketFlying');

let lastDisplayedPlanetId = null;

function setCurrentPlanet(planetId) {
    localStorage.setItem('currentPlanet', planetId);
}

function getCurrentPlanet() {
    return localStorage.getItem('currentPlanet');
}

document.addEventListener('DOMContentLoaded', function () {
    const savedPlanetId = getCurrentPlanet();

    if (savedPlanetId) {
        const savedPlanet = planets.find(planet => planet.id === savedPlanetId);

        if (savedPlanet) {
            for (const planet of planets) {
                planet.style.display = planet === savedPlanet ? 'block' : 'none';
            }
        }
    } else {
        const wetPlanet = document.getElementById('wetplanet');
        wetPlanet.style.display = 'block';
    }
});

function checkForUpdates() {
    const updatedRocketFuel = localStorage.getItem('rocketFuelCount') || 5;

    if(updatedRocketFuel) {
      rocketFuelCount = updatedRocketFuel;
    }
}

setInterval(checkForUpdates, 100);

travelButton.addEventListener('click', function () {
    const rocketTime = localStorage.getItem('rocketPowerCount') || 10000;
    const savedPlanetId = getCurrentPlanet();
    const savedPlanetElement = document.getElementById(`${savedPlanetId}`);
    const rocketFuelName = document.getElementById('rocketFuelName');

    if (rocketFuelCount >= 1) {
        rocketFuelCount -= 1;
        
        localStorage.setItem('rocketFuelCount', rocketFuelCount);
        rocketFuelName.textContent = `Rocket Fuel: ${rocketFuelCount}`;
        console.log(localStorage.getItem('rocketFuelCount'));


        rocketFlying.style.display = 'block';
        travelButton.style.display = 'none';

        if (savedPlanetId) {
            const savedPlanet = planets.find(planet => planet.id === savedPlanetId);

            if (savedPlanet) {
                for (const planet of planets) {
                    planet.style.display = planet === savedPlanet ? 'block' : 'none';
                    savedPlanetElement.style.display = 'none';
                }
            }
        }

        setTimeout(() => {
            let randomIndex;
            let randomPlanet;

            do {
                randomIndex = Math.floor(Math.random() * planets.length);
                randomPlanet = planets[randomIndex];
            } while (randomPlanet.style.display === 'block' || randomPlanet.id === lastDisplayedPlanetId);

            setCurrentPlanet(randomPlanet.id);

            lastDisplayedPlanetId = randomPlanet.id;

            for (const planet of planets) {
                planet.style.display = planet === randomPlanet ? 'block' : 'none';
            }

            travelButton.style.display = 'block';
            rocketFlying.style.display = 'none';

        }, rocketTime);
    } else {
        alert('Not enough Rocket Fuel!');
        return; // Prevent further code execution
    }
});
