import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';
import { getAlternativePokemon } from '../fetchs';

export default function Alternatives() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getAlternativeForms = async () => {
      const get = await getAlternativePokemon();
      setList(get);
      console.log(get);
    }
    getAlternativeForms();
  },[]);
  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <Nav />
      <Header name="Alternatives" />
      <div className="flex flex-row items-left justify-center">
        <div className="w-full h-full">
        </div>
      </div>
      <Footer />
    </div>
  );
}
