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
      listFavoritesDisplayed(removeFavoritesDisplayed);
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

  const returnFivePages = (list, setListDisplayed) => {
    const largura = window.screen.width;
    let pages = [];
    let numberButtons = 0;
    if (largura >= 450) {
      numberButtons = 6;
    } else if (largura < 280) {
      numberButtons = 1;
    } else {
      numberButtons = 2;
    }
    let allPages = Math.round(list.length/20);
    const pagesByNUMBEROFPAGES = list.length/NUMBERBYPAGE;
    const roundNUMBEROFPAGES = Math.round(list.length/20);
    if (pagesByNUMBEROFPAGES > roundNUMBEROFPAGES) {
      allPages = roundNUMBEROFPAGES + 1;
    }
    let totalPages = firstPage;
    if (allPages < 6) {
      numberButtons = allPages;
      totalPages = 1;
    }

    const spanItem = <div className={`${largura < 330 ? 'px-0' : 'px-2 py-1 border'}  mx-1`}>...</div>;

    for (let i = 0; i < numberButtons ; i += 1 ) {
      pages.push(
        <button
          key={i}
          type="button"
          className={`px-2 py-1 border mx-1 ${valueButton === totalPages + i && 'border-2 border-marinho'}`}
          onClick={ () => {
            setValueButton(totalPages + i);
            if (totalPages + i > (allPages- 5)) {
              queryByPage(totalPages + i, list, setListDisplayed);
              setFirstPage(allPages- 5);
            } else {
              queryByPage(totalPages + i, list, setListDisplayed);
              setFirstPage(totalPages + i);
              window.location.href ='#init';
            }
          }}
        >
          { totalPages + i}
        </button>
      );
    }

    const elementFirst = <button
    className={`px-2 py-1 border mr-1 sm:mx-1 ${valueButton === 1 && 'border-2 border-marinho'}`}
      onClick={ () => {
          setValueButton(1);
          queryByPage(1, list, setListDisplayed);
          setFirstPage(1);
          window.location.href ='#init';
        }
      }
    >1</button>;

    const elementLast = <button
    className={`px-2 py-1 border ml-1 sm:mx-1 ${valueButton === allPages && 'border-2 border-marinho'}`}
      onClick={ () => {
        setValueButton(allPages);
        queryByPage(allPages, list, setListDisplayed);
        setFirstPage(Math.round(list.length/20 - 5));
        window.location.href ='#init';
      }
    }
      >{allPages}</button>;
    
    const elementPrevious = <button
     className={`px-2 py-1 border mr-1 sm:mx-1 ${valueButton === firstPage - 15 && 'border-2 border-marinho'}`}
      onClick={ () => {
        if (firstPage - 15 < 0) {
          setFirstPage(firstPage - 15);
          queryByPage(1, list, setListDisplayed);
        } else {
          queryByPage(firstPage - 15, list, setListDisplayed);
          setFirstPage(firstPage - 15);
        }
        window.location.href ='#init';
      }}
    >
      { firstPage - 15}
    </button>;

    const elementNext = <button
      className={`px-2 py-1 border ml-1 sm:mx-1 ${valueButton === firstPage + 15 && 'border-2 border-marinho'}`}
      onClick={ () => {
        setValueButton(firstPage + 15);
        if (firstPage + 15 > (allPages- 5)) {
          setFirstPage(allPages- 5);
          queryByPage(allPages- 5, list, setListDisplayed);
        } else {
          queryByPage(firstPage + 15, list, setListDisplayed);
          setFirstPage(firstPage + 15);
        }
        window.location.href ='#init';
      }}
    >
      { firstPage + 15}
    </button>;

    let concludePage = [];
    if (firstPage > 20 && firstPage + 15 < allPages) {
      concludePage = [elementPrevious, spanItem, ...pages, spanItem, elementNext];
    } else if (firstPage > 3 && firstPage < 20 && firstPage + 15 < allPages) {
        concludePage = [elementFirst, spanItem, ...pages, spanItem, elementNext];
    } else if (firstPage + 15 < allPages) {
      concludePage = [...pages, spanItem, elementNext];
    } else if (firstPage > 20 && firstPage + 15 > allPages - 5 && firstPage < allPages - 5) {
      concludePage = [elementPrevious, spanItem, ...pages, spanItem, elementLast];
    } else if (Math.round(list.length/20 <= 6)) {
      concludePage = [...pages];
    } else if (allPages <= 10 && firstPage + 6 > allPages) {
      concludePage = [elementFirst, spanItem, ...pages];
    } else if (firstPage + 5 >= allPages) {
      concludePage = [elementFirst, spanItem, ...pages];
    } else if (firstPage + 15 > allPages && allPages < 15 && firstPage + 5 > allPages - 5) {
      concludePage = [...pages, spanItem, elementLast];
    } else if (firstPage + 15 > allPages && allPages < 15 ) {
      concludePage = [...pages, spanItem, elementLast];
    } else {
      concludePage = [elementPrevious, spanItem, ...pages];
    } return (concludePage);
  };

  const previousPage = () => {
    if (firstPage - 1 <= 0) {
      setFirstPage(1);
    } else {
      setFirstPage(firstPage - 1);
    }
  };

  const nextPage = (list) => {
    if (firstPage + 1 > (Math.round(list.length/20)- 5)) {
      setFirstPage(Math.round(list.length/20)- 5);
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
      returnFivePages,
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