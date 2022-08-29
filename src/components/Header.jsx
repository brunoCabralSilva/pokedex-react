import React from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const globalState = useSelector((state) => state);
  const { showMenu } = globalState;
  return(
    <div className="w-full h-screen relative">
      <div className="w-full h-full flex flex-col items-center justify-center sm:justify-center absolute">
        <img src={require('../imagens/Pokémon_logo.png')} className={`${showMenu ? 'w-0' : 'w-10/12 sm:w-2/3 md:w-2/5'} transition-width pb-10`} alt="" />
      </div>
      <img src={require('../imagens/wallpaper/03.jpg')} alt="" className="h-screen w-full object-cover object-center" />
    </div>
  );
}