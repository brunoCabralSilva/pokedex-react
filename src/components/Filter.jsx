import React, { useContext } from 'react';
import contexto from '../context';

function Filter() { 
  const context = useContext(contexto);
  const { setSearch } = context; 
  return (
    <form className="justify-between lg:flex-nowrap flex flex-col items-center sm:px-0 pb-4 sm:pb-0 w-full">
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-2 sm:px-0 pb-4 sm:pb-0 w-full text-white font-bold">
        <button
          type="button"
          className="border-2 border-white py-4 hover:bg-black/60"
          onClick={ () => setSearch('ALL') }
        >
          Todos os Pokémon
        </button>
        <button
          type="button"
          className="border-2 border-white py-4 hover:bg-black/60"
          onClick={ () => setSearch('NAME_NUMBER') }
        >
          Nome ou Número
        </button>
        <button
          type="button"
          className="border-2 border-white py-4 hover:bg-black/60"
          onClick={ () => setSearch('GENERATION') }
        >
          Busca por Geração
        </button>
        <button
          type="button"
          className="border-2 border-white py-4 hover:bg-black/60"
          onClick={ () => setSearch('TYPE') }
        >
          Busca por Tipo
        </button>
      </div>
     </form>
    );
  }

export default Filter;