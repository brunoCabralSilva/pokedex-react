import { useState } from 'react';
import contexto from './index';

export default function PokeProvider({ children }) {
  const [list, setList] = useState([]);
  const [gen, setGen] = useState('1');
  const[lastSelectedGen, setLastSelectedGen] = useState('');
  const [listGeneration, setListGeneration] = useState([]);
  const [listType, setListType] = useState([]);
  const [type, setType] = useState([]);
  const [typeMove, setTypeMove] = useState('');
  const [listTypeMove, setListTypeMove] = useState([]);
  const [firstPositionLitMove, setFirstPositionLitMove] = useState(0);
  const [allPokemonGeneration, setAllPokeOfGeneration] = useState([]);
  const [search, setSearch] = useState('ALL');
  const [searchMove, setSearchMove] = useState('ALL');
  const [listFavorites, setListFavorites] = useState([]);
  const [listAllMoves, setListAllMoves] = useState([]);
  const [listMovesDisplayed, setListMovesDisplayed] = useState([]);
  const [countPokemon, setCountPokemon] = useState(0);
  const [messageTypes, setMessageTypes] = useState('');
  const [messageTypesMove, setMessageTypesMove] = useState('');
  const [team, setTeam] = useState([]);
  
  function letraMaiuscula (nome) {
    let novoNome = nome[0].toUpperCase();
    for (let i = 1; i < nome.length; i += 1) {
      novoNome += nome[i];
    }
    return novoNome;
  }

  const addFavorite = (checked, searchByName) => {
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
      if (poke.url.includes('https://pokeapi.co/api/v2/pokemon-species/')) {
        const numero = poke.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        return numero.replace('/', '');
      } else {
        const numero = poke.url.replace('https://pokeapi.co/api/v2/pokemon/', '');
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
      typeMove, setTypeMove,
      listTypeMove, setListTypeMove,
      search, setSearch,
      searchMove, setSearchMove,
      lastSelectedGen, setLastSelectedGen,
      listFavorites, setListFavorites,
      listAllMoves, setListAllMoves,
      listMovesDisplayed, setListMovesDisplayed,
      firstPositionLitMove, setFirstPositionLitMove,
      countPokemon, setCountPokemon,
      messageTypes, setMessageTypes,
      messageTypesMove, setMessageTypesMove,
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