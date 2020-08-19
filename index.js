const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatches(searchChars, cities) {
    return cities.filter(place => {
        //Convert search term to Regex to account for case
        const regex = new RegExp(searchChars, "gi");
        return place.city.match(regex) || place.state.match(regex);
    })
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const resultsHtml = matchArray.map(place => {
        const regex = new RegExp(this.value, "gi");
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        const pop = numberWithCommas(place.population);
        return `
            <li>
                <span class="city">${cityName}, ${stateName}</span>
                <span class="population">${pop}</span>
            </li>
        `
    }).join(" ");

    results.innerHTML = resultsHtml;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const input = document.querySelector(".search");
const results = document.querySelector(".suggestions");

input.addEventListener("keyup", displayMatches);