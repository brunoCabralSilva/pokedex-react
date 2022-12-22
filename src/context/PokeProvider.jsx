import { useState } from 'react';
import contexto from './index';

export default function PokeProvider({ children }) {
  const [list, setList] = useState([]);
  const [listGeneration, setListGeneration] = useState([]);
  const [listType, setListType] = useState([]);
  const [allPokemonGeneration, setAllPokeOfGeneration] = useState([]);
  
  function letraMaiuscula (nome) {
    let novoNome = nome[0].toUpperCase();
    for (let i = 1; i < nome.length; i += 1) {
      novoNome += nome[i];
    }
    return novoNome;
  }

  const numberPokemon = (poke) => {
    if (poke.id === undefined) {
      const numero = poke.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
      return numero.replace('/', '');
    } return poke.id;
  }

  return(
    <contexto.Provider value={{
      list,setList,
      listGeneration, setListGeneration,
      allPokemonGeneration, setAllPokeOfGeneration,
      listType, setListType,
      letraMaiuscula,
      numberPokemon,
      }}
    >
      {children}
    </contexto.Provider>
  );
}