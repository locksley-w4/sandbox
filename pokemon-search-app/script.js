const pokeapi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const avatarContainer = document.querySelector(".avatar-container");
const statsFields = {
  weight: document.getElementById("weight"),
  height: document.getElementById("height"),
  hp: document.getElementById("hp"),
  types: document.getElementById("types"),
  attack: document.getElementById("attack"),
  defense: document.getElementById("defense"),
  "special-attack": document.getElementById("special-attack"),
  "special-defense": document.getElementById("special-defense"),
  speed: document.getElementById("speed"),
};
const formatName = (name) => {
  name = name.toLowerCase();
  name = name.replace(/\u2640/, "-f");
  name = name.replace(/\u2642/, "-m");
  name = [...name].filter((char) => char.match(/[a-z0-9\-]/));
  name = name.join("");
  return name;
};
async function getPokemonData() {
  let input = searchInput.value.trim();
  let res, data;
  try {
    if (Number.isNaN(+input)) input = formatName(input);
    res = await fetch(`${pokeapi}/${input}`);
    data = await res.json();
    return data;
  } catch {
    return `NOT_FOUND`;
  }
}

const displayStat = (name, data) => {
  let stat = data.stats.find((elem) => elem.stat.name === name);
  statsFields[name].innerHTML = `
        <td>${name}</td>
        <td>${stat.base_stat}</td>
    `;
};

async function displayData() {
  const data = await getPokemonData();
  if (data === "NOT_FOUND") {
    alert("Pokémon not found");
    return;
  }
  const name = data.name;
  pokemonName.textContent = name.toUpperCase();
  pokemonId.textContent = `#${data.id}`;
  console.log(data);
  avatarContainer.innerHTML = `<img src="${data.sprites.front_default}" alt="${name}'s avatar"/>`;
  statsFields["weight"].innerHTML = `
        <td>Weight</td>
        <td>${data.weight}</td>
    `;
  statsFields["height"].innerHTML = `
        <td>Height</td>
        <td>${data.height}</td>
    `;
  statsFields["types"].innerHTML = `
        <td>Types</td>
        <td>${data.types.reduce(
          (acc, elem) => `${acc} ${elem.type.name.toUpperCase()}`,
          ""
        )}</td>
    `;
  data.stats.forEach((elem) => {
    displayStat(elem.stat.name, data);
  });
}

searchButton.addEventListener("click", displayData);
