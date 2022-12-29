import React, { useContext } from 'react';
import contexto from '../../context';

export default function FilterMoves() { 
  const context = useContext(contexto);
  const { searchMove, setSearchMove } = context;
  return (
    <form className="justify-between lg:flex-nowrap flex flex-col items-center sm:px-0 pb-4 sm:pb-0 w-full">
      <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-2 sm:px-1 pb-4 sm:pb-0 w-full font-bold mt-1">
        <button
          type="button"
          className={`border-2 ${searchMove === 'ALL' && 'border-b-0'} py-4 border-anil relative hover:bg-anil text-black transition-all duration-500`}
          onClick={ () => setSearchMove('ALL') }
        >
          { 
            searchMove === 'ALL' &&
            <div className="absolute top-0 h-full flex items-center">
              <img
                src={ require('../../imagens/wallpaper/pokeball.jpg') } 
                alt="pokébola"
                className="h-1/3 lg:h-full"
              />
            </div>
          }
          <span className="my-4">Todos os Movimentos</span>
        </button>
        <button
          type="button"
          className={`border-2 ${searchMove === 'MOVES_BY_NAME' && 'border-b-0'} py-4 border-anil relative hover:bg-anil text-black transition-all duration-500`}
          onClick={ () => setSearchMove('MOVES_BY_NAME') }
        >
          { 
            searchMove === 'MOVES_BY_NAME' &&
            <div className="absolute top-0 h-full flex items-center">
              <img
                  src={ require('../../imagens/wallpaper/pokeball.jpg') } 
                  alt="pokébola"
                  className="h-1/3 lg:h-full"
                />
            </div>
          }
          <span className="my-4">Movimentos por Nome</span>
        </button>
        <button
          type="button"
          className={`border-2 ${searchMove === 'MOVE_BY_TYPE' && 'border-b-0'} py-4 border-anil relative hover:bg-anil text-black transition-all duration-500`}
          onClick={ () => setSearchMove('MOVE_BY_TYPE') }
        >
          { 
            searchMove === 'MOVE_BY_TYPE' &&
            <div className="absolute top-0 h-full flex items-center">
              <img
                src={ require('../../imagens/wallpaper/pokeball.jpg') } 
                alt="pokébola"
                className="h-1/3 lg:h-full"
              />
            </div>
          }
          <span className="my-4">Movimentos por Tipo</span>
        </button>
      </div>
     </form>
    );
  }