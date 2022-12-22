import React, { useState, useContext } from 'react';
import contexto from '../../context';
import data from '../../fetchs';
import Pokemon from '../Pokemon';

const { getByGeneration } = data;

export default function Generation() {
  const [gen, setGen] = useState([]);
  const [first, setFirst] = useState(0);
  const [finish, setFinish] = useState(false);
  const context = useContext(contexto);
  const {
    listGeneration,
    setListGeneration,
    numberPokemon,
    setAllPokeOfGeneration,
    allPokemonGeneration,
  } = context;

  const searchByGen = async () => {
      let arrayGen = [];
      const call = await getByGeneration(gen);
      setAllPokeOfGeneration(call);
      for(let i = 0; i <= 19; i += 1){
        arrayGen.push(call[i]);
      }
      setListGeneration(arrayGen);
      setFirst(20);
      setFinish(false);
      const selectGeneration = document.getElementById('select-generation');
      selectGeneration.selectedIndex = '1';
      setGen('1');
  };

  const moreTwentyForGen = () => {
    if (first + 20 < allPokemonGeneration.length) {
      let arrayGen = [];
      for (let i = first; i < first + 20; i += 1) {
        arrayGen.push(allPokemonGeneration[i]);
      }
      setListGeneration([...listGeneration, ...arrayGen]);
      setFirst( first + 20);
      setFinish(false);
    } else {
      let arrayGen = [];
      for (let i = first; i < allPokemonGeneration.length; i += 1) {
        arrayGen.push(allPokemonGeneration[i]);
      }
      setFirst(allPokemonGeneration.length);
      setListGeneration([...listGeneration, ...arrayGen]);
      setFinish(true);
    }
  };

  return(
      <div className="w-full sm:w-full mx-auto px-1">
        <div className="bg-black/75 min-h-75vh w-full py-10 flex flex-col justify-center items-start">
          <div className="w-full flex items-start justify-center">
            <select
              id="select-generation"
              className="p-2 my-2 mr-2 ml-0 sm:ml-2 w-10/12 sm:w-9/12 text-center"
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
              className="w-2/12 bg-gray-500 p-2 my-2"
              onClick={ () => searchByGen() }
            >
              <i className="fa-solid fa-magnifying-glass text-white"></i>
            </button>
          </div>
          <div className="w-full grid grid-cols-4">
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
          <div className={`w-full grid grid-cols-1 ${listGeneration.length === 0 && 'hidden'}`}>
            <button
              type="button"
              className={`p-1 w-full mt-2 ${ finish && 'hidden' }`}
              onClick={ moreTwentyForGen }
            >
              <div className="bg-black/70 text-white text-xl p-4 font-bold hover:border-2 hover:border-white w-full h-full">
                Mais Pokémon
              </div>
            </button>
            <button
              type="button"
              className="p-1 w-full mb-4"
              onClick={ () => window.scrollTo(0, 0) }
            >
              <div className="bg-black/70 text-white text-xl p-4 font-bold hover:border-2 hover:border-white w-full h-full">
                Voltar ao Topo
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }