import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
import Pokemon from '../components/Pokemon';
import TypeList from '../components/TypeList';
import Logo from '../components/Logo';
import Filter from '../components/Filter';
import data from '../fetchs';
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const { getByName, getAllPokemon } = data;

function Home() {
  const [listPokemon, setListPokemon] = useState([]);
  const [pokemon, setPokemon] = useState('');
  const [first, setFirst] = useState(0);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
 
  useEffect(() => {
    const firstCall = async () => {
      const call = await getAllPokemon(0);
      setListPokemon(call.results);
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

  const handleClick = async (state) => {
    if(typeof(state) === 'string') {
      state = state.toLowerCase();
    }
    const fetchApi = await getByName(state);
    setListPokemon([{ name: fetchApi.name, id: fetchApi.id }]);
    setName('');
    setNumber('');
  }

  const moreTwenty = async () => {
    const newFirst = first + 20;
    const call = await getAllPokemon(newFirst);
    setFirst(newFirst);
    setListPokemon([...listPokemon, ...call.results]);
  }

  console.log(listPokemon);
    return (
      <div className="flex flex-col w-full bg-gradient-mewtwo bg-cover">
        <header className="flex justify-center w-full h-80 bg-mewtwo">
          <Logo classImage="w-2/5" />
        </header>
      <div className="flex flex-row items-center justify-center sm:items-start sm:justify-between w-full">
        <section className="w-full sm:w-4/5 flex flex-col justify-center items-center m-2">
          <Filter handle={handleClick} />
          <div className="w-full flex flex-row items-center justify-evenly sm:m-2">
            <div className={`w-full flex flex-row flex-wrap items-center justify-between `}>
              {
                listPokemon.length > 0 && listPokemon.map((poke, index) => (
                  <Pokemon
                    className="snap-start w-30vw"
                    name={ poke.name }
                    number={index + 1 }
                    id={poke.id}
                    delayNumber={true}
                    letraMaicuscula={ letraMaicuscula }
                  />
                ))
              }
            </div>
          </div>
          <button type="button" className="p-3 bg-gray-300" onClick={ moreTwenty }>
            Mais Pokémon
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