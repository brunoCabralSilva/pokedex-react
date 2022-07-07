const getByType = async (tipo) => {
    const fetchType = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const fetchJson = await fetchType.json();
    return fetchJson;
}

const get6 = async (initial, final) => {
    let array6 = [];
    for(let i = initial; i<= final; i += 1) {
        const fetchPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${Number(i)}`);
        const fetchJson = await fetchPoke.json();
        array6.push(fetchJson);

    }
    return array6;
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

const getAllPokemon = async (twenty) => {
    const fetchType = await fetch(twenty);
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

const data = { get6, getByType, allTypes, getByGeneration, getByName, evolution, getAllPokemon };

export default data;