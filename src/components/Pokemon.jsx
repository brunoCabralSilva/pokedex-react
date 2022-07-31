import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Pokemon (props) {
  const { name, letraMaiuscula, id } = props;

  const pokemonCards = {
    hidden: { opacity: 0, x: 20 },
    visible: (index) => ({ opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.3 } }),
    exit: (index) => ({ opacity: 0, x: 20, transition: { delay: 0.1, duration: 0.3 } }),
  };
  

  const retornaImagem = () => {    
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
    
  return (
    <Link
      to={`/pokemon/${id}`}
      className="snap-start flex flex-col items-center justify-center w-30vw hover:bg-gray-600 transition duration-1000 m-1 w-fullVh sm2:w-24% sm:w-24% md2:w-24%"
    >
      <motion.div
        className="snap-start flex flex-col items-center justify-center bg-gray-300 hover:bg-gray-600 transition duration-1000"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pokemonCards}
        custom={id}
      >
        {retornaImagem()}
        <p className="pb-3 text-center text-1xl">
          {
            (id) < 10
            ? `0${id }`
            : `${id}`
          }
          {' - '}
          {letraMaiuscula(name)}
        </p>
      </motion.div>
    </Link>
  );
}


Pokemon.propTypes = {
  letraMaiuscula: PropTypes.func.isRequired,
  numeroDoPokemon: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  lista: PropTypes.string.isRequired,
};