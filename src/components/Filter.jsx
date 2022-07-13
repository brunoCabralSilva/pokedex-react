import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

function Filter(props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [generation, setGeneration] = useState('');
  const { handle } = props;

  const reset = () => {
    setName('');
    setNumber('');
    setGeneration('');
  }

  const selectChange = () => {
    if(state) return true;
  }

  return (
    <form className="justify-between sm:mx-2 lg:flex-nowrap flex-wrap flex sm:flex-row flex-col px-2 sm:px-0 pb-4 sm:pb-0 w-full">
      <label htmlFor="namePokemon" className="w-full mt-2 sm:mt-0 sm:w-45% lg:w-25% flex flex-col bg-gray-300 p-1 align-center sm:align-start">
        <span className="pl-2">Buscar por Nome</span>
        <div className="flex flex-row align-center sm:align-start">
        <input
          type="text"
          id="namePokemon"
          className="p-2 m-2 w-9/12"
          name="name"
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="button"
          className="w-2/12 bg-gray-500 p-2 my-2"
          onClick={
            () => {
              reset();
              handle(name)
            }
          }
        >
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
        </div>
      </label>
      <label htmlFor="numberPokemon" className="w-full mt-2 sm:mt-0 sm:w-45% lg:w-25% flex flex-col bg-gray-300 p-1 align-center sm:align-start">
        <span className="pl-2">Buscar por Número</span>
        <div className="flex flex-row align-center sm:align-start">
        <input
          type="number"
          id="numberPokemon"
          className="p-2 m-2 w-9/12"
          name="number"
          value={number}
          placeholder="Número"
          onChange={(e) => setNumber(e.target.value)}
        />
        <button
          type="button"
          className="w-2/12 bg-gray-500 p-2 my-2"
          onClick={
            () => {
              reset();
              handle(number)
            }
          }
        >
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
        </div>
      </label>
      <label htmlFor="generationPokemon" className="w-full mt-2 lg:mt-0  sm:w-45% lg:w-25% flex flex-col bg-gray-300 p-1 align-center sm:align-start">
        <span className="pl-2">Busca por Geração</span>
        <div className="flex flex-row w-full">
        <select
          className="p-2 m-2 w-9/12"
          onClick={(e) =>  setGeneration(e.target.value)}>
          <option disabled selected={selectChange()}>Geração</option>
          <option value="1">1º Geração</option>
          <option value="2">2º Geração</option>
          <option value="3">3º Geração</option>
          <option value="4">4º Geração</option>
          <option value="5">5º Geração</option>
          <option value="6">6º Geração</option>
          <option value="7">7º Geração</option>
          <option value="8">8º Geração</option>
        </select>
        <button
          type="button"
          className="w-2/12 bg-gray-500 p-2 my-2"
          onClick={(event) => console.log(event)}
        >
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
        </div>
      </label>
      <label htmlFor="generationPokemon" className="w-full sm:w-45% lg:w-25% flex flex-col bg-gray-300 mt-2 lg:mt-0 p-1 align-center sm:align-start">
        <span className="pl-2">Busca por Geração</span>
        <div className="flex flex-row w-full">
        <select className="p-2 m-2 w-9/12">
          <option disabled selected>Geração</option>
          <option>1º Geração</option>
          <option>2º Geração</option>
          <option>3º Geração</option>
          <option>4º Geração</option>
          <option>5º Geração</option>
          <option>6º Geração</option>
          <option>7º Geração</option>
          <option>8º Geração</option>
        </select>
        <button
          type="button"
          className="w-2/12 bg-gray-500 p-2 my-2"
        >
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
        </div>
      </label>
     </form>
    );
  }

Filter.propTypes = {
    classImage: PropTypes.string.isRequired,
}

export default Filter;