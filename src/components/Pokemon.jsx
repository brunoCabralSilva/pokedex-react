import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import letraMaiuscula from '../utils/Utilitaries';


export default function Pokemon (props) {
  const { name, id } = props;

  const pokemonCards = {
    hidden: { opacity: 0, x: 20 },
    visible: (index) => ({ opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.3 } }),
    exit: (index) => ({ opacity: 0, x: 20, transition: { delay: 0.1, duration: 0.3 } }),
  };
  

  const retornaImagem = () => {    
    if (id <= 9) {
      return (<img src={require(`../imagens/all/00${id}.png`)} className="w-8/12" alt={name} />);
    }
    else if (id >= 10 && id <= 99) {
      return (<img src={require(`../imagens/all/0${id}.png`)} className="w-8/12" alt={name} />);
    }
    else {
      return (<img src={require(`../imagens/all/${id}.png`)} className="w-8/12" alt={name} />);
    }
  }
    
  return (
    <Link
      to={`/pokemon/${id}`}
      className="p-1 flex flex-col items-center justify-center transition duration-1000"
    >
      <motion.div
        className="w-full flex flex-col items-center justify-center bg-half-transp hover:bg-min-transp transition duration-500"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pokemonCards}
        custom={id}
      >
        {retornaImagem()}
        <p className="pb-3 text-center text-1xl text-white font-bold">
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