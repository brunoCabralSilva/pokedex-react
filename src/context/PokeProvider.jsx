import { useState } from 'react';
import contexto from './index';
import { getGeneralist } from '../fetchs';
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
  const [countPokemon, setCountPokemon] = useState(0);
  const [messageTypes, setMessageTypes] = useState('');
  const [messageTypesMove, setMessageTypesMove] = useState('');
  const [team, setTeam] = useState([]);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [firstPage, setFirstPage] = useState(1);
  const [firstPositionLitMove, setFirstPositionLitMove] = useState(0);
  
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

  const queryMorePokemon = async(list, setListDisplayed) => {
    setLoadingPokemon(true);
    let listItems = await Promise.all(
      list.map(async (item) => await getGeneralist(item.url)));
      setListDisplayed(listItems);
      setTimeout(() => {
        setLoadingPokemon(false);
      }, 500);
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
    let pages = [];
    let numberButtons = 6;
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
            }
            window.location.href = '#init'
          }}
        >
          { totalPages + i}
        </button>
      );
    }
    const spanItem = <div className="px-2 py-1 border mx-1">...</div>;
    const elementFirst = <button
    className={`px-2 py-1 border mx-1 ${valueButton === 1 && 'border-2 border-marinho'}`}
      onClick={ () => {
          setValueButton(1);
          queryByPage(1, list, setListDisplayed);
          setFirstPage(1);
          window.location.href = '#init'
        }
      }
    >1</button>;
    const elementLast = <button
    className={`px-2 py-1 border mx-1 ${valueButton === allPages && 'border-2 border-marinho'}`}
      onClick={ () => {
        setValueButton(allPages);
        queryByPage(allPages, list, setListDisplayed);
        setFirstPage(Math.round(list.length/20 - 5));
        window.location.href = '#init';
      }
    }
      >{allPages}</button>
    const elementPrevious = <button
     className={`px-2 py-1 border mx-1 ${valueButton === firstPage - 15 && 'border-2 border-marinho'}`}
      onClick={ () => {
        if (firstPage - 15 < 0) {
          setFirstPage(firstPage - 15);
          queryByPage(1, list, setListDisplayed);
        } else {
          queryByPage(firstPage - 15, list, setListDisplayed);
          setFirstPage(firstPage - 15);
        }
        window.location.href = '#init';
      }}
    >
      { firstPage - 15}
    </button>;
    const elementNext = <button
      className={`px-2 py-1 border mx-1 ${valueButton === firstPage + 15 && 'border-2 border-marinho'}`}
      onClick={ () => {
        setValueButton(firstPage + 15);
        if (firstPage + 15 > (allPages- 5)) {
          setFirstPage(allPages- 5);
          queryByPage(allPages- 5, list, setListDisplayed);
        } else {
          queryByPage(firstPage + 15, list, setListDisplayed);
          setFirstPage(firstPage + 15);
        }
        window.location.href = '#init';
      }}
    >
      { firstPage + 15}
    </button>;
    let concludePage = [];
    console.log(allPages);
    if (allPages > 6) {

    }
    if (firstPage > 20 && firstPage + 15 < allPages) {
      console.log('1 if');
      concludePage = [elementPrevious, spanItem, ...pages, spanItem, elementNext];
    } else if (firstPage > 3 && firstPage < 20 && firstPage + 15 < allPages) {
        console.log('2 if');
        concludePage = [elementFirst, spanItem, ...pages, spanItem, elementNext];
    } else if (firstPage + 15 < allPages) {
      console.log('3 if');
      concludePage = [...pages, spanItem, elementNext];
    } else if (firstPage > 20 && firstPage + 15 > allPages - 5 && firstPage < allPages - 5) {
      console.log('4 if');
      concludePage = [elementPrevious, spanItem, ...pages, spanItem, elementLast];
    } 
    
    else if (Math.round(list.length/20 <= 6)) {
      console.log('5 if');
      concludePage = [...pages];
    }

    else if (allPages <= 10 && firstPage + 6 > allPages) {
      console.log('6 if');
      concludePage = [elementFirst, spanItem, ...pages];
    }
    
    else if (firstPage + 5 >= allPages) {
      console.log('8 if');
      concludePage = [elementFirst, spanItem, ...pages];
    }

    else if (firstPage + 15 > allPages && allPages < 15 && firstPage + 5 > allPages - 5) {
      console.log('7 if');
      concludePage = [...pages, spanItem, elementLast];
    }


    else if (firstPage + 15 > allPages && allPages < 15 ) {
      console.log('9 if');
      concludePage = [...pages, spanItem, elementLast];
    }

    else {
      console.log('10 if');
      concludePage = [elementPrevious, spanItem, ...pages];
    }
    return (concludePage);
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
      }}
    >
      {children}
    </contexto.Provider>
  );
}