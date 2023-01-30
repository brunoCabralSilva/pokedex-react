import { useState } from 'react';
import contexto from './index';
import { getGeneralist } from '../fetchs';
import Loading from '../components/Loading';

const NUMBERBYPAGE = 20;

export default function PokeProvider({ children }) {
  const [listOfAllPokemon, setListOfAllPokemon] = useState([]);
  const [listOfAllPokemonDisplayed, setListOfAllPokemonDisplayed] = useState([]);
  const [listAllMoves, setListAllMoves] = useState([]);
  const [listMovesDisplayed, setListMovesDisplayed] = useState([]);
  const [listOfAll, setListOfAll] = useState([]);
  const [allListDisplayed, setAllListDisplayed] = useState([]);
  const [valueButton, setValueButton] = useState(1);
  const [gen, setGen] = useState('1');
  const [lastSelectedGen, setLastSelectedGen] = useState('');
  const [type, setType] = useState([]);
  const [typeMove, setTypeMove] = useState('');
  const [listTypeMove, setListTypeMove] = useState([]);
  const [search, setSearch] = useState('ALL');
  const [searchMove, setSearchMove] = useState('ALL');
  const [listFavorites, setListFavorites] = useState([]);
  const [listFavoritesDisplayed, setListFavoritesDisplayed] = useState([]);
  const [countPokemon, setCountPokemon] = useState(0);
  const [messageTypes, setMessageTypes] = useState('');
  const [messageTypesMove, setMessageTypesMove] = useState('');
  const [team, setTeam] = useState([]);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [firstPage, setFirstPage] = useState(1);
  const [firstPositionLitMove, setFirstPositionLitMove] = useState(0);
  
  const letraMaiuscula = (nome) => {
    let novoNome = nome[0].toUpperCase();
    for (let i = 1; i < nome.length; i += 1) {
      novoNome += nome[i];
    }
    return novoNome;
  }

  const return20empty = () => {
    let arrayEmpty = [];
    for (let i = 0; i < NUMBERBYPAGE; i += 1) {
      arrayEmpty.push(
        <div className="text-marinho relative col-span-1 bottom-0 wfull text-center pb-2 pt-4 font-bold bg-gradient-to-t h-68 sm1:h-72 sm2:h-80 sm3:h-96 sm:h-40 md:h-48 md2:h-60 lg:h-60 2xl:h-80 from-anil via-anil/60 to-anil/10 flex justify-center">
          <Loading />
        </div> 
      );
    }
    return arrayEmpty;
  }

  const addFavorite = (checked, searchByName) => {
    if (checked) {
      const listAdd = {
        id: searchByName.id,
        name: searchByName.name,
        url: searchByName.species.url,
        sprites: searchByName.sprites,
        types: searchByName.types,
      }
      const sortList = [...listFavorites, listAdd].sort((a, b) => Number(a.id) - Number(b.id));
      localStorage.setItem('favorites', JSON.stringify(sortList));
      setListFavorites(sortList);
    } else {
      const removeFavoritesDisplayed = listFavoritesDisplayed
        .filter((favorite) => favorite.name !== searchByName.name);
      const removeFavorites = listFavorites
        .filter((favorite) => favorite.name !== searchByName.name);
      localStorage.setItem('favorites', JSON.stringify(removeFavorites));
      setListFavorites(removeFavorites);
      setListFavoritesDisplayed(removeFavoritesDisplayed);
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

  const queryMorePokemon = async(list, setListDisplayed, type) => {
    setLoadingPokemon(true);
    if (type === 'all') {
      setListOfAllPokemonDisplayed([]);
    } else {
      setListDisplayed([]);
    }
    let listItems = await Promise.all(
      list.map(async (item) => await getGeneralist(item.url)
    ));
    setListDisplayed(listItems);
    setLoadingPokemon(false);
  };

  const queryByPage = async (number, list, setListDisplayed) => {
    if (number * NUMBERBYPAGE > list.length) {
      const numero = (number - 1) * 20;
      let last = [];
      for (let i = numero; i < list.length; i += 1) {
        last.push(list[i]);
      }
      queryMorePokemon(last, setListDisplayed);
    } else {
      const numero = (number - 1) * 20;
      let last = [];
      for (let i = numero; i < numero + NUMBERBYPAGE; i += 1) {
        last.push(list[i]);
      }
      queryMorePokemon(last, setListDisplayed);
    }
  };

  const previousPage = () => {
    if (firstPage - 1 <= 0) {
      setFirstPage(1);
    } else {
      setFirstPage(firstPage - 1);
    }
  };

  const nextPage = (list, number) => {
    if (firstPage + 1 > (Math.round(list.length/20)- number)) {
      setFirstPage(Math.round(list.length/20)- number);
    }
    else {
      setFirstPage(firstPage + 1);
    }
  }; 

  return(
    <contexto.Provider value={{
      listOfAllPokemon, setListOfAllPokemon,
      listOfAllPokemonDisplayed, setListOfAllPokemonDisplayed,
      listFavorites, setListFavorites,
      listFavoritesDisplayed, setListFavoritesDisplayed,
      listOfAll, setListOfAll,
      allListDisplayed, setAllListDisplayed,
      type, setType,
      typeMove, setTypeMove,
      listTypeMove, setListTypeMove,
      search, setSearch,
      searchMove, setSearchMove,
      lastSelectedGen, setLastSelectedGen,
      countPokemon, setCountPokemon,
      messageTypes, setMessageTypes,
      messageTypesMove, setMessageTypesMove,
      loadingPokemon, setLoadingPokemon,
      firstPage, setFirstPage,
      listAllMoves, setListAllMoves,
      listMovesDisplayed, setListMovesDisplayed,
      firstPositionLitMove, setFirstPositionLitMove,
      gen, setGen,
      team, setTeam,
      letraMaiuscula,
      addFavorite,
      numberPokemon,
      queryByPage,
      nextPage,
      previousPage,
      valueButton, setValueButton,
      NUMBERBYPAGE,
      return20empty,
      queryMorePokemon,
      }}
    >
      {children}
    </contexto.Provider>
  );
}