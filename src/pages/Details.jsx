import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import contexto from '../context';
import dataPokemon from '../fetchs';
import imagemType from '../components/Types';
import Nav from '../components/Nav';
import { useHistory } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const { getByName } = dataPokemon;

export default function Details(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [dataPokemon, setDataPokemon] = useState({});
  const context = useContext(contexto);
  const { letraMaiuscula, setListType } = context;
  const history = useHistory();

  useEffect(() => {
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

  const retornaImagem = () => { 
    if (dataPokemon.id)  {
    if (dataPokemon.id <= 9) {
      return (<img src={require(`../imagens/all/00${dataPokemon.id}.png`)} className="w-2/3 sm:w-1/2" alt={dataPokemon.name} />);
    }
    else if (dataPokemon.id >= 10 && dataPokemon.id <= 99) {
      return (<img src={require(`../imagens/all/0${dataPokemon.id}.png`)} className="w-2/3 sm:w-1/2" alt={dataPokemon.name} />);
    }
    else {
      return (<img src={require(`../imagens/all/${dataPokemon.id}.png`)} className="w-2/3 sm:w-1/2" alt={dataPokemon.name} />);
    }
  }
  }

  const returnStats = (statName) => {
    switch(statName) {
      case 'hp':
        return 'Hp';
      case 'attack':
        return 'Ataque';
      case 'defense':
        return 'Defesa';
      case 'special-attack':
        return 'Ataque Especial';
      case 'special-defense':
        return 'Defesa Especial';
      case 'speed':
        return 'Velocidade';
      default:
    return null;
    }
  }

  const returnallDivs = (number) => {
    const statNumber = Number(number);
    let divs = [];
    for (let i = 0; i < statNumber; i += 3) {
      divs.push(<div className="w-1% h-10 bg-white" />);
    }
    return divs;
  }

  return (
    <motion.div
        className="w-full col-span-4 bg-wallpaper-lilas bg-fixed bg-cover min-h-screen text-black"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Nav className="z-50" color="white" />
        <div
          className="absolute text-white text-4xl p-2"
          onClick={ () => { 
            setListType([]);
            history.push('/search');
          } }
        >
          <IoIosArrowBack />
        </div>
        <div className="bg-half-transp">
          <div className="w-full pt-10 sm:pt-0 h-full flex flex-col items-center justify-center sm:justify-center ">
            <img src={require('../imagens/Pokémon_logo.png')} className='w-10/12 sm:w-2/3 md:w-2/5 transition-all pt-5' alt="" />
          </div>
          <p className="text-3xl font-white pt-10 pb-3 text-center font-bold text-white m-1">
            { dataPokemon.id }
            <span className="px-2">{ ' - ' }</span>
            { dataPokemon.name && letraMaiuscula(dataPokemon.name) }
          </p>
          <div className="flex flex-col sm:flex-row w-full gap-3 px-5 pb-5">
            <div className="w-full flex flex-col items-center justify-center bg-gradient-to-l via-white/5 from-white to-transparent m-1">
              { retornaImagem() }
              <div className="flex pb-10">
                { 
                  dataPokemon.types && dataPokemon.types.map((type, index) => (
                    <p key={ index } className="px-2">
                      { imagemType(type.type.name).image }
                    </p>
                  ))
                }
              </div>
            </div>
            <div className="w-full grid grid-rows-6">
              { 
              dataPokemon.stats && dataPokemon.stats.map((stat, index) => (
                <div key={ index } className="relative w-full font-bold flex items-center justify-start my-1">
                  <span className="pl-3 absolute text-lg">{ returnStats(stat.stat.name) }</span>
                  <div className="w-40 sm:w-28 md:w-20 lg:w-20 h-10 bg-white" />
                  { returnallDivs(stat.base_stat) }
                  <span className="pl-3 text-white">{ stat.base_stat }</span>
                </div>
              ))
            }
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 px-2 gap-2 text-lg text-center font-bold">
            <div className="bg-white py-4">
              Experiência base
              <span className="px-2 ">{ ' - ' }</span>
              { dataPokemon.base_experience }
            </div>
            <div className="bg-white py-4">
              Peso
              <span className="px-2">{ ' - ' }</span>
              { dataPokemon.weight }
            </div>
            <div className="bg-white py-4">
              Altura
              <span className="px-2">{ ' - ' }</span>
              { dataPokemon.height }
            </div>
            <div className="bg-white sm:col-span-2 py-4">
              <span>Habilidades</span>
              <span className="px-2">-</span>
              { 
                dataPokemon.abilities && dataPokemon.abilities.map((ability, index) => (
                  index < dataPokemon.abilities.length -1
                  ? <span key={ index }>
                      { letraMaiuscula(ability.ability.name) }
                      <span className="pr-1">,</span>
                    </span>
                  : <span key={ index }>
                      { letraMaiuscula(ability.ability.name) }
                      <span>.</span>
                    </span>
                )) 
              }
            </div>
          </div>
          <p className="text-3xl font-white pt-10 pb-3 text-center font-bold text-white m-1">Lista de Movimentos</p>
          <div className="grid grid-cols-2 sm:grid-cols-5">
            { 
              dataPokemon.moves && dataPokemon.moves.sort((a, b) => {
                if (a.move.name < b.move.name) return -1;
                else return 1 }).map((move, index) => (
                <div key={ index } className="p-5 m-2 flex items-center justify-center bg-black/50 text-white font-bold">
                  { letraMaiuscula(move.move.name) }
                </div>
              ))
            }
          </div>
        </div>
      </motion.div>
  );
}
