import { useState } from 'react';
import contexto from './index';
import data from '../fetchs';
const { getByName, getByGeneration } = data;

export default function PokeProvider({ children }) {
  const [listPokemon, setListPokemon] = useState([]);
  const [pokeGen, setPokeGen] = useState([]);
  const [ultimo, setUltimo] = useState([0]);
  
  const searchByGen = async (generation) => {
    if(generation !== 'more20' ) {
      const call = await getByGeneration(generation);
      setPokeGen(call);
      let arrayGen = [];
      for(let i = 0; i <= 19; i += 1){
        arrayGen.push(call[i]);
      }
      setListPokemon(arrayGen);
      setUltimo(19);
    } else {
        let arrayGen = [];
        for(let i = ultimo + 1; i <= ultimo + 20; i += 1){
          arrayGen.push(pokeGen[i]);
        }
        setListPokemon([...listPokemon, ...arrayGen]);
        setUltimo(ultimo + 20);
      }
  }

  const searchByNameId = async (state) => {
    if(typeof(state) === 'string') {
      state = state.toLowerCase();
    }
    const fetchApi = await getByName(state);
    setListPokemon([{ name: fetchApi.name, id: fetchApi.id }]);
  }

  const setList = (list) => {
    setListPokemon(list);
  }

  function letraMaicuscula (nome) {
    let novoNome = nome[0].toUpperCase();
    for (let i = 1; i < nome.length; i += 1) {
      novoNome += nome[i];
    }
    return novoNome;
  }

  return(
    <contexto.Provider value={{
      listPokemon, pokeGen,
      searchByNameId, letraMaicuscula, setList, searchByGen,
      }}
    >
      {children}
    </contexto.Provider>
  );
}