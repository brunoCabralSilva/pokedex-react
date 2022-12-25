import React, { useContext } from 'react';
import Filter from '../components/Filter';
import contexto from '../context';
import NameNumber from '../components/search/NameNumber';
import Type from '../components/search/Type';
import Generation from '../components/search/Generation';
import AllPokemon from '../components/search/AllPokemon';

export default function Search() {
  const context = useContext(contexto);
  const { search } = context;

  const returnSearch = () => {
    switch (search) {
      case 'NAME_NUMBER':
        return <NameNumber />;
      case 'TYPE':
        return <Type />;
      case 'GENERATION': 
        return <Generation />;
      default: 
        return <AllPokemon />;
    }
  }

  return (
    <div className="bg-wallpaper-lilas bg-fixed bg-cover pt-2 min-h-screen">
      <div className="bg-black/75 mx-1 p-2">
        <div className="">
          <p className="text-6xl text-white text-center pt-4 pb-10 font-bold w-full">Busca</p>
        </div>
        <Filter />
      </div>
      <div className="flex flex-row items-left justify-center">
        <div className="w-full h-full">
          { returnSearch() }
        </div>
      </div>
    </div>
  );
}
