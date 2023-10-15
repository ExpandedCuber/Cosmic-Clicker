const planet = document.querySelectorAll('.planet');

const sateliteCount = localStorage.getItem('sateliteCount');
const travelButton = document.getElementById('travel');

let planetList= {
    wetPlanetCount: 1,
    dryPlanetCount: 0
};

function currentPlanet() {
    
}

function createPlanets() {
    const wetPlanetCount = localStorage.getItem('wetPlanetCount') || 1;
    const dryPlanetCount = localStorage.getItem('dryPlanetCount') || 0;

    if(wetPlanetCount) {
        planetList.wetPlanetCount += 1;
    }

    if(dryPlanetCount) {
        planetList.dryPlanetCount += 1;
    }
}

travelButton.addEventListener('click', function () {
    
});