import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getNumberOfPokemon } from '../fetchs';
import Header from '../components/Header';
import contexto from '../context';
import Footer from '../components/Footer';
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

  return (
    <div className="bg-white w-full bg-fixed bg-cover">
      <Nav />
      <div className="w-full mx-auto items-center">
        <Header />
      </div>
      <div className="w-full h-7vh bg-white" />
      <div className="w-full bg-white">
        <div className="flex flex-col sm:flex-row mx-3 sm:mx-14 mb-14 border hover:border-4 border-anil transition-all rounded">
          <img
            src={ require('../imagens/wallpaper/001.jpg') }
            className="w-full sm:w-2/5 rounded-l object-cover"
            alt="treinador pokémon"
          />
          <div className="px-5 sm:pl-10 w-full sm:w-1/2 flex flex-col justify-center items-center sm:items-start pb-10 sm:pb-0 text-marinho">
            <p className="py-10 sm:text-lg text-center sm:text-left">
              Explore o mundo dos Pokémon, tendo como guia um mecanismo de busca avançado, onde é possível buscar pelo nome, número, geração ou tipo.
            </p>
            <button
              className="rounded px-5 py-3 bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500"
              onClick={ () => { history.push('/search') } }
            >
              Mais
            </button>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-end mx-3 sm:mx-14 mb-14 border hover:border-4 border-anil rounded">
          <div className="px-5 sm:pr-10 w-full sm:w-5/12 flex flex-col justify-center items-center sm:items-end pb-10 sm:pb-0 text-marinho">
              <p className="py-10 sm:text-lg text-center sm:text-right">
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
            className="col-span-2 w-full sm:w-1/2 rounded-r object-cover"
            alt="snorlax"
          />
        </div>
        <div className="flex flex-col sm:flex-row mx-3 sm:mx-14 mb-14 border hover:border-4 border-anil rounded">
          <img
            src={ require('../imagens/wallpaper/003.jpg') }
            className="col-span-2 w-full sm:w-2/5 rounded-l"
            alt=""
          />
          <div className="px-5 sm:pl-10 w-full sm:w-1/2 flex flex-col justify-center items-center sm:items-start pb-10 sm:pb-0 text-marinho">
            <p className="py-10 sm:text-lg text-center sm:text-left">
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
        <div className="flex flex-col-reverse sm:flex-row justify-end mx-3 sm:mx-14 mb-14 border hover:border-4 border-anil rounded">
          <div className="px-5 sm:pr-10 w-full sm:w-5/12 flex flex-col justify-center items-center sm:items-end pb-10 sm:pb-0 text-marinho">
            <p className="py-10 sm:text-lg text-center sm:text-right">Explore o mundo dos Pokémon, tendo como guia um mecanismo de busca avançado, onde é possível buscar pelo nome, número, geração ou tipo.</p>
            <button
              className="rounded px-5 py-3 bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500"
              onClick={ () => { history.push('/search') } }
            >
              Mais
            </button>
          </div>
          <img
            src={ require('../imagens/wallpaper/004.jpg') }
            className="col-span-2 w-full sm:w-1/2 rounded-r object-contain bg-anil"
            alt=""
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}