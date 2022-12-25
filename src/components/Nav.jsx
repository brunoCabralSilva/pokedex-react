import React, { useState } from 'react';
import { Link } from  'react-router-dom';

export default function Nav({ color }) {
  console.log(color);
  const [ showMenu, setShowMenu] = useState(false);
  return (
    <nav className="w-full h-7vh bg-white 2xl:text-xl leading-6 flex flex-col justify-center items-end px-4">
      <div
        onClick={ () => { setShowMenu(!showMenu) }}
        className={`z-50 ${showMenu ? 'fixed' : ''}`}
      >
        <div className={`h-1 w-7 mb-1 transition duration-500 bg-marinho ${ showMenu ? 'rotate-45deg translate-y-2' : 'rotate-0' }`} />
        <div className={`h-1 w-7 mb-1 transition duration-500 bg-marinho ${showMenu ? 'rotate-45' : 'rotate-0'}`} />
        <div className={`h-1 w-7 transition duration-500 bg-marinho ${ showMenu ? 'opacity-0' : 'opacity-1'}`}> </div>
      </div>
      {
        showMenu && 
        <div className="pt-7vh top-0 right-0 fixed w-1/6 bg-anil h-screen z-40 border-l-2 border-marinho flex flex-col items-center justify-between">
          <div className="w-full flex flex-col items-center justify-center pt-7vh text-marinho">
            <Link
              to=""
              className="mt-5 py-2 font-bold w-full text-center bg-anil hover:bg-marinho/50 hover:text-black transition-colors flex items-center justify-center"
            >
              Home
            </Link>
            <Link
              to=""
              className="py-2 font-bold w-full text-center bg-anil hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Buscar
            </Link>
            <Link
              to=""
              className="py-2 font-bold w-full text-center bg-anil hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Favoritos
            </Link>
            <Link
              to=""
              className="py-2 font-bold w-full text-center bg-anil hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Meu Time
            </Link>
            <Link
              to=""
              className="py-2 font-bold w-full text-center bg-anil hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Sobre o Autor
            </Link>
            <Link
              to=""
              className="py-2 font-bold w-full text-center bg-anil hover:bg-marinho/50 hover:text-black  transition-colors flex items-center justify-center"
            >
              Site Oficial
            </Link>
          </div>
          <img
              src={ require('../imagens/wallpaper/pokeball.jpg') } 
              alt="pokébola"
              className="w-5vw py-5"
            />
        </div>
      }
    </nav> 
  );
}