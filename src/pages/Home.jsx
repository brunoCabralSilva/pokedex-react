import React from 'react';
import { motion } from 'framer-motion';
import data from '../fetchs';
import Pokemon from '../components/Pokemon';
import ContentHome from '../components/ContentHome';
import FiltroLateral from '../components/FiltroLateral';
import ListaTodosPokemon from '../components/ListaTodosPokemon';

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
        list.push(<Pokemon numeroDoPokemon={numeroPokemon + i} nome={results[i].name} i={i} />);
      };
      this.setState({
        lista: list,
        numeroPokemon: 10,
        primeiro: 10,
        ultimo: 19,
      });
    }
  }

  render() {
    const { lista } = this.state;
    return (
      <div className="home">
        <img
          src={require("../imagens/Pokémon_logo.png")}
          alt="logo Pokémon"
          className="logo-pokemon" />
        <div>
          <ContentHome />
          <FiltroLateral />
        </div>
        <ListaTodosPokemon
          lista={lista}
          retorna10={this.retorna10}
          avanca10={this.avanca10}
        />

      </div>
    );
  }
}

export default Home;