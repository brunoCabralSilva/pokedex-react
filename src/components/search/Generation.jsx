import React, { useState, useContext } from 'react';
import contexto from '../../context';
import data from '../../fetchs';
import Pokemon from '../Pokemon';

const { getByGeneration } = data;

export default function Generation() {
  const context = useContext(contexto);
  const {
    gen,
    setGen,
    lastSelectedGen,
    setLastSelectedGen,
    listGeneration,
    setListGeneration,
    numberPokemon,
  } = context;

  const searchByGen = async () => {
      const call = await getByGeneration(gen);
      setListGeneration(call);
      const selectGeneration = document.getElementById('select-generation');
      selectGeneration.selectedIndex = '1';
      setLastSelectedGen(gen);
      setGen('1');
  };

  const showDataGeneration = () => {
    if (lastSelectedGen !== '') {
      return (
        <div className="w-full pb-2">
          <p className="bg-black/70 text-white w-full h-full flex flex-col sm:flex-row items-center justify-center text-xl sm:text-2xl md:text-4xl py-5 p-2 sm:p-0 sm:py-10 font-bold text-center">
            { `Total de Pokémon da ${lastSelectedGen}ª Geração: ${listGeneration.length}` }
          </p>
        </div>
      );
    }
  }

  return(
      <div className="w-full mx-auto px-1">
        <div className="bg-black/75 w-full flex flex-col justify-start items-center mb-2">
          <div className="md:py-9 w-full flex flex-col items-start justify-center mb-2">
            <div className="w-full flex flex-col sm:flex-row items-center justify-center">
              <select
                id="select-generation"
                className="w-11/12 sm:w-7/12 p-2 my-2 sm:mr-2 ml-0 sm:ml-2 text-center"
                onChange={(e) => setGen(e.target.value)}
              >
                <option disabled selected>Geração</option>
                <option value="1">1º Geração</option>
                <option value="2">2º Geração</option>
                <option value="3">3º Geração</option>
                <option value="4">4º Geração</option>
                <option value="5">5º Geração</option>
                <option value="6">6º Geração</option>
                <option value="7">7º Geração</option>
                <option value="8">8º Geração</option>
              </select>
              <button
                type="button"
                className="w-11/12 sm:w-2/12 bg-gray-500 p-2 sm:my-2"
                onClick={ () => searchByGen() }
              >
                <i className="fa-solid fa-magnifying-glass text-white"></i>
              </button>
            </div>
            { listGeneration.length === 0 && <div className="h-19vh sm:h-49vh w-full" /> }
          </div>
        </div>
        <div>
          { showDataGeneration() }
          <div className="w-full gap-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {
              listGeneration.length > 0 && listGeneration.map((poke, index) => (
                <Pokemon
                  key={index}
                  className="w-full"
                  name={poke.name}
                  id={numberPokemon(poke)}
                />
              ))
            }
          </div>
        </div>
          <div className="w-full">
            { 
              listGeneration.length > 0 &&
              <button
                type="button"
                className="py-1 w-full mb-1"
                onClick={ () => window.scrollTo(0, 0) }
              >
                <div className="bg-black/70 text-white text-xl p-4 font-bold hover:border-2 hover:border-white w-full h-full">
                  Voltar ao Topo
                </div>
              </button>
            }
          </div>
      </div>
    );
  }