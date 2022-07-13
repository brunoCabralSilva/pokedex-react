import React, { useEffect, useState, useContext } from 'react';
import contexto from '../context';
import Pokemon from '../components/Pokemon';
import TypeList from '../components/TypeList';
import Logo from '../components/Logo';
import Filter from '../components/Filter';
import data from '../fetchs';
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const { getAllPokemon } = data;

function Home() {
  const context = useContext(contexto);
  const { listPokemon, setList, searchByGen } = context;

  const [first, setFirst] = useState(0);
 
  useEffect(() => {
    const firstCall = async () => {
      const call = await getAllPokemon(0);
      setList(call.results);
    };
      return firstCall;
  }, []);
   
  function letraMaicuscula (nome) {
    let novoNome = nome[0].toUpperCase();
    for (let i = 1; i < nome.length; i += 1) {
      novoNome += nome[i];
    }
    return novoNome;
  }

  const moreTwenty = async () => {
    const newFirst = first + 20;
    const call = await getAllPokemon(newFirst);
    setFirst(newFirst);
    setList([...listPokemon, ...call.results]);
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
          letraMaicuscula={ letraMaicuscula }
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
          <button type="button" className="p-3 bg-gray-300" onClick={ moreTwenty }>
            Mais Pokémon
          </button>
          <button type="button" className="p-3 bg-gray-300" onClick={ () => searchByGen('more20') }>
            Mais da Geração
          </button>
        </section>
        <aside className="hidden sm:flex sm:flex-col w-1/5 bg-gray-200 sm:mr-2 sm:my-2">
          <TypeList letraMaicuscula={ letraMaicuscula } />
        </aside>
      </div>
      </div>
    );
  }

export default Home;