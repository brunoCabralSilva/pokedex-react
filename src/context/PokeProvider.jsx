import { useState } from 'react';
import contexto from './index';

export default function PokeProvider({ children }) {
  const [list, setList] = useState([]);
  const [gen, setGen] = useState('1');
  const[lastSelectedGen, setLastSelectedGen] = useState('');
  const [listGeneration, setListGeneration] = useState([]);
  const [listType, setListType] = useState([]);
  const [type, setType] = useState([]);
  const [allPokemonGeneration, setAllPokeOfGeneration] = useState([]);
  const [search, setSearch] = useState('ALL');
  const [listFavorites, setListFavorites] = useState([]);
  const [countPokemon, setCountPokemon] = useState(0);
  const [messageTypes, setMessageTypes] = useState('');
  const [team, setTeam] = useState([]);
  
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
  };

  return(
    <contexto.Provider value={{
      list,setList,
      listGeneration, setListGeneration,
      allPokemonGeneration, setAllPokeOfGeneration,
      listType, setListType,
      type, setType,
      search, setSearch,
      lastSelectedGen, setLastSelectedGen,
      listFavorites, setListFavorites,
      countPokemon, setCountPokemon,
      messageTypes, setMessageTypes,
      gen, setGen,
      team, setTeam,
      letraMaiuscula,
      numberPokemon,
      }}
    >
      {children}
    </contexto.Provider>
  );
}