const sateliteCount = localStorage.getItem('sateliteCount');
const travelButton = document.getElementById('travel');
const planets = document.querySelectorAll('.planet');
const planetArray = Array.from(planets);

function setCurrentPlanet(planetId) {
    localStorage.setItem('currentPlanet', planetId);
    console.log(localStorage.getItem('currentPlanet'));
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

travelButton.addEventListener('click', function () {
    let randomIndex;
    let randomPlanet;

    do {
        randomIndex = Math.floor(Math.random() * planetArray.length);
        randomPlanet = planetArray[randomIndex];
    } while (randomPlanet.style.display === 'block');

    setCurrentPlanet(randomPlanet.id);

    for (const planet of planetArray) {
        planet.style.display = planet === randomPlanet ? 'block' : 'none';
    }
});
