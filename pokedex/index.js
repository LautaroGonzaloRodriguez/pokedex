const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeContImg = document.querySelector('[data-poke-cont-img]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeType = document.querySelector('[data-poke-type]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColor = {
    bug: '#D8E030',
    dragon: '#B8A0F8',
    electric: '#FFF600',
    fighting: '#C03028',
    fire: '#EE6D19',
    flying: '#A890F0',
    ghost: '#705898',
    ice: '#98D8D8',
    normal: '#A8A878',
    poison: '#A43CA4',
    psychic: '#F85888',
    rock: '#B8A038',
    dark: '#705848',
    steel: '#3C506C',
    water: '#2AAACF',
    grass: '#3ECF2A',
    ground: '#E0C068',
    fairy: '#EE99AC',
    default: '#303030',
}


const searchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => renderPokemonData(response))
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {stats , types} = data;
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = typeColor[types[0].type.name];
    const colorTwo = types[1] ? typeColor[types[1].type.name] : typeColor.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`
    pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = types => {
    pokeType.innerHTML = ''; 
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColor[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeType.appendChild(typeTextElement)
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const stateElement = document.createElement("div");
        const stateElementName = document.createElement("div");
        const stateElementAmount = document.createElement("div");
        stateElementName.textContent = stat.stat.name;
        stateElementAmount.textContent = stat.base_stat;
        stateElement.appendChild(stateElementName);
        stateElement.appendChild(stateElementAmount);
        pokeStats.appendChild(stateElement);
    })
}