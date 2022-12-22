import React from 'react';

function Filter({ search }) {  
  return (
    <form className="justify-between lg:flex-nowrap flex flex-col items-center px-2 sm:px-0 pb-4 sm:pb-0 w-full">
      <div className="grid grid-cols-4 px-2 sm:px-0 pb-4 sm:pb-0 w-full text-white font-bold">
        <button
          type="button"
          onClick={ () => search('ALL') }
        >
          Todos os Pokémon
        </button>
        <button
          type="button"
          onClick={ () => search('NAME_NUMBER') }
        >
          Nome ou Número
        </button>
        <button
          type="button"
          onClick={ () => search('GENERATION') }
        >
          Busca por Geração
        </button>
        <button
          type="button"
          onClick={ () => search('TYPE') }
        >
          Busca por Tipo
        </button>
      </div>
     </form>
    );
  }

export default Filter;