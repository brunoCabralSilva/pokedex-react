import React, { useState } from 'react';
import InputSearch from './InputSearch';

function Filter() {
  const [inputSearch, setInputSearch] = useState('');

  const showInputSelected = () => {
    switch(inputSearch) {
      case 'name':
        return(<InputSearch input="text" />);
      case 'number':
        return(<InputSearch input="number" />);
      case 'generation':
        return(<InputSearch input="generation" />);
      case 'type':
        return(<InputSearch input="type" />);
      default: return null;
    }
  }
  
  return (
    <form className="justify-between sm:mx-2 lg:flex-nowrap flex flex-col items-center px-2 sm:px-0 pb-4 sm:pb-0 w-full">
      <div className="justify-between sm:mx-2 lg:flex-nowrap flex sm:flex-row flex-col items-center px-2 sm:px-0 pb-4 sm:pb-0 w-full text-white font-bold">
        <label htmlFor="namePokemon" className="w-full justify-center mt-2 sm:mt-0 mx-1 flex flex-row p-1 align-center sm:align-start">
          <input type="radio" id="namePokemon" name="search" onClick={ () => setInputSearch('name') } />
          <span className="pl-2">Buscar por Nome</span>
        </label>
        <label htmlFor="numberPokemon" className="w-full justify-center mt-2 sm:mt-0 flex mx-1 flex-rol items-center p-1 align-center sm:align-start" onClick={ () => setInputSearch('number') }>
          <input type="radio" id="numberPokemon" name="search" />
          <span className="pl-2">Buscar por Número</span>
        </label>
        <label htmlFor="generationPokemon" className="w-full justify-center mt-2 sm:mt-0 flex mx-1 flex-row items-center p-1 align-center sm:align-start" onClick={ () => setInputSearch('generation') }>
          <input type="radio" id="generationPokemon" name="search" />
          <span className="pl-2">Busca por Geração</span>
        </label>
        <label htmlFor="typeOfPokemon" className="w-full justify-center mt-2 sm:mt-0 flex mx-1 flex-row p-1 align-center sm:align-start items-center">
          <input type="radio" id="typeOfPokemon" name="search" onClick={ () => setInputSearch('type') } />
          <span className="pl-2">Busca por Tipo</span>
        </label>
      </div>
      { showInputSelected() }
     </form>
    );
  }

export default Filter;