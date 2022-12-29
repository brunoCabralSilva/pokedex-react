import React from 'react';

export default function Header({ name }) {
  return(
    <div className="mt-7vh h-86vh w-full relative flex justify-center bg-anil">
      <div className="w-full h-full flex items-end justify-center sm:justify-center absolute">
        <img
          src={require('../imagens/Pokémon_logo.png')}
          className={`${name && 'hidden'} w-80vw sm:w-30vw transition-all pb-5vh sm:pb-7vh`} 
          alt=""
        />
        <p className={`${!name && 'hidden'} transition-all pb-5vh sm:pb-7vh pokemon contorno tracking-widest text-yellow text-5xl sm:text-8xl md:text-8xl`}>
          { name }
        </p>
      </div>
      <img
        src={require(`../imagens/wallpaper/YourTeam.jpg`)}
        alt=""
        className="py-10vh sm:py-0 h-full sm:h-4/5 object-cover object-left sm:object-center mb-10"
      />
    </div>
  );
}