import React, { useEffect, useContext} from 'react';
import contexto from '../context';
import Pokemon from '../components/Pokemon';
import Filter from '../components/Filter';
import data from '../fetchs';
import Nav from '../components/Nav';
import { useHistory } from 'react-router-dom';

const { getAllPokemon } = data;

export default function Search() {
  const context = useContext(contexto);
  const {
    setList,
    listPokemon,
    letraMaiuscula,
    moreTwentyForAll,
    buttonOption,
    finish,
    first,
    setButton,
    searchByType,
  } = context;
  const history = useHistory();

  useEffect(() => {
    setButton('all');
    const firstCall = async () => {
      const call = await getAllPokemon(first);
      if (listPokemon.length <= 20) {
        if (first + 20 < 898) {
          setList(call.results);
        } else {
          let last898 = [];
          for (let i = 0; i < 898 - first; i += 1) {
            last898.push(call.results[i]);
          }
          setList(last898);
        }
      }
    };
    firstCall();
  }, []);

console.log(buttonOption);

  const buttonReturn = () => {
    if (finish) {
      return (
        <button type="button" className="p-3 bg-half-transp w-11/12 hover:border-2 hover:border-white" onClick={() => window.scrollTo(0, 0)}>
          Voltar ao Topo
        </button>
      );
    }
    if (buttonOption === 'hidden') {
      return null;
    } 
    
    if (buttonOption === 'all') {
      return (
        <button type="button" className="p-3 bg-half-transp w-11/12 hover:border-2 hover:border-white" onClick={moreTwentyForAll}>
          Mais Pokémon
        </button>
      );
    } 
    
    if (buttonOption === 'generation' || buttonOption === 'type') {
      return (
        <button type="button" className="p-3 bg-half-transp w-11/12 hover:border-2 hover:border-white" onClick={() => searchByType('more20')}>
          Mais Pokémon
        </button>
      );
    }
  }

  const numberPokemon = (poke) => {
    if (poke.id === undefined) {
      const numero = poke.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
      return numero.replace('/', '');
    } return poke.id;
  }

  return (
    <div className="bg-wallpaper-lilas bg-fixed bg-cover pt-2 min-h-screen">
      <div className="bg-black/75 mx-1 mb-1 p-2">
        <Nav color="white" />
        <div className="">
          <p className="text-6xl text-white text-center pt-4 pb-10 font-bold w-full">Busca</p>
        </div>
        <Filter />
      </div>
      <div className="flex flex-row items-left justify-center">
        <div className="w-full grid grid-cols-4">
          {
            listPokemon.length !== 1
              ? listPokemon.length > 0 && listPokemon.map((poke, index) => (
                <Pokemon
                  key={index}
                  className="w-full"
                  name={poke.name}
                  id={numberPokemon(poke)}
                  letraMaiuscula={letraMaiuscula}
                />
              ))
              : history.push(`/pokemon/${listPokemon[0].id}`)
          }
        </div>
      </div>
      <div className="flex justify-center w-full mt-4 pb-4 font-bold text-white">
        {buttonReturn()}
      </div>
    </div>
  );
}
