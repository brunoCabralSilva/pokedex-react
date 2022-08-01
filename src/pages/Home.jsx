import React, { useEffect, useContext } from 'react';
import contexto from '../context';
import Pokemon from '../components/Pokemon';
import Logo from '../components/Logo';
import Filter from '../components/Filter';
import Slider from '../components/Slider';
import Nav from '../components/Nav';
import data from '../fetchs';

const { getAllPokemon } = data;

function Home() {
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
      <div className="flex flex-col w-full">
        <Nav className="fixed"/>       
            {/* <Logo classImage="w-4/5 sm:w-3/5 md:w-2/5" /> */}
      <div className="flex flex-row items-center justify-center sm:items-start sm:justify-between w-full">
        <section className="w-full flex flex-col justify-center items-center">
          <Filter />
          <div className="grid grid-cols-4 w-full">
            <div className="h-85vh row-span-2 col-span-4 p-1">
              <Slider list={['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg']} />
            </div>
            <div className="row-span-1 h-60vh p-1">
              <Slider list={['venusaur.jpg','charizard.jpg','clefable.jpg','muk.jpg','hydreigon.jpg']} />
            </div>
            <div className="row-span-2 h-120vh p-1">
              <Slider list={['mew.png','exeggutor.png','greninja.jpg','Lycanroc.jpeg','tyrantrum.jpg']} />
            </div>
            <div className="col-span-2 h-60vh p-1">
              <Slider list={['salamence.jpg','suicune.jpg','entei.jpg','lugia.jpg','aurorus.jpeg']} />
            </div>
            <div className="row-span-1 h-60vh p-1">
              <Slider list={['garchomp.jpg','haxorus.jpg','steelix.jpg','rhydon.jpg', 'ninetales.jpg']} />
            </div>
            <div className="row-span-1 h-60vh p-1">
              <Slider list={['dragonite.jpg','nidoking.png','umbreon.jpg','Noctowl.jpeg','mewtwo.jpg']} />
            </div>
            <div className="row-span-2 h-60vh p-1">
              <Slider list={['alakazam.jpg','espeon.png','Carracosta.jpeg','lycanrock2.jpg','snorlax.jpg']} />
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-evenly sm:m-2">
            <div className={`w-full flex flex-row flex-wrap items-center justify-between `}>
            { returnPokemonList() }
            </div>
          </div>
          { buttonReturn() }
        </section>
      </div>
      </div>
    );
  }

export default Home;