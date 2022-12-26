import React, { useContext, useEffect, useState } from 'react';
import Pokemon from '../components/Pokemon';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import contexto from '../context';

export default function Favorites() {
  const context = useContext(contexto);
  const { numberPokemon } = context;

  useEffect(() => {
  }, []);

  return (
    <div className="bg-wallpaper-lilas bg-fixed bg-cover min-h-screen">
      <Nav />
      <div className={`bg-black/75 mx-1 p-2 h-screen`}>
        <p className="text-6xl text-white text-center pt-4 pb-10 font-bold w-full">
          Seu Time
        </p>
      </div>
      <div className="w-full p-1 gap-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      </div>
      <Footer />
    </div>
  );
}
