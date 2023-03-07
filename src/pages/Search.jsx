import React, { useContext, useEffect } from 'react';
import Filter from '../components/searchPokemon/FilterPokemon';
import contexto from '../context';
import Name from '../components/searchPokemon/Name';
import Type from '../components/searchPokemon/Type';
import Generation from '../components/searchPokemon/Generation';
import AllPokemon from '../components/searchPokemon/AllPokemon';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';

export default function Search() {
  const context = useContext(contexto);
  const { search } = context;

  useEffect(() => { window.scrollTo(0, 0) }, []);

  const returnSearch = () => {
    switch (search) {
      case 'NAME_NUMBER':
        return <Name />;
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
        <div className="w-full h-full">
          { returnSearch() }
        </div>
      <Footer />
    </div>
  );
}
