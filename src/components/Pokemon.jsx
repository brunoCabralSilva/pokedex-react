import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default class Pokemon extends React.Component {

  retornaImagem = () => {
    const { poke } = this.props;
    const { id, name } = poke;
    if (id <= 9) {
      return (<img src={require(`../imagens/all/00${id}.png`)} className="w-10/12" alt={name} />);
    }
    else if (id >= 10 && id <= 99) {
      return (<img src={require(`../imagens/all/0${id}.png`)} alt={name} />);
    }
    else {
      return (<img src={require(`../imagens/all/${id}.png`)} alt={name} />);
    }
  }
  render() {
    const pokemonCards = {
      hidden: { opacity: 0, x: 20 },
      visible: (index) => ({ opacity: 1, x: 0, transition: { delay: 0.1 * index, duration: 0.3 } }),
      exit: (index) => ({ opacity: 0, x: 20, transition: { delay: 0.1 * index, duration: 0.3 } }),
    };
    const { poke, letraMaicuscula, i } = this.props;
    const { id, name } = poke;
    return (
      <motion.div
        className="snap-start flex flex-col items-center justify-center w-30vw bg-gray-300 hover:bg-gray-600 mx-2 transition duration-1000"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pokemonCards}
        custom={i}
      >
        {this.retornaImagem()}
        <p className="pb-3 text-center text-1xl w-fullVh sm2:w-50vw md2:w-25vw">
          {
            (id) < 10
            ? `0${id}`
            : `${id}`
          }
          {' - '}
          {letraMaicuscula(name)}
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