import React, { useEffect, useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import contexto from '../context';
import { getByName } from '../fetchs';
import AllDataTypes from '../components/AllDataTypes';
import { useHistory } from 'react-router-dom';
import Charts from '../components/Charts';

export default function Details(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [dataPokemon, setDataPokemon] = useState({});
  const context = useContext(contexto);
  const { letraMaiuscula, setListType } = context;
  const history = useHistory();

  useEffect(() => {
    const classSwiper = document.getElementsByClassName('swiper-button-prev');
      classSwiper[0].classList.add('hidden-element');
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
          className="w-2/3 sm:w-1/2"
          alt={dataPokemon.name}
        />
      );
    }
  };

  const returnColor = (data) => {
    if (data) {
      if (data.length === 1) {
        return [AllDataTypes(data[0].type.name).color, 'black'];
      } else {
        return [AllDataTypes(data[0].type.name).color, AllDataTypes(data[1].type.name).color];
      }
    }
  };

  return (
    <motion.div
        className="w-full col-span-4 bg-wallpaper-lilas bg-fixed bg-cover min-h-screen text-black"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="p-1">
          <div className="bg-black/70 pt-20 text-white w-full h-full flex flex-col sm:flex-row items-center justify-center text-xl sm:text-2xl md:text-4xl py-5 sm:p-0 sm:py-10 font-bold text-center relative">
          <div
            className="text-black text-4xl p-2 absolute w-full flex justify-left"
            onClick={ () => { 
              setListType([]);
              history.push('/search');
            } }
          >
            <img
              src={ require('../imagens/arrow-left.png') }
              alt="seta"
              className="w-1/12"
            />
          </div>
            <p className="pt-20 text-white w-full h-full flex flex-col sm:flex-row items-center justify-center text-xl sm:text-2xl md:text-4xl py-5 sm:p-0 sm:py-10 font-bold text-center">
              { `${returnZero()}${dataPokemon.id}` }
              <span className="px-2">{ ' - ' }</span>
              { dataPokemon.name && letraMaiuscula(dataPokemon.name) }
            </p>
          </div>
          <div className="flex flex-col my-1 sm:flex-row w-full gap-1">
            <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-l via-black/80 from-black/80 to-black/20">
              { retornaImagem() }
              <div className="flex pb-10">
                { 
                  dataPokemon.types && dataPokemon.types.map((type, index) => (
                    <p key={ index } className="px-2">
                      { AllDataTypes(type.type.name).image }
                    </p>
                  ))
                }
              </div>
            </div>
            <Swiper className="w-1/2"
              loop={true}
              modules={[Navigation]}
              navigation={true}
              slidesPerView={1}
            >
              <SwiperSlide className="w-full bg-gradient-to-r via-black/80 from-black/80 to-black/20 pr-5">
                <p className="text-3xl font-white pt-5 text-center font-bold text-white m-1">
                  Estatísticas
                </p>
                <Charts data={dataPokemon.stats} color={returnColor(dataPokemon.types)} />
              </SwiperSlide>
              <SwiperSlide className="w-full bg-gradient-to-r via-black/80 from-black/80 to-black/20 flex flex-col items-center justify-center text-white font-bold">
                <div className="py-4">
                  Experiência base
                  <span className="px-2 ">{ ' - ' }</span>
                  { dataPokemon.base_experience }
                </div>
                <div className="py-4">
                  Peso
                  <span className="px-2">{ ' - ' }</span>
                  { dataPokemon.weight/10 }
                  { ' kg' }
                </div>
                <div className="py-4">
                  Altura
                  <span className="px-2">{ ' - ' }</span>
                  { dataPokemon.height/10 }
                  { ' m' }
                </div>
                <div className="sm:col-span-2 py-4">
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
              </SwiperSlide>
              <SwiperSlide className="w-full bg-gradient-to-r via-black/80 from-black/80 to-black/20 px-5">
              <p className="text-3xl font-white pt-5 pb-3 text-center font-bold text-white m-1">
                Lista de Movimentos
              </p>
              <div className="px-5 text-white">
                { 
                  dataPokemon.moves && dataPokemon.moves.sort((a, b) => {
                    if (a.move.name < b.move.name) return -1;
                    else return 1 }).map((move, index) => (
                    <span key={ index } className="">
                      { letraMaiuscula(move.move.name) }
                      {' , '}
                    </span>
                  ))
                }
              </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </motion.div>
  );
}
