import { useState } from 'react';
import { getByName } from '../fetchs';
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
  const [listAlternatives, setListAlternatives] = useState([]);
  const [listAltDisplayed, setListAltDisplayed] = useState([]);
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

  const addFavorite = (checked, searchByName) => {
    console.log(searchByName);
    if (checked) {
      const listAdd = {
        id: searchByName.id,
        name: searchByName.name,
        sprites: searchByName.sprites,
        types: searchByName.types,
      }
      const sortList = [...listFavorites, listAdd].sort((a, b) => Number(a.id) - Number(b.id));
      localStorage.setItem('favorites', JSON.stringify(sortList));
      setListFavorites(sortList);
    } else {
      const removeFavorites = listFavorites
        .filter((favorite) => favorite.name !== searchByName.name);
      localStorage.setItem('favorites', JSON.stringify(removeFavorites));
      setListFavorites(removeFavorites);
    }
  };

  const numberPokemon = (poke) => {
    if (poke.id === undefined) {
      console.log(poke.url);

      if (poke.url.includes('https://pokeapi.co/api/v2/pokemon-species/')) {
        console.log('All Pokemon');
        const numero = poke.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        console.log(numero.replace('/', ''));
        return numero.replace('/', '');
      } else {
        const numero = poke.url.replace('https://pokeapi.co/api/v2/pokemon/', '');
        console.log(numero.replace('/', ''));
        return numero.replace('/', '');
      } 
        
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
      listAlternatives, setListAlternatives,
      listAltDisplayed, setListAltDisplayed,
      gen, setGen,
      team, setTeam,
      letraMaiuscula,
      addFavorite,
      numberPokemon,
      }}
    >
      {children}
    </contexto.Provider>
  );
}