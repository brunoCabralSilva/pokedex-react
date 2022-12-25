import React, { useContext, useEffect, useState } from 'react';
import Pokemon from '../components/Pokemon';
import contexto from '../context';

export default function Favorites() {
  const context = useContext(contexto);
  const [storage, setStorage] = useState([]);
  const { numberPokemon } = context;

  useEffect(() => {
    let locStorage = JSON.parse(localStorage.getItem('favorites'));
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
    <div className="bg-wallpaper-lilas bg-fixed bg-cover pt-2 min-h-screen">
      <div className={`bg-black/75 mx-1 p-2 ${storage.length === 0 && 'h-screen'}`}>
        <p className="text-6xl text-white text-center pt-4 pb-10 font-bold w-full">
          Favoritos
        </p>
        {
          storage.length > 0 &&
          <div className="h-3/4">
            <p className="text-4xl text-white text-center pt-4 pb-10 font-bold w-full">
              { `Total de Pokémon Favoritados: ${storage.length}`}
            </p>
          </div>
        }
      </div>
      <div className="w-full p-1 gap-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {
          storage.length > 0
          ? storage
              .sort((a, b) => Number(a.id) - Number(b.id) )
              .map((poke, index) => (
              <Pokemon
                key={index}
                className="w-full"
                name={poke.name}
                id={numberPokemon(poke)}
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
        storage.length > 0 &&
        <button
          type="button"
          className="py-1 w-full mb-1"
          onClick={ () => window.scrollTo(0, 0) }
        >
          <div className="bg-black/70 text-white text-xl p-4 font-bold hover:border-2 hover:border-white w-full h-full">
            Voltar ao Topo
          </div>
        </button>
      }
    </div>
  );
}
