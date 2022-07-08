import { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
import data from '../fetchs';
import Pokemon from '../components/Pokemon';
import TypeList from '../components/TypeList';
import Logo from '../components/Logo';
import List from '../components/List';
import Filter from '../components/Filter';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const { get6, getByName } = data;

function Home() {
  const [ listPokemon, setListPokemon ] = useState([]);
  const [ primeiro, setPrimeiro ] = useState(1);
  const [ ultimo, setUltimo ] = useState(6);
  const [ pokemon, setPokemon ] = useState('');
  const scroller = useRef(null);

  const didMount =  async () => {
    const poke6 = await get6(primeiro , ultimo);
    setListPokemon(poke6);
  };

  const handleClickRight = (argument) => {
    if (argument === 'one') {
      scroller.current.scrollLeft -= 200;  
    } else if (argument === 'two') {
      scroller.current.scrollLeft -= 300;
    } else {
      scroller.current.scrollLeft -= 800;
    }
  }

  const handleClickLeft = async (argument) => {
    if (argument === 'one') {
      scroller.current.scrollLeft += 200;  
    } else if (argument === 'two') {
      scroller.current.scrollLeft += 300;
    } else {
      scroller.current.scrollLeft += 800;
    }
    const poke6 = await get6(primeiro + 6 , ultimo + 6);
    const array = listPokemon;
    array.push(...poke6);
    setListPokemon(array);
    setPrimeiro(primeiro + 6);
    setUltimo(ultimo + 6);
  }

  const letraMaicuscula = (nome) => {
    let novoNome = nome[0].toUpperCase();
    for (let i = 1; i < nome.length; i += 1) {
      novoNome += nome[i];
    }
    return novoNome;
  }

  const handleClick = async (state) => {
    console.log(state);
    const fetchApi = await getByName(state);
    setPokemon( fetchApi );
  }

    didMount();
    return (
      <div className="flex flex-col w-full">
        <header className="flex justify-center w-full bg-gray-300">
          <Logo classImage="w-2/5" />
        </header>
      <div className="flex flex-row items-center justify-center sm:items-start sm:justify-between w-full">
        <section className="w-full sm:w-4/5 flex flex-col justify-center items-center m-2">
          <Filter />
          <div className="w-full justify-center flex flex-row items-center sm:m-2">
            <button onClick={() => handleClickRight('one')}><IoIosArrowBack className="flex sm2:hidden text-5xl" /></button>
            <button onClick={() => handleClickRight('two')}><IoIosArrowBack className="hidden sm2:flex md2:hidden text-5xl" /></button>
            <button onClick={() => handleClickRight('three')}><IoIosArrowBack className="hidden md2:flex text-5xl" /></button>
            <div className="snap-x overflow-hidden snap-mandatory w-full flex flex-row scroll-smooth" ref={scroller}>
              {
                listPokemon.length > 0 && listPokemon.map((poke) => (
                  <Pokemon
                    className="snap-start w-30vw"
                    poke={ poke }
                    letraMaicuscula={ letraMaicuscula }
                  />
                ))
              }
            </div>
            <button onClick={() => handleClickLeft('one')}><IoIosArrowForward className="flex sm2:hidden text-5xl" /></button>
            <button onClick={() => handleClickLeft('two')}><IoIosArrowForward className="hidden sm2:flex md2:hidden text-5xl" /></button>
            <button onClick={() => handleClickLeft('three')}><IoIosArrowForward className="hidden md2:flex text-5xl" /></button>
          </div>
        </section>
        <aside className="hidden sm:flex sm:flex-col w-1/5 bg-gray-200 sm:mr-2 sm:my-2">
          <TypeList letraMaicuscula={ letraMaicuscula } />
        </aside>
      </div>
      <section className="w-4/5 flex flex-col justify-center items-center m-2">
          <Filter handle={ handleClick } />
          <div className="w-full justify-center flex flex-col items-center sm:m-2 bg-gray-400">
          <List lista={listPokemon} />
          </div>
        </section>
      </div>
    );
}

export default Home;