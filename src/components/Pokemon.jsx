import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import letraMaiuscula from '../utils/Utilitaries';
import data from '../fetchs';
import imagemType from './Types';


export default function Pokemon (props) {
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const { name, id } = props;
  const { getByName } = data;
  useEffect(() => {
    setType1('');
    setType2('');
    const search = async () => {
      const searchByName = await getByName(id);
      const typeList = await searchByName.types.map((item) => item.type.name);
      setType1(typeList[0]);
      setType2(typeList[1]);
    };
    search();
  }, []);

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
      className="flex flex-col items-center justify-center transition duration-1000"
    >
      <motion.div
        className="w-full flex flex-col items-center justify-center bg-half-transp hover:bg-min-transp transition duration-500"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pokemonCards}
        custom={id}
      >
        { retornaImagem() }
        <div className="flex items-center justify-center w-full pb-5">
          { 
            type1 && !type2
            ? <img src={require(`../imagens/types/${type1}.png`)} alt="" className="w-12" />
            : type1 && type2 && 
              <div className="flex items-center justify-center w-full">
                <img src={require(`../imagens/types/${type1}.png`)} alt="" className="w-12 pr-1" />
                <img src={require(`../imagens/types/${type2}.png`)} alt="" className="w-12 pl-1" />
              </div>
          }
        </div>
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