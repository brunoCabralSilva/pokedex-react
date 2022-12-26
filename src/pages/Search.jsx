import React, { useContext } from 'react';
import Filter from '../components/Filter';
import contexto from '../context';
import NameNumber from '../components/search/NameNumber';
import Type from '../components/search/Type';
import Generation from '../components/search/Generation';
import AllPokemon from '../components/search/AllPokemon';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';

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
    <div className="w-full flex flex-col items-center min-h-screen">
      <Nav />
      <Header name="Busca" />
      <Filter search={ search } />
      <div className="flex flex-row items-left justify-center">
        <div className="w-full h-full">
          { returnSearch() }
        </div>
      </div>
      <Footer />
    </div>
  );
}
