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
    let initial = 0;
    let final = 0;
    switch(Number(gen)) {
        case 1:
          initial = 1;
          final = 151
          break;
        case 2:
          initial = 152;
          final = 251;
          break;
        case 3:
          initial = 252;
          final = 386;
          break;
        case 4:
          initial = 387;
          final = 493
          break;
        case 5:
          initial = 494;
          final = 649
          break;
        case 6:
          initial = 650;
          final = 721
          break;  
        case 7:
          initial = 722;
          final = 809;
          break;
        case 8:
          initial = 810;
          final = 98;
          break; 
        default: console.log('valor não numérico');
    }
    
    const fetchType = await fetch('https://pokeapi.co/api/v2/pokedex/1');
    const fetchJson = await fetchType.json();
    let arrayGen = [];
    for (let i = initial - 1; i < final-1; i += 1) {
      const name = fetchJson.pokemon_entries[i].pokemon_species.name;
      const numero = fetchJson.pokemon_entries[i].pokemon_species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
      const number = numero.replace('/', '');
        arrayGen.push({name: name, id: number});
    }
    return arrayGen;
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
    const fetchType = await fetch(` https://pokeapi.co/api/v2/evolution-chain/${numero}`);
    const fetchJson = await fetchType.json();
    return fetchJson;
}

const data = { getByType, allTypes, getByGeneration, getByName, evolution, getAllPokemon };

export default data;