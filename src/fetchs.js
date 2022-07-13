const getByType = async (tipo) => {
    const fetchType = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const fetchJson = await fetchType.json();
    return fetchJson;
}

const allTypes = async () => {
    const fetchType = await fetch(`https://pokeapi.co/api/v2/type`);
    const fetchJson = await fetchType.json();
    return fetchJson;
}

const getByGeneration = async (gen) => {
    const fetchType = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`);
    const fetchJson = await fetchType.json();
    return fetchJson;
}

const getAllPokemon = async (first) => {
    const firstString = first.toString();
    const fetchType = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=${firstString}&limit=%20`);
    const fetchJson = await fetchType.json();
    return fetchJson;
}

const getByName = async (nome) => {
    const fetchType = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    const fetchJson = await fetchType.json();
    return fetchJson;
}

const evolution = async (numero) => {
    const fetchType = await fetch(` https://pokeapi.co/api/v2/evolution-chain/${1}`);
    const fetchJson = await fetchType.json();
    return fetchJson;
}

const data = { getByType, allTypes, getByGeneration, getByName, evolution, getAllPokemon };

export default data;