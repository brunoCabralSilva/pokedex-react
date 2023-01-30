import React, { useContext } from 'react';
import contexto from '../../context';

function Filter({ search }) { 
  const context = useContext(contexto);
  const { setSearch } = context;
  return (
    <div className="items-center flex flex-col w-full">
      <form className="xl:max-w-xl justify-between lg:flex-nowrap flex flex-col items-center sm:px-0 pb-4 sm:pb-0 w-full">
        <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-2 sm:px-1 pb-4 sm:pb-0 w-full font-bold mt-1">
          <button
            type="button"
            className={`border-2 ${search === 'ALL' && 'border-b-0'} py-4 border-anil relative hover:bg-anil text-black transition-all duration-500`}
            onClick={ () => setSearch('ALL') }
          >
            { 
              search === 'ALL' &&
              <div className="absolute top-0 h-full flex items-center">
                <img
                  src={ require('../../imagens/wallpaper/pokeball.jpg') } 
                  alt="pokébola"
                  className="h-1/3 lg:h-full"
                />
              </div>
            }
            <span className="my-4">Todos os Pokémon</span>
          </button>
          <button
            type="button"
            className={`border-2 ${search === 'NAME_NUMBER' && 'border-b-0'} py-4 border-anil relative hover:bg-anil text-black transition-all duration-500`}
            onClick={ () => setSearch('NAME_NUMBER') }
          >
            { 
              search === 'NAME_NUMBER' &&
              <div className="absolute top-0 h-full flex items-center">
                <img
                    src={ require('../../imagens/wallpaper/pokeball.jpg') } 
                    alt="pokébola"
                    className="h-1/3 lg:h-full"
                  />
              </div>
            }
            <span className="my-4">Nome ou Número</span>
          </button>
          <button
            type="button"
            className={`border-2 ${search === 'GENERATION' && 'border-b-0'} py-4 border-anil relative hover:bg-anil text-black transition-all duration-500`}
            onClick={ () => setSearch('GENERATION') }
          >
            { 
              search === 'GENERATION' &&
              <div className="absolute top-0 h-full flex items-center">
                <img
                  src={ require('../../imagens/wallpaper/pokeball.jpg') } 
                  alt="pokébola"
                  className="h-1/3 lg:h-full"
                />
              </div>
            }
            <span className="my-4">Busca por Geração</span>
          </button>
          <button
            type="button"
            className={`border-2 ${search === 'TYPE' && 'border-b-0'} py-4 border-anil relative hover:bg-anil text-black transition-all duration-500`}
            onClick={ () => setSearch('TYPE') }
          >
            { 
              search === 'TYPE' &&
              <div className="absolute top-0 h-full flex items-center">
                <img
                  src={ require('../../imagens/wallpaper/pokeball.jpg') } 
                  alt="pokébola"
                  className="h-1/3 lg:h-full"
                />
              </div>
            }
            <span className="my-4">Busca por Tipo</span>
          </button>
        </div>
      </form>
     </div>
    );
  }

export default Filter;