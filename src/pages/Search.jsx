import React, { useEffect, useContext } from 'react';
import contexto from '../context';
import Pokemon from '../components/Pokemon';
import Filter from '../components/Filter';
import data from '../fetchs';
import Nav from '../components/Nav';

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
            <button type="button" className="p-3 bg-half-transp w-11/12 hover:border-2 hover:border-white" onClick={ moreTwenty }>
                Mais Pokémon
            </button>
          );
        } else if (buttonOption === 'generation' || buttonOption === 'type') {
          return (
            <button type="button" className="p-3 bg-half-transp w-11/12 hover:border-2 hover:border-white" onClick={ () => searchByGen('more20') }>
              Mais Pokemon
            </button>
          );
        } else {
          return(
            <button type="button" className="p-3 bg-half-transp w-11/12 hover:border-2 hover:border-white" onClick={ () => window.scrollTo(0, 0) }>
              Voltar ao topo
            </button>
          );
        }
       } else {
        return(
          <button type="button" className="p-3 bg-half-transp w-11/12 hover:border-2 hover:border-white" onClick={ () => window.scrollTo(0, 0) }>
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
      <div className="bg-wallpaper-lilas bg-fixed bg-cover">
        <Nav />
        <div className="h-45vh">
          <p className="text-6xl w-full text-center sm:text-left font-bold p-14">Busca</p>
        </div>
        <Filter />
        <div className="flex flex-row items-left justify-center">
          <div className={`w-11/12 flex flex-row flex-wrap items-center justify-left `}>
            { returnPokemonList() }
          </div>
        </div>
        <div className="flex justify-center w-full mt-4 pb-4 font-bold text-white">
        { buttonReturn() }
        </div>
      </div>
    );
}
