import React from 'react';
import { motion } from 'framer-motion';
import data from '../fetchs';
import Pokemon from '../components/Pokemon';
import ListaTodosPokemon from '../components/ListaTodosPokemon';
import FiltroLateral from '../components/FiltroLateral';

const { getAllPokemon } = data;

class Home extends React.Component {
  state = {
    dezPokemon: {},
    numeroPokemon: 0,
    primeiro: 0,
    ultimo: 9,
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

  retorna10 = async () => {
    const { dezPokemon, primeiro, numeroPokemon } = this.state;
    const { results } = dezPokemon;
    let list = [];
    if (primeiro === 20) {
      for (let i = primeiro - 20; i < primeiro - 10; i += 1) {
        list.push(<Pokemon numeroDoPokemon={numeroPokemon - 20 + i} nome={results[i].name} i={i} />);
      };
      this.setState((prevState) => ({
        lista: list,
        numeroPokemon: prevState.numeroPokemon - 10,
        primeiro: prevState.primeiro - 10,
        ultimo: prevState.ultimo - 10,
      }));
    } else if (primeiro === 10) {
      let listaFetch = [];
      const todosOsPokemon = await getAllPokemon(dezPokemon.previous);
      const { results: result } = todosOsPokemon;
      for (let i = 10; i <= 19; i += 1) {
        listaFetch.push(<Pokemon numeroDoPokemon={numeroPokemon - 30 + i} nome={result[i].name} i={i} />);
      };
      this.setState((prevState) => ({
        dezPokemon: todosOsPokemon,
        lista: listaFetch,
        numeroPokemon: prevState.numeroPokemon - 10,
        primeiro: 20,
        ultimo: 29,
      }));
    }
  }

  avanca10 = async () => {
    const { dezPokemon, primeiro, ultimo, numeroPokemon } = this.state;
    const { results } = dezPokemon;
    let list = [];
    if (ultimo <= results.length) {
      for (let i = primeiro; i <= ultimo; i += 1) {
        list.push(<Pokemon numeroDoPokemon={numeroPokemon + i - 10} nome={results[i].name} i={i} />);
      };

      this.setState((prevState) => ({
        lista: list,
        numeroPokemon: prevState.numeroPokemon + 10,
        primeiro: prevState.primeiro + 10,
        ultimo: prevState.ultimo + 10,
      }));
    }

    else if (primeiro >= 20) {
      const listaFetch = [];
      const todosOsPokemon = await getAllPokemon(dezPokemon.next);
      const { results: result } = todosOsPokemon;
      for (let i = 0; i <= 9; i += 1) {
        listaFetch.push(<Pokemon numeroDoPokemon={numeroPokemon + i} nome={result[i].name} />);
      };
      this.setState((prevState) => ({
        dezPokemon: todosOsPokemon,
        lista: listaFetch,
        numeroPokemon: prevState.numeroPokemon + 10,
        primeiro: 10,
        ultimo: 19,
      }));
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
          <ListaTodosPokemon
            lista={lista}
            retorna10={this.retorna10}
            avanca10={this.avanca10}
          />
          <FiltroLateral />
        </div>

      </div>
    );
  }
}

export default Home;