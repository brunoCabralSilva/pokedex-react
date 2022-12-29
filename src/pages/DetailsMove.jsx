import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';
import Nav from '../components/Nav';
import { useParams } from 'react-router-dom';
import { getMove } from '../fetchs';
import Pokemon from '../components/Pokemon';
import contexto from '../context';
import AllDataTypes from '../components/AllDataTypes';

export default function DetailsMove() {
  const [move, setMove] = useState({});
  const params = useParams();
  const history = useHistory();
  const context = useContext(contexto);
  const { numberPokemon, letraMaiuscula } = context;
  useEffect(() => {
    const getMoveByName = async () => {
      const get = await getMove((params.name));
      setMove(get);
    }
    getMoveByName();
  },[]);

  const returnEffect = (listEffect) => {
    let phrase = '';
    for (let i = 0; i < listEffect.length; i += 1) {
      phrase = phrase + listEffect[i].effect;
    }
    return phrase;
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Nav />
      <div
        className="z-40 text-black text-4xl p-2 fixed top-0 left-1 w-full flex justify-left bg-gradient-to-r via-white from-anil to-white border-b-[3px] border-white"
        onClick={ () => { 
          history.push('/moves');
        } }
      >
        <img
          src={ require('../imagens/arrow-left.png') }
          alt="seta"
          className="w-10"
        />
      </div>
      <div className="flex flex-col justify-center px-1">
        {
          Object.values(move).length > 0 &&
          <div className="flex flex-col items-start justify-center">
            <div className="flex flex-col w-full justify-start px-7 pt-10 gap-3 bg-gradient-to-r via-white from-anil to-white">
              { AllDataTypes(move.type.name).image }
              <p className="text-3xl sm:text-2xl md:text-4xl">{ letraMaiuscula(move.name) }</p>
              <p className="pb-2 text-1xl text-gray-700"># { move.id }</p>
            </div>
            <div className="w-full py-5 bg-gradient-to-r via-white from-anil to-white my-1 px-7">
              <p className="text-3xl sm:text-2xl md:text-4xl">Dados</p>
              <p className="pt-5">Precisão: { move.accuracy }</p>
              <p className="pt-1">Classe de dano: { letraMaiuscula(move.damage_class.name) }</p>
              <p className="pt-1">Poder: {move.power}</p>
              <p className="pt-1">PP: {move.pp}</p>
              <p className="pt-1">Prioridade: {move.priority}</p>
              <p className="pt-1">Alvo: {move.target.name}</p>
            </div>
            <div className="py-5 bg-gradient-to-r via-white from-anil to-white mb-1 px-7">
              <p className="text-3xl sm:text-2xl md:text-4xl">Efeito</p>
              <p className="pt-5">
                Espanhol: { move.flavor_text_entries.find((text) => text.language.name === 'es').flavor_text }
              </p>
              <p className="pt-3">
                Inglês: { returnEffect(move.effect_entries) }
              </p>
            </div>
            { 
            move.learned_by_pokemon.length > 0 &&
              <div className="flex flex-col items-center">
                <p className="w-full py-10 bg-gradient-to-r via-white from-anil to-white my-1 px-7 text-3xl sm:text-2xl md:text-4xl">
                  {`Aprendido por ${move.learned_by_pokemon.length} Pokémon:`}
                </p>
                <div className="bg-white p-1 gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
                  {
                    move.learned_by_pokemon.map((poke) => (
                      <Pokemon
                      name={poke.name}
                      id = {numberPokemon(poke)}
                      dataPokemon={poke}
                      />
                    ))
                  }
                </div>
              { 
                move && move.learned_by_pokemon.length > 10 &&
                <div className="w-full">
                  <button
                    type="button"
                    className="p-1 w-full mb-1"
                    onClick={ () => window.scrollTo(0, 0) }
                  >
                    <div className="bg-anil/80 text-black text-xl p-4 w-full h-full bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500">
                      Voltar ao Topo
                    </div>
                  </button>
                </div>
              }
            </div>
          }
          </div>
        }
      </div>
      <Footer />
    </div>
  );
}