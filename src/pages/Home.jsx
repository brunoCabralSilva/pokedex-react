import React from 'react';
// import { motion } from 'framer-motion';
import data from '../fetchs';
import Pokemon from '../components/Pokemon';
import TypeList from '../components/TypeList';
import Logo from '../components/Logo';
import List from '../components/List';
import Filter from '../components/Filter';

const { getAllPokemon } = data;

class Home extends React.Component {
  state = {
    dezPokemon: {},
    numeroPokemon: 0,
    primeiro: 0,
    ultimo: 4,
    lista: [],
  }

  async componentDidMount() {
    const { numeroPokemon, primeiro, ultimo } = this.state;
    const todosOsPokemon = await getAllPokemon('https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=20');
    this.setState({ dezPokemon: todosOsPokemon });
    if (todosOsPokemon.count) {
      const { results } = todosOsPokemon;
      let list = [];
      for (let i = primeiro; i <= ultimo; i += 1) {
        list.push
        (<Pokemon
            numeroDoPokemon={numeroPokemon + i}
            nome={results[i].name}
            i={i}
            letraMaicuscula={ this.letraMaicuscula }
          />
        );
      };
      this.setState({
        lista: list,
        numeroPokemon: 10,
        primeiro: 10,
        ultimo: 19,
      });
    }
  }

  letraMaicuscula = (nome) => {
    let novoNome = nome[0].toUpperCase();
    for (let i = 1; i < nome.length; i += 1) {
      novoNome += nome[i];
    }
    return novoNome;
  }

  render() {
    const { lista } = this.state;
    return (
      <div className="flex flex-col w-full">
        <header className="flex justify-center w-full bg-gray-300">
          <Logo classImage="w-2/5" />
        </header>
      <div className="flex flex-row items-center justify-center sm:items-start sm:justify-between w-full">
        <section className="w-full sm:w-4/5 flex flex-col justify-center items-center m-2">
          <Filter />
          <div className="w-full justify-center flex flex-col items-center sm:m-2 bg-gray-400">
          <List lista={lista} />
          </div>
        </section>
        <aside className="hidden sm:flex sm:flex-col w-1/5 bg-gray-200 sm:mr-2 sm:my-2">
          <TypeList letraMaicuscula={ this.letraMaicuscula } />
        </aside>
      </div>
      <section className="w-4/5 flex flex-col justify-center items-center m-2">
          <Filter />
          <div className="w-full justify-center flex flex-col items-center sm:m-2 bg-gray-400">
          <List lista={lista} />
          </div>
        </section>
      </div>
    );
  }
}

export default Home;