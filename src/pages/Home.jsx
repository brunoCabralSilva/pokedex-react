import React, { useEffect, useContext } from 'react';
import contexto from '../context';
import Pokemon from '../components/Pokemon';
import TypeList from '../components/TypeList';
import Logo from '../components/Logo';
import Filter from '../components/Filter';
import data from '../fetchs';

const { getAllPokemon } = data;

function Home() {
  const context = useContext(contexto);
  const { 
    buttonOption, finish, listPokemon, moreTwenty,
    setList, searchByGen, setButton, letraMaiuscula, searchByType,
  } = context;

  useEffect(() => {
    const firstCall = async () => {
      const call = await getAllPokemon(0);
      setList(call.results);
    };
      setButton('all');
      return firstCall;
  }, []);

  const buttonReturn = () => {
    if (buttonOption === 'hidden') {
      return null
    } else if(finish === false) {
      if(buttonOption === 'all') {
        return (
          <button type="button" className="p-3 bg-gray-300 w-full" onClick={ moreTwenty }>
              Mais Pokémon
          </button>
        );
      } else if (buttonOption === 'generation') {
        return (
          <button type="button" className="p-3 bg-gray-300 w-full" onClick={ () => searchByGen('more20') }>
            Mais Pokemon
          </button>
        );
      } else if (buttonOption === 'type') {
        return (
          <button type="button" className="p-3 bg-gray-300 w-full" onClick={ () => searchByType('more20') }>
            Mais Pokemon
          </button>
        );
      } else {
        return(
          <button type="button" className="p-3 bg-gray-300 w-full" onClick={ () => window.scrollTo(0, 0) }>
            Voltar ao topo
          </button>
        );
      }
     } else {
      return(
        <button type="button" className="p-3 bg-gray-300 w-full" onClick={ () => window.scrollTo(0, 0) }>
          Voltar ao topo
        </button>
      );
    }
  }

  const returnPokemonList = () => {
    const list = listPokemon.length > 0 && listPokemon.map((poke, index) => {
      let number = poke.id;
      if(number === undefined) {
        const numero = poke.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        number = numero.replace('/', '');
      }
      return (
        <Pokemon
          key={index}
          className="snap-start w-30vw"
          name={ poke.name }
          id={ number }
          letraMaiuscula={ letraMaiuscula }
        />
      );
    });
    return list;
  }

    return (
      <div className="flex flex-col w-full bg-gradient-mewtwo bg-cover">
        <header className="flex justify-center w-full h-80 bg-mewtwo">
          <Logo classImage="w-2/5" />
        </header>
      <div className="flex flex-row items-center justify-center sm:items-start sm:justify-between w-full">
        <section className="w-full sm:w-4/5 flex flex-col justify-center items-center m-2">
          <Filter />
          <div className="w-full flex flex-row items-center justify-evenly sm:m-2">
            <div className={`w-full flex flex-row flex-wrap items-center justify-between `}>
            { returnPokemonList() }
            </div>
          </div>
          { buttonReturn() }
        </section>
        <aside className="hidden sm:flex sm:flex-col w-1/5 bg-gray-200 sm:mr-2 sm:my-2">
          <TypeList />
        </aside>
      </div>
      </div>
    );
  }

export default Home;