import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  state = {
    name: '',
    number:'',
    pokemon: {},
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }


  render() {
    const { handle } = this.props;
    const {name, number } = this.state;
    return (
     <form className="justify-between sm:mx-2 lg:flex-nowrap bg-white flex-wrap flex sm:flex-row flex-col px-2 sm:px-0 pb-4 sm:pb-0 w-full">
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
            onChange={this.handleChange}
          />
          <button
            type="button"
            className="w-2/12 bg-gray-500 p-2 my-2"
            onClick={() => handle(name)}
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
            onChange={this.handleChange}
          />
          <button
            type="button"
            className="w-2/12 bg-gray-500 p-2 my-2"
            onClick={() => handle(number)}
          >
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
          </div>
        </label>
        <label htmlFor="generationPokemon" className="w-full mt-2 lg:mt-0  sm:w-45% lg:w-25% flex flex-col bg-gray-300 p-1 align-center sm:align-start">
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
}

Filter.propTypes = {
    classImage: PropTypes.string.isRequired,
}

export default Filter;