import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import contexto from '../context';
import { getByName } from '../fetchs';
import AllDataTypes from '../components/AllDataTypes';
import { useHistory } from 'react-router-dom';
import Charts from '../components/Charts';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

export default function Details(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [dataPokemon, setDataPokemon] = useState({});
  const context = useContext(contexto);
  const { letraMaiuscula, setListType } = context;
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      try {
        const search = await getByName(id);
        setDataPokemon(search);
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
          className="w-4/5 sm:w-2/3"
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

  return (
    <motion.div
        className="w-full col-span-4 min-h-screen text-black"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Nav />
        <div className="">
          <div
            className="text-black text-4xl p-2 fixed top-0 left-0 w-full flex justify-left bg-gradient-to-r via-anil from-anil to-white"
            onClick={ () => { 
              setListType([]);
              history.push('/search');
            } }
          >
            <img
              src={ require('../imagens/arrow-left.png') }
              alt="seta"
              className="w-10"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 my-1 sm:flex-row w-full gap-1 p-1 mt-2">
            <div className="flex flex-col items-center justify-center bg-gradient-to-l sm:bg-gradient-to-r via-anil from-anil to-white pl-5">
              { retornaImagem() }
              <div className="flex flex-col lg:flex-row w-full justify-start lg:justify-end lg:items-center">
                <div className="w-1/2">
                  <p className="w-full text-2xl">
                    { `Nº ${returnZero()}${dataPokemon.id}` }
                  </p>
                  <p className="w-full text-2xl sm:text-2xl md:text-4xl pt-2 pb-5">
                    { dataPokemon.name && letraMaiuscula(dataPokemon.name) }
                  </p>
                  <div className="flex justify-start w-full mb-5">
                    { 
                      dataPokemon.types && dataPokemon.types.map((type, index) => (
                        <img
                          key={ index }
                          src={require(`../imagens/types/${type.type.name}2.jpeg`)}
                          alt={ type.type.name }
                          className="rounded w-2/3 sm:w-1/2 mr-1 object-cover"
                        />
                      ))
                    }
                  </div>
                </div>
                <div className="w-full flex flex-col justify-start lg:justify-center lg:items-end text-xl mb-5 sm:mb-0">
                  <div className="">
                    Altura
                    <span className="px-2">{ ' - ' }</span>
                    { dataPokemon.height/10 }
                    { ' m' }
                  </div>
                  <div className="">
                    Peso
                    <span className="px-2">{ ' - ' }</span>
                    { dataPokemon.weight/10 }
                    { ' kg' }
                  </div>
                  <div className="">
                    Experiência base
                    <span className="px-2 ">{ ' - ' }</span>
                    { dataPokemon.base_experience }
                  </div>
                  <div className="w-full flex justify-start lg:justify-end lg:items-center">
                    <span>Habilidades</span>
                    <span className="px-2">-</span>
                    <span className="flex flex-wrap">
                      { 
                        dataPokemon.abilities && dataPokemon.abilities.map((ability, index) => (
                          index < dataPokemon.abilities.length -1
                          ? <span key={ index }>
                              { letraMaiuscula(ability.ability.name) }
                              <span className="pr-1">,</span>
                            </span>
                          : <span key={ index }>
                              { letraMaiuscula(ability.ability.name) }
                            </span>
                        )) 
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pr-5 bg-gradient-to-l from-anil to-white pt-5">
              <Charts data={dataPokemon.stats} color={returnColor(dataPokemon.types)} />
            </div>
            <div className="w-full sm:col-span-2 bg-gradient-to-l sm:bg-gradient-to-r via-white from-anil to-white py-5">
              <p className="text-3xl font-white pt-5 pb-3 pl-4 text-left m-1">
                Lista de Movimentos
              </p>
              <div className="px-5 pb-5 w-full grid grid-cols-2 sm2:grid-cols-4 lg:grid-cols-6">
                { 
                  dataPokemon.moves && dataPokemon.moves.sort((a, b) => {
                    if (a.move.name < b.move.name) return -1;
                    else return 1 }).map((move, index) => (
                      <span key={ index } className={`px-2 py-2 rounded bg-marinho text-white mr-1 my-1`}>
                        { letraMaiuscula(move.move.name) }
                      </span>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </motion.div>
  );
}
