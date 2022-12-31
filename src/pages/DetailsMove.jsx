import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import { getMove, getGeneralist } from '../fetchs';
import Pokemon from '../components/Pokemon';
import contexto from '../context';
import AllDataTypes from '../components/AllDataTypes';
import Guide from '../components/Guide';

export default function DetailsMove() {
  const [move, setMove] = useState({});
  const params = useParams();
  const context = useContext(contexto);
  const {
    listOfAll, setListOfAll,
    allListDisplayed, setAllListDisplayed,
    numberPokemon,
    letraMaiuscula,
    setLoadingPokemon,
    NUMBERBYPAGE,
    setValueButton,
  } = context;
  
  const queryMorePokemon = async(list, setListDisplayed) => {
    setLoadingPokemon(true);
    let listItems = await Promise.all(
      list.map(async (item) => await getGeneralist(item.url)));
      setListDisplayed(listItems);
      setTimeout(() => {
        setLoadingPokemon(false);
      }, 500);
  };

  useEffect(() => {
    setListOfAll([]);
    setAllListDisplayed([]);
    setValueButton(1);
    const getMoveByName = async () => {
      const get = await getMove((params.name));
      setMove(get);
      setListOfAll(get.learned_by_pokemon);
      let last = [];
      if (get.length <= 20) {
        for (let i = 0; i < get.length; i += 1) {
          last.push(get.learned_by_pokemon[i]);
        }
      } else {
        for (let i = 0; i < NUMBERBYPAGE; i += 1) {
          last.push(get.learned_by_pokemon[i]);
        }
      }
      queryMorePokemon(last, setAllListDisplayed);
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
    <div className="mt-7vh w-full flex flex-col min-h-screen">
      <Nav push={'/moves'}/>      
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
            <div className="w-full py-5 bg-gradient-to-r via-white from-anil to-white mb-1 px-7">
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
                <Guide
                  list={listOfAll}
                  listDisplayed={setAllListDisplayed}
                  position="top"
                />
                <div className="bg-white p-1 gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
                  {
                    allListDisplayed.map((poke) => (
                      <Pokemon
                        type="moves"
                        name={poke.name}
                        id = {numberPokemon(poke)}
                        dataPokemon={poke}
                      />
                    ))
                  }
                </div>
                <Guide
                  list={listOfAll}
                  listDisplayed={setAllListDisplayed}
                  position="bottom"
                />
            </div>
          }
          </div>
        }
      </div>
      <Footer />
    </div>
  );
}