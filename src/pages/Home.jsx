import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import contexto from '../context';
import { getNumberOfPokemon } from '../fetchs';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css';
import Nav from '../components/Nav';

export default function Home() {
  const context = useContext(contexto);
  const { setCountPokemon } = context;
  const history = useHistory();

  useEffect(() => {
    const numberOf = async () => {
      const number = await getNumberOfPokemon();
      setCountPokemon(number.count);
    }
    numberOf();
  }, []);

  const arrayMenu = [
    // {
    //   grid: 'row-span-2 h-48vh md:h-full',
    //   list: ['mew.png','exeggutor.png','greninja.jpg','Lycanroc.jpeg','tyrantrum.jpg'],
    //   direction: 'horizontal',
    //   delay: 4000,
    //   name: 'Sobre Mim',
    //   link: 'https://github.com/brunoCabralSilva',
    // },
    // {
    //   grid: 'row-span-1 col-span-2 md:col-span-1 h-24vh md:h-45vh',
    //   list: ['dragonite.jpg','nidoking.png','umbreon.jpg','Noctowl.jpeg','mewtwo.jpg'],
    //   direction: 'horizontal',
    //   delay: 6000,
    //   name: 'Site Oficial',
    //   link: 'https://www.pokemon.com/br/',
    // },
  ];

  return (
    <div className="bg-white w-full bg-fixed bg-cover">
      <Nav color="marinho" />
      <div className="w-full mx-auto items-center">
        <Header />
      </div>
      <div className="w-full h-7vh bg-white" />
      <div className="w-full bg-white">
        <div className="flex mx-14 mb-14 border hover:border-4 border-anil transition-all rounded">
          <img
            src={ require('../imagens/wallpaper/001.jpg') }
            className="w-2/5 rounded-l object-cover"
            alt="treinador pokémon"
          />
          <div className="pl-10 w-1/2 flex flex-col justify-center items-start text-marinho">
              <p className="py-10 text-lg">Explore o mundo dos Pokémon, tendo como guia um mecanismo de busca avançado, onde é possível buscar pelo nome, número, geração ou tipo.</p>
              <button
                className="rounded px-5 py-3 bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500"
                onClick={ () => { history.push('/search') } }
              >
                Mais
              </button>
          </div>
        </div>
        <div className="flex justify-end mx-14 mb-14 border hover:border-4 border-anil rounded">
          <div className="pr-10 w-5/12 flex flex-col justify-center items-end text-marinho">
              <p className="py-10 text-lg text-right">
                Tenha uma lista de Pokémon favoritos, onde você poderá adicioná-los e removê-los da maneira que achar melhor.
              </p>
              <button
                className="rounded px-5 py-3 bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500"
                onClick={ () => { history.push('/favorites') } }
              >
                Mais
              </button>
          </div>
          <img
            src={ require('../imagens/wallpaper/002.jpg') }
            className="col-span-2 w-1/2 rounded-r object-cover"
            alt="snorlax"
          />
        </div>
        <div className="flex mx-14 mb-14 border hover:border-4 border-anil rounded">
          <img
            src={ require('../imagens/wallpaper/003.jpg') }
            className="col-span-2 w-2/5 rounded-l"
            alt=""
          />
          <div className="pl-10 w-1/2 flex flex-col justify-center items-start text-marinho">
            <p className="py-10 text-lg">
              Crie o seu time escolhendo dentre os seus Pokémon favoritos quais os que lhe acompanharão na sua jornada!
            </p>
            <button
              className="rounded px-5 py-3 bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500"
              onClick={ () => { history.push('/team') } }
            >
              Mais
            </button>
          </div>
        </div>
        <div className="flex justify-end mx-14 mb-14 border hover:border-4 border-anil rounded">
          <div className="pr-10 w-5/12 flex flex-col justify-center items-end text-marinho">
            <p className="py-10 text-lg text-right">Explore o mundo dos Pokémon, tendo como guia um mecanismo de busca avançado, onde é possível buscar pelo nome, número, geração ou tipo.</p>
            <button
              className="rounded px-5 py-3 bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500"
              onClick={ () => { history.push('/search') } }
            >
              Mais
            </button>
          </div>
          <img
            src={ require('../imagens/wallpaper/004.jpg') }
            className="col-span-2 w-1/2 rounded-r"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}