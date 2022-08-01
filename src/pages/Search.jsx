import React, { useEffect, useContext } from 'react';
import contexto from '../context';
import Pokemon from '../components/Pokemon';
import Filter from '../components/Filter';
import data from '../fetchs';

const { getAllPokemon } = data;

export default function Search() {
    const context = useContext(contexto);
    const { 
      buttonOption, finish, listPokemon, moreTwenty,
      setList, searchByGen, setButton, letraMaiuscula,
    } = context;
  
    useEffect(() => {
      const firstCall = async () => {
        const call = await getAllPokemon(0);
        console.log(call);
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
        } else if (buttonOption === 'generation' || buttonOption === 'type') {
          return (
            <button type="button" className="p-3 bg-gray-300 w-full" onClick={ () => searchByGen('more20') }>
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
      <div>
        <Filter />
        <div className="w-full flex flex-row items-center justify-evenly sm:m-2">
          <div className={`w-full flex flex-row flex-wrap items-center justify-between `}>
            { returnPokemonList() }
          </div>
        </div>
        { buttonReturn() }
      </div>
    );
}
