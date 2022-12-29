import React, { useContext, useEffect } from 'react';
import contexto from '../context';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';
import MoveByType from '../components/searchMove/MoveByType';
import AllMoves from '../components/searchMove/AllMoves';
import FilterMoves from '../components/searchMove/FilterMoves';
import MoveByName from '../components/searchMove/MovesByName';

export default function Search() {
  const context = useContext(contexto);
  const { searchMove } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const returnSearch = () => {
    switch (searchMove) {
      case 'MOVE_BY_TYPE':
        return <MoveByType />;
      case 'MOVES_BY_NAME':
        return <MoveByName />;
      default: 
        return <AllMoves />;
    }
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <Nav />
      <Header name="Movimentos" />
      <FilterMoves />
      <div className="flex flex-row items-left justify-center">
        <div className="w-full h-full">
          { returnSearch() }
        </div>
      </div>
      <Footer />
    </div>
  );
}
