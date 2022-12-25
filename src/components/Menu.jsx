import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Link } from  'react-router-dom';
import { useSelector } from 'react-redux';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

export default function Menu() {
  const globalState = useSelector((state) => state);
  const { showMenu } = globalState;

  const arrayMenu = [
    {
      grid: 'row-span-1 h-24vh md:h-45vh',
      list: ['venusaur.jpg','charizard.jpg','clefable.jpg','muk.jpg','hydreigon.jpg'],
      direction: 'vertical',
      delay: 6000,
      name: 'Seu Time',
      link: '/team',
    },
    {
      grid: 'row-span-2 h-48vh md:h-full',
      list: ['mew.png','exeggutor.png','greninja.jpg','Lycanroc.jpeg','tyrantrum.jpg'],
      direction: 'horizontal',
      delay: 4000,
      name: 'Sobre Mim',
      link: 'https://github.com/brunoCabralSilva',
    },
    {
      grid: 'col-span-1 md:col-span-2 h-24vh md:h-45vh',
      list: ['salamence.jpg','suicune.jpg','lugia.jpg','aurorus.jpeg'],
      direction: 'vertical',
      delay: 5000,
      name: 'Busca',
      link: '/search',
    },
    {
      grid: 'row-span-1 col-span-2 md:col-span-1 h-24vh md:h-45vh',
      list: ['dragonite.jpg','nidoking.png','umbreon.jpg','Noctowl.jpeg','mewtwo.jpg'],
      direction: 'horizontal',
      delay: 6000,
      name: 'Site Oficial',
      link: 'https://www.pokemon.com/br/',
    },
    {
      grid: 'row-span-1 h-24vh md:h-45vh',
      list: ['garchomp.jpg','haxorus.jpg','steelix.jpg','rhydon.jpg', 'ninetales.jpg'],
      direction: 'vertical',
      delay: 4000,
      name: 'Favoritos',
      link: '/favorites',
    },
    {
      grid: 'row-span-2 h-24vh md:h-45vh',
      list: ['alakazam.jpg','espeon.png','Carracosta.jpeg','lycanrock2.jpg','snorlax.jpg'],
      direction: 'horizontal',
      delay: 5000,
      name: 'Home',
      link: '/pokedex-react',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 w-11/12 mx-auto items-center z-50">
      {
        arrayMenu.map((item) => {
          if (item.name === "Site Oficial" || item.name === "Sobre Mim") {
            return (
              <a href={item.link} target="_blank" rel="noreferrer" className={`${item.grid} relative ${ showMenu ? 'flex' : 'hidden' }`}>
              <div className="w-full h-full absolute z-20 flex items-end">
                <p className="text-white w-full text-xl font-bold ml-2 mb-2 mr-2 p-1 pl-2 md:p-3 z-10 bg-gradient-to-t from-half-transp to-transp">
                  {item.name}
                </p>
              </div>
              <Swiper 
                modules={[Autoplay]} 
                loop={true}
                autoplay={{delay: item.delay }}
                className="z-30 w-full h-full"
                direction={ item.direction }
              > 
              {
                item.list.map((item) => (
                  <SwiperSlide className="relative z-50">
                    <div>
                    <img src={require(`../imagens/wallpaper/${item}`)} className="absolute object-cover bg-center w-full h-full p-2" alt="" />
                    </div>
                  </SwiperSlide>  
                ))
              }
              </Swiper>
            </a>
          )}
          return (
            <Link
              to={item.link}
              className={`${item.grid} relative ${ showMenu ? 'flex' : 'hidden' }`}
              >
              <div className="w-full h-full absolute z-20 flex items-end">
                <p className="text-white w-full text-xl font-bold ml-2 mb-2 mr-2 p-1 pl-2 md:p-3 z-10 bg-gradient-to-t from-half-transp to-transp">
                  {item.name}
                </p>
              </div>
              <Swiper 
                modules={[Autoplay]} 
                loop={true}
                autoplay={{delay: item.delay }}
                className="z-30 w-full h-full"
                direction={ item.direction }
              > 
              {
                item.list.map((item) => (
                  <SwiperSlide className="relative z-50">
                    <div>
                    <img src={require(`../imagens/wallpaper/${item}`)} className="absolute object-cover bg-center w-full h-full p-2" alt="" />
                    </div>
                  </SwiperSlide>  
                ))
              }
              </Swiper>
            </Link>
        )})
      }
    </div>
  );
}