import React, { useContext, useEffect, useState } from 'react';
import Pokemon from '../components/Pokemon';
import contexto from '../context';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const context = useContext(contexto);
  const [storage, setStorage] = useState([]);
  const { numberPokemon, team, setTeam } = context;

  useEffect(() => {
    let locStorage = JSON.parse(localStorage.getItem('teams'));
    if (locStorage === null) {
      setStorage([]);
    } else {
      const arrayWithId = locStorage.map((item) => {
        const id = numberPokemon(item);
        return {
          name: item.name,
          url: item.url,
          id: id,
        }

      })
      setStorage(arrayWithId);
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Nav />
      <Header name="Meu Time" />
      <div className={`w-9/12 mx-1 p-2 ${storage.length === 0 && 'h-screen'}`}>
        <p className="pt-5 mt-8 sm:mt-12">
          Abaixo serão listados todos pokémon que pertencem ao seu time.
        </p>
        <p className="pt-2">  
          Clicando em um Pokémon, será possível ver mais detalhes sobre ele. Além disso, caso você clique no botão que existe no canto superior direito de cada Pokémon, este será removido na sua lista de Favoritos.
        </p>
        {
          storage.length > 0
          ? <div className="h-3/4 flex sm:justify-start w-full">
            <p className="py-14 text-marinho w-9/12 text-3xl h-full flex flex-col sm:flex-row items-center sm:p-0 sm:py-14 text-left">
              { `Total de Pokémon no seu time: ${storage.length}`}
            </p>
          </div>
          : <div className="h-3/4 flex justify-start">
              <p className="py-14 text-marinho w-9/12 text-3xl h-full flex flex-col sm:flex-row items-center sm:p-0 sm:py-14 text-left">
                { `Você ainda não possui Pokémon no time. `}
                <Link to="/favorites" className="font-bold underline underline-offset-2">Que tal mudarmos isto?</Link>
              </p>
            </div>
        }
      </div>
      <div className="w-9/12 p-1 gap-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3">
        {
          storage.length > 0
          ? storage
              .sort((a, b) => Number(a.id) - Number(b.id) )
              .map((poke, index) => (
              <Pokemon
                key={index}
                className="w-full"
                name={poke.name}
                teams={ true }
                id={numberPokemon(poke)}
                dataPokemon={poke}
              />
            ))
          : 
            <p className="text-4xl text-white text-center pt-4 pb-10  font-bold w-full">
              Nenhum Pokémon adicionado ao time
            </p>
        }
      </div>
      <Footer />
    </div>
  );
}
