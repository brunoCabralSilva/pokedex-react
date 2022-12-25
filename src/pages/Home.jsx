import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Link } from  'react-router-dom';
import contexto from '../context';
import { getNumberOfPokemon } from '../fetchs';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css';

// <div className="flex flex-col w-full">
//   <Nav color="black" className="fixed"/>       
//   <section className="w-full flex flex-col justify-center items-center">
//     <Header />
//   </section>
//   <Footer />
// </div>
export default function Home() {
  const context = useContext(contexto);
  const { setCountPokemon } = context;

  useEffect(() => {
    const numberOf = async () => {
      const number = await getNumberOfPokemon();
      setCountPokemon(number.count);
    }
    numberOf();
  }, []);

  const arrayMenu = [
    {
      list: ['venusaur.jpg','charizard.jpg','clefable.jpg','muk.jpg','hydreigon.jpg'],
      direction: 'vertical',
      delay: 6000,
      name: 'Seu Time',
      link: '/team',
    },
    // {
    //   grid: 'row-span-2 h-48vh md:h-full',
    //   list: ['mew.png','exeggutor.png','greninja.jpg','Lycanroc.jpeg','tyrantrum.jpg'],
    //   direction: 'horizontal',
    //   delay: 4000,
    //   name: 'Sobre Mim',
    //   link: 'https://github.com/brunoCabralSilva',
    // },
    {
      list: ['salamence.jpg','suicune.jpg','lugia.jpg','aurorus.jpeg'],
      delay: 5000,
      name: 'Busca',
      link: '/search',
    },
    // {
    //   grid: 'row-span-1 col-span-2 md:col-span-1 h-24vh md:h-45vh',
    //   list: ['dragonite.jpg','nidoking.png','umbreon.jpg','Noctowl.jpeg','mewtwo.jpg'],
    //   direction: 'horizontal',
    //   delay: 6000,
    //   name: 'Site Oficial',
    //   link: 'https://www.pokemon.com/br/',
    // },
    {
      list: ['garchomp.jpg','haxorus.jpg','steelix.jpg','rhydon.jpg', 'ninetales.jpg'],
      delay: 4000,
      name: 'Favoritos',
      link: '/favorites',
    },
    {
      list: ['alakazam.jpg','espeon.png','Carracosta.jpeg','lycanrock2.jpg','snorlax.jpg'],
      delay: 5000,
      name: 'Home',
      link: '/pokedex-react',
    },
  ];

  return (
    <div className="bg-white z-50 w-full bg-fixed bg-cover">
      <div className="w-full h-10 bg-white" />
      <div className="h-screen w-full mx-auto items-center">
        <Header />
      </div>
      <div className="w-full bg-lightGray">
        <div className="w-11/12 py-20 gap-1 grid grid-cols-2 md:grid-cols-4 mx-auto items-center">
          {
            arrayMenu.map((item) => {
              return (
                <Link
                  to={item.link}
                  className="h-24vh md:h-60vh relative flex"
                  >
                  <div className="w-full h-full absolute z-20 flex items-end hover:bg-black/50 transition-all">
                    <p className="text-white w-full text-xl font-bold z-10 px-3 py-2 bg-gradient-to-t via-black/60 from-black/80 to-black-10">
                      {item.name}
                    </p>
                  </div>
                  <Swiper 
                    modules={[Autoplay]} 
                    loop={true}
                    autoplay={{delay: item.delay }}
                    className="z-30 w-full h-full"
                    
                  > 
                  {
                    item.list.map((item) => (
                      <SwiperSlide className="relative z-50">
                        <div>
                        <img src={require(`../imagens/wallpaper/${item}`)} className="absolute object-cover bg-center w-full h-full" alt="" />
                        </div>
                      </SwiperSlide>  
                    ))
                  }
                  </Swiper>
                </Link>
            )})
          }
        </div>
      </div>
      <div className="w-full h-60 bg-white">
      </div>
      <div className="w-full h-60 bg-lightGray">
      </div>
      <Footer />
    </div>
  );
}