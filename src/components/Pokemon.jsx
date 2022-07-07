import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default class Pokemon extends React.Component {

  retornaImagem = () => {
    const { numeroDoPokemon, nome } = this.props;
    if (numeroDoPokemon < 9) {
      return (<img src={require(`../imagens/all/00${numeroDoPokemon + 1}.png`)} alt={nome} />);
    }
    else if (numeroDoPokemon >= 9 && numeroDoPokemon <= 98) {
      return (<img src={require(`../imagens/all/0${numeroDoPokemon + 1}.png`)} alt={nome} />);
    }
    else {
      return (<img src={require(`../imagens/all/${numeroDoPokemon + 1}.png`)} alt={nome} />);
    }
  }
  render() {
    const pokemonCards = {
      hidden: { opacity: 0, x: 20 },
      visible: (index) => ({ opacity: 1, x: 0, transition: { delay: 0.1 * index, duration: 0.3 } }),
      exit: (index) => ({ opacity: 0, x: 20, transition: { delay: 0.1 * index, duration: 0.3 } }),
    };

    const { numeroDoPokemon, nome, i, letraMaicuscula } = this.props;
    console.log(i);
    return (
      <motion.div
        className="flex flex-col items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pokemonCards}
        custom={i}
      >
        {this.retornaImagem()}
        <p className="pb-3">
          {
            (numeroDoPokemon + 1) < 10
            ? `0${numeroDoPokemon + 1}`
            : `${numeroDoPokemon + 1}`
          }
          {' - '}
          {letraMaicuscula(nome)}
        </p>
      </motion.div>
    );
  }
}


Pokemon.propTypes = {
  letraMaicuscula: PropTypes.func.isRequired,
  numeroDoPokemon: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  lista: PropTypes.string.isRequired,
};