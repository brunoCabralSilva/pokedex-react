import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import contexto from '../context';
import { getByName, getGeneralist } from '../fetchs';
import AllDataTypes from '../components/AllDataTypes';
import { useHistory } from 'react-router-dom';
import Charts from '../components/Charts';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Pokemon from '../components/Pokemon';

export default function Details(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [dataPokemon, setDataPokemon] = useState({});
  const [others, setOthers] = useState([]);
  const context = useContext(contexto);
  const { letraMaiuscula, setAllListDisplayed, numberPokemon } = context;
  const history = useHistory();

  const searchVarieties = async (data) => {
    const species = await getGeneralist(data.species.url);
    const varieties = species.varieties;
    const otherVarieties = varieties.filter((variant) => variant.pokemon.name !== data.name);
    let listOthers = await Promise.all(
      otherVarieties.map(async (other) => await getGeneralist(other.pokemon.url)));
    setOthers(listOthers);
  };

  useEffect(() => {
    setAllListDisplayed([]);
    window.scrollTo(0, 0);
    const fetch = async () => {
      try {
        const search = await getByName(id);
        setDataPokemon(search);
        searchVarieties(search);
      } catch(error) {
        window.alert("Não foi possível encontrar este Pokémon! Reveja o número ou nome inserido ou tente novamente mais tarde!");
      }
    }
    fetch();
  }, []);

  const returnZero = () => {
    if (dataPokemon.id)  {
      if (dataPokemon.id <= 9) {
        return '00';
      }
      else if (dataPokemon.id >= 10 && dataPokemon.id <= 99) {
        return '0';
      }
      else {
        return '';
      }
    }
  };

  const retornaImagem = () => { 
    if (dataPokemon.id)  {
      return (
        <img
          src={Object.values(dataPokemon.sprites.other)[2].front_default}
          className="w-full h-2/3 lg:w-2/3 object-cover"
          alt={dataPokemon.name}
        />
      );
    }
  };

  const returnColor = (data) => {
    if (data) {
      if (data.length === 1) {
        return [AllDataTypes(data[0].type.name).color, 'white'];
      } else {
        return [AllDataTypes(data[0].type.name).color, AllDataTypes(data[1].type.name).color];
      }
    }
  };

  const returnAbilities = (abilities) => {
    return abilities.map((ability) => letraMaiuscula(ability.ability.name)) ;
  };

  return (
    <motion.div
        className="mt-7vh w-full col-span-4 min-h-screen text-black"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Nav push={'/search'} />
        <div className="bg-gradient-to-l sm:bg-gradient-to-r via-white from-anil to-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:flex-row w-full pt-2 ">
            <div className="flex flex-col items-center justify-center pt-5 lg:pt-0 pl-7">
              { retornaImagem() }
              <div className="w-full lg:items-end justify-start lg:mb-5">
                <p className="w-full text-2xl">
                  { `Nº ${returnZero()}${dataPokemon.id}` }
                </p>
                <p className="w-full text-3xl sm:text-2xl md:text-4xl pt-2 pb-5">
                  { dataPokemon.name && letraMaiuscula(dataPokemon.name) }
                </p>
                <div className="flex justify-start w-full mb-5 lg:mb-0">
                  { 
                    dataPokemon.types && dataPokemon.types.map((type, index) => (
                      <img
                        key={ index }
                        src={require(`../imagens/types/${type.type.name}2.jpeg`)}
                        alt={ type.type.name }
                        className="rounded w-1/3 sm:w-1/4 mr-1 object-cover"
                      />
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="pr-5 lg:pl-5 flex items-end">
              <div className="w-full">
              <Charts data={dataPokemon.stats} color={returnColor(dataPokemon.types)} />
              </div>
            </div>
            <div className="sm:col-span-2 pl-7">
              <p className="pt-5 text-3xl sm:text-2xl md:text-4xl font-white pb-3 text-left mb-3">Dados</p>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 justify-start text-xl">
                <div className="w-full flex flex-col justify-start text-xl">
                  <div className="py-1 sm-py-0">
                    Altura
                    <span className="px-1">{ ' - ' }</span>
                    { dataPokemon.height/10 }
                    { ' m' }
                  </div>
                  <div className="py-1 sm-py-0">
                    Peso
                    <span className="px-1">{ ' - ' }</span>
                    { dataPokemon.weight/10 }
                    { ' kg' }
                  </div>
                </div>
                <div className="lg:pl-8 sm:pl-3 pb-8 sm:pb-0 w-full flex flex-col justify-start text-xl">
                  <div className="py-1 sm-py-0">
                    Experiência base
                    <span className="px-1 ">{ ' - ' }</span>
                    { dataPokemon.base_experience }
                  </div>
                <p className="text-left py-2 sm-pb-0">{`Habilidades - ${dataPokemon.abilities && returnAbilities(dataPokemon.abilities)}`}</p>
                </div>
              </div>
            </div>
            { others.length > 0 &&
              <div className="sm:col-span-2 pl-7">
                <p className="pt-5 text-3xl sm:text-2xl md:text-4xl font-white pb-3 text-left mb-3">Outras Formas</p>
              <div className="flex flex-col items-center">
                <div className="w-full p-1 gap-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
                  {
                    others.length > 0 && others.map((poke, index) => (
                      <Pokemon
                        key={index}
                        className="w-full"
                        name={poke.name}
                        id={numberPokemon(poke)}
                        dataPokemon={poke}
                      />
                    ))
                  }
                </div>
              </div>
              </div>
            }
            {
              dataPokemon.moves && dataPokemon.moves.length > 0 &&
              <div className="w-full sm:col-span-2 pl-7 sm:pt-5 md:pt-8 sm:pb-5">
                <p className="text-3xl sm:text-2xl md:text-4xl font-white pb-3 text-left mb-3">
                  Lista de Movimentos
                </p>
                <div className="lg:px-5 pr-5 lg:pl-0 pb-5 w-full grid grid-cols-2 sm2:grid-cols-4 lg:grid-cols-6">
                  { 
                    dataPokemon.moves.sort((a, b) => {
                      if (a.move.name < b.move.name) return -1;
                      else return 1 }).map((move, index) => (
                        <button
                          onClick={ () => history.push(`/moves/${move.move.name}`) }
                          type="button"
                          key={ index }
                          className={`px-2 py-3 font-bold border-2 rounded-full bg-white text-marinho transition-colors duration-500 hover:bg-marinho hover:text-white border-marinho text-center mr-1 my-1`}>
                          { letraMaiuscula(move.move.name) }
                        </button>
                    ))
                  }
                </div>
              </div>
            }
          </div>
        </div>
        <Footer />
      </motion.div>
  );
}
