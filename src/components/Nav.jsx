import React, { useState } from 'react';
import { Link } from  'react-router-dom';

export default function Nav({ push }) {
  const [ showMenu, setShowMenu] = useState(false);
  return (
    <nav className="fixed top-0 z-50 w-full h-7vh bg-white 2xl:text-xl leading-6 flex flex-col justify-center items-end px-2 sm:px-4">
      { push &&
        <Link
          to={push}
          className={`z-50 text-black text-4xl p-2 fixed top-0 ${push === '/moves' ? 'left-1': 'left-0'} w-full flex justify-left bg-gradient-to-r via-white from-anil to-white border-b-[3px] border-white`}
          onClick={ () => {
          } }
        >
          <img
            src={ require('../imagens/arrow-left.png') }
            alt="seta"
            className="w-10"
          />
        </Link>
      }
      <div
        onClick={ () => { setShowMenu(!showMenu) }}
        className="z-50 'fixed'"
      >
        <div className={`h-1 w-7 mb-1 transition duration-500 bg-marinho ${ showMenu ? 'rotate-45deg translate-y-2' : 'rotate-0' }`} />
        <div className={`h-1 w-7 mb-1 transition duration-500 bg-marinho ${showMenu ? 'rotate-45' : 'rotate-0'}`} />
        <div className={`h-1 w-7 transition duration-500 bg-marinho ${ showMenu ? 'opacity-0' : 'opacity-1'}`}> </div>
      </div>
      {
        showMenu && 
        <div className="sm:pt-7vh top-0 right-0 fixed w-full sm:w-2/5 md:w-3/12 bg-anil/80 h-screen z-40 border-l-2 border-marinho flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center pt-7vh text-marinho text-lg">
            <Link
              to="/pokedex-react"
              onClick={ () => setShowMenu(false) }
              className="mt-5 py-2 font-bold w-full text-center hover:bg-marinho/50 hover:text-black transition-colors flex items-center justify-center"
            >
              Home
            </Link>
            <Link
              to="/search"
              onClick={ () => setShowMenu(false) }
              className="py-2 font-bold w-full text-center hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Buscar
            </Link>
            <Link
              to="/favorites"
              onClick={ () => setShowMenu(false) }
              className="py-2 font-bold w-full text-center hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Favoritos
            </Link>
            <Link
              to="/team"
              onClick={ () => setShowMenu(false) }
              className="py-2 font-bold w-full text-center hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Meu Time
            </Link>
            <Link
              to="/moves"
              onClick={ () => setShowMenu(false) }
              className="py-2 font-bold w-full text-center hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Movimentos
            </Link>
            <a
              href="https://github.com/brunoCabralSilva"
              target="_blank"
              rel="noreferrer"
              onClick={ () => setShowMenu(false) }
              className="py-2 font-bold w-full text-center hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Sobre o Autor
            </a>
            <a
              href="https://www.pokemon.com/br/"
              target="_blank"
              rel="noreferrer"
              onClick={ () => setShowMenu(false) }
              className="py-2 font-bold w-full text-center hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Site Oficial
            </a>
          </div>
          <img
            src={ require('../imagens/wallpaper/pokeball.jpg') } 
            alt="pokébola"
            className="w-20vw sm:w-5vw py-5 pt-10"
          />
        </div>
      }
    </nav> 
  );
}