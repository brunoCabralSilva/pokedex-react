import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function Pokemon (props) {
  const { number,  name, letraMaicuscula, id } = props;
  
  let position = number;
  if(id !== undefined) {
    position = id;
  }

  const pokemonCards = {
    hidden: { opacity: 0, x: 20 },
    visible: (index) => ({ opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.3 } }),
    exit: (index) => ({ opacity: 0, x: 20, transition: { delay: 0.1, duration: 0.3 } }),
  };
  

  const retornaImagem = () => {    
    if (position <= 9) {
      return (<img src={require(`../imagens/all/00${position}.png`)} className="w-10/12" alt={name} />);
    }
    else if (position >= 10 && position <= 99) {
      return (<img src={require(`../imagens/all/0${position}.png`)} alt={name} />);
    }
    else {
      return (<img src={require(`../imagens/all/${position}.png`)} alt={name} />);
    }
  }
    
  return (
    <motion.div
      className="snap-start flex flex-col items-center justify-center w-30vw bg-gray-300 hover:bg-gray-600 transition duration-1000 m-1 w-fullVh sm2:w-24% sm:w-24% md2:w-24%"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pokemonCards}
      custom={number}
    >
      {retornaImagem()}
      <p className="pb-3 text-center text-1xl">
        {
          (position) < 10
          ? `0${position }`
          : `${position}`
        }
        {' - '}
        {letraMaicuscula(name)}
      </p>
    </motion.div>
  );
}


Pokemon.propTypes = {
  letraMaicuscula: PropTypes.func.isRequired,
  numeroDoPokemon: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  lista: PropTypes.string.isRequired,
};