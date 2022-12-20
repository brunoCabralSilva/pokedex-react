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
    buttonOption, finish, listPokemon, moreTwenty,
    setList, setButton, letraMaiuscula,
  } = context;
  const history = useHistory();

  useEffect(() => {
    const firstCall = async () => {
      const call = await getAllPokemon(0);
      setList(call.results);
    };
    firstCall();
    setButton('all');
  }, []);

  const buttonReturn = () => {
    let message = '';
    if (buttonOption === 'hidden') {
      return null
    } else if (finish === false) {
      if (buttonOption === 'all' || buttonOption === 'generation' || buttonOption === 'type') {
        message = 'Mais Pokémon';
      } else {
        message = 'Voltar ao topo';
      }
    } else {
      message = 'Voltar ao topo';
    }

    return (
      <button type="button" className="p-3 bg-half-transp w-11/12 hover:border-2 hover:border-white" onClick={moreTwenty}>
        { message }
      </button>
    );
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
