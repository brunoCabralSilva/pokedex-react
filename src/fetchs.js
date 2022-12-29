export const getByType = async (tipo) => {
  console.log(tipo);
  const fetchType = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
  const fetchJson = await fetchType.json();
  return fetchJson;
};

export const getAllTypes = async () => {
  const fetchType = await fetch(`https://pokeapi.co/api/v2/type`);
  const fetchJson = await fetchType.json();
  return fetchJson;
};

export const getNumberOfPokemon = async () => {
  const fetchType = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
  const fetchJson = await fetchType.json();
  return fetchJson;
};

export const getMove = async (move) => {
  const fetchType = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
  const fetchJson = await fetchType.json();
  return fetchJson;
}

export const getGeneralist = async (url) => {
  const fetchType = await fetch(url);
  const fetchJson = await fetchType.json();
  return fetchJson;
}

export const getByGeneration = async (gen) => {
  const fetchType = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`);
  const fetchJson = await fetchType.json();
  let arrayGen = [];
  for (let i = 0; i < fetchJson.pokemon_species.length; i += 1) {
    const name = await fetchJson.pokemon_species[i].name;
    const numero = await fetchJson.pokemon_species[i].url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
    const number = numero.replace('/', '');
      arrayGen.push({name: name, id: number, url: fetchJson.pokemon_species[i].url });
  }
  return arrayGen;
};

export const getAllPokemonSpecies = async () => {
  const fetchType = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=1&limit=2000"`);
  const fetchJson = await fetchType.json();
  return fetchJson;
};

export const getByName = async (nome) => {
  const fetchType = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
  const fetchJson = await fetchType.json();
  return fetchJson;
};

export const evolution = async (numero) => {
  const fetchType = await fetch(` https://pokeapi.co/api/v2/evolution-chain/${numero}`);
  const fetchJson = await fetchType.json();
  return fetchJson;
};