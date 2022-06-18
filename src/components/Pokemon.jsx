import React from 'react';
import { motion } from 'framer-motion';
export default class Pokemon extends React.Component {

  retornaImagem = () => {
    const { numeroDoPokemon, nome } = this.props;
    if (numeroDoPokemon < 9) {
      return (<img src={require(`../images/00${numeroDoPokemon + 1}.png`)} alt={nome} />);
    }
    else if (numeroDoPokemon >= 9 && numeroDoPokemon <= 98) {
      return (<img src={require(`../images/0${numeroDoPokemon + 1}.png`)} alt={nome} />);
    }
    else {
      return (<img src={require(`../images/${numeroDoPokemon + 1}.png`)} alt={nome} />);
    }
  }
  render() {
    const pokemonCards = {
      hidden: { opacity: 0, x: 20 },
      visible: (index) => ({ opacity: 1, x: 0, transition: { delay: 0.1 * index, duration: 0.3 } }),
      exit: (index) => ({ opacity: 0, x: 20, transition: { delay: 0.1 * index, duration: 0.3 } }),
    };

    const { numeroDoPokemon, nome, i } = this.props;
    console.log(i);
    return (
      <motion.div
        className="cada-pokemon"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pokemonCards}
        custom={i}
      >
        <p>
          {numeroDoPokemon + 1}
          {' '}
          {nome}
        </p>
        {this.retornaImagem()}
      </motion.div>
    );
  }
}