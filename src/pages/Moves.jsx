import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';

export default function Moves() {
  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <Nav />
      <Header name="Movimentos" />
      <div className="flex flex-row items-left justify-center">
        Moves
      </div>
      <Footer />
    </div>
  );
  }
