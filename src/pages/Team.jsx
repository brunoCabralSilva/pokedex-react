import React, { useContext, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Pokemon from '../components/Pokemon';
import contexto from '../context';

export default function Favorites() {
  const context = useContext(contexto);
  const { numberPokemon } = context;

  useEffect(() => {
  }, []);

  return (
    <div className="bg-wallpaper-lilas bg-fixed bg-cover pt-2 min-h-screen">
      <div className={`bg-black/75 mx-1 p-2 h-screen`}>
        <Nav color="white" className="z-60" />
        <p className="text-6xl text-white text-center pt-4 pb-10 font-bold w-full">
          Seu Time
        </p>
      </div>
      <div className="w-full p-1 gap-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      </div>
    </div>
  );
}
