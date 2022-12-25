import React from 'react';

export default function Header() {
  return(
    <div className="h-86vh w-full relative flex justify-center bg-anil">
      <div className="w-full h-full flex items-end justify-center sm:justify-center absolute">
        <img
          src={require('../imagens/Pokémon_logo.png')}
          className="w-80vw sm:w-30vw transition-all pb-5vh sm:pb-7vh" 
          alt=""
        />
      </div>
      <img
        src={require(`../imagens/wallpaper/YourTeam.jpg`)}
        alt=""
        className="py-10vh sm:py-0 h-full sm:h-4/5 object-cover object-left sm:object-center mb-10"
      />
    </div>
  );
}