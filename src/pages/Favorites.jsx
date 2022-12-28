import React, { useContext, useEffect, useState } from 'react';
import Pokemon from '../components/Pokemon';
import contexto from '../context';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';
import ListTeam from '../components/ListTeam';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const context = useContext(contexto);
  const { team, setTeam, listFavorites, setListFavorites } = context;
  useEffect(() => {
    let locStorage = JSON.parse(localStorage.getItem('favorites'));
    if (locStorage === null) {
      setListFavorites([]);
    } else {
      setListFavorites(JSON.parse(localStorage.getItem('favorites')));
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Nav />
      <ListTeam list={team} setList={setTeam} />
      <Header name="Favoritos" />
      <div className={`w-9/12 mx-1 p-2 ${listFavorites.length === 0 && 'h-screen'}`}>
        <p className="pt-5 mt-8 sm:mt-12">
          Abaixo serão listados todos pokémon favoritados por você.
        </p>
        <p className="pt-2">  
          Clicando em um Pokémon, será possível ver mais detalhes sobre ele. Além disso, caso você clique no botão que existe no canto superior direito de cada Pokémon, este será removido na sua lista de Favoritos.
        </p>
        {
          listFavorites.length > 0
          ? <div className="h-3/4 flex sm:justify-start w-full">
            <p className="py-14 text-marinho w-9/12 text-3xl h-full flex flex-col sm:flex-row items-center sm:p-0 sm:py-14 text-left">
              { `Total de Pokémon Favoritados: ${listFavorites.length}`}
            </p>
          </div>
          : <div className="h-3/4 flex justify-start">
              <p className="py-14 text-marinho w-9/12 text-3xl h-full flex flex-col items-start sm:p-0 sm:py-14 text-left">
                { `Você ainda não possui Pokémon favoritos. `}
                <Link to="/search" className="font-bold underline underline-offset-2 pt-5">Que tal mudarmos isto?</Link>
              </p>
            </div>
        }
      </div>
      <div className="w-9/12 p-1 gap-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        {
          listFavorites.length > 0
          ? listFavorites
              .map((poke, index) => (
              <Pokemon
                key={index}
                className="w-full"
                name={poke.name}
                teams={ true }
                id={poke.id}
                dataPokemon={poke}
              />
            ))
          : 
            <p className="text-4xl text-white text-center pt-4 pb-10  font-bold w-full">
              Nenhum Pokémon adicionado aos Favorivos
            </p>
        }
      </div>
      { 
        listFavorites.length > 0 &&
        <button
          type="button"
          className="py-1 w-9/12 mb-1"
          onClick={ () => window.scrollTo(0, 0) }
        >
          <div className="bg-anil/80 text-black text-xl p-4 w-full h-full bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500">
            Voltar ao Topo
          </div>
        </button>
      }
      <Footer />
    </div>
  );
}
