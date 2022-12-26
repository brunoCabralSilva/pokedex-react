import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import contexto from '../context';
import { getByName }  from '../fetchs';
import Loading from './Loading';

export default function Pokemon (props) {
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const [messageAdd, setMessageAdd] = useState('');
  const [searchByName, setSearchByName] = useState({});
  const [check, setCheck] = useState(false);
  const context = useContext(contexto);
  const {
    listFavorites,
    setListFavorites,
    letraMaiuscula,
  } = context;

  const { name, id, dataPokemon } = props;

  const storageSetup = () => {
    let storage = JSON.parse(localStorage.getItem('favorites'));
    if (storage === null) {
      storage = [];
    }
    const verification = storage
      .filter((fav) => {
        return fav.name === dataPokemon.name
      });
    if(verification.length > 0) {
      setCheck(true);
    }
  };

  const search = async () => {
    const searchBy = await getByName(id);
    setSearchByName(searchBy);
    const typeList = await searchBy.types.map((item) => item.type.name);
    setType1(typeList[0]);
    setType2(typeList[1]);
  };

  useEffect(() => {
    setType1('');
    setType2('');
    storageSetup();
    search();    
  }, []);

  const pokemonCards = {
    hidden: { opacity: 0, x: 20 },
    visible: (index) => ({ opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.3 } }),
    exit: (index) => ({ opacity: 0, x: 20, transition: { delay: 0.1, duration: 0.3 } }),
  };


  const retornaImagem = () => {    
    return (
      <div className="relative">
        <p className="text-marinho absolute bottom-0 w-full text-center pb-2 pt-4 font-bold bg-gradient-to-t from-anil via-anil/60 to-anil/10">{ messageAdd }</p>
        <img
          src={Object.values(searchByName.sprites.other)[2].front_default} 
          className="w-full bg-anil/40 rounded-lg p-5" alt={name}
        />
      </div>
    );
  };

  const addFavorite = (checked) => {
    let storage = JSON.parse(localStorage.getItem('favorites'));
    if (storage === null) {
      storage = [];
    }
    setCheck(checked);
    if (checked) {
      localStorage.setItem('favorites', JSON.stringify([...storage, dataPokemon]));
      setMessageAdd('Adicionado aos Favoritos');
      setTimeout(() => {
        setMessageAdd('');
      }, 2000);
    } else {
      const removeFavorites = storage
        .filter((favorite) => favorite.name !== dataPokemon.name);
        localStorage.setItem('favorites', JSON.stringify(removeFavorites));
      setMessageAdd('Removido dos Favoritos');
      setTimeout(() => {
        setMessageAdd('');
      }, 2000);
    }
  };

  const numberZero = (id) => {
    if (id > 99) return id;
    if (id >= 10) return `0${id}`;
    return `00${id}`;
  };
  
  return (
    <div
      className="flex flex-col relative items-center justify-center transition duration-1000"
      >
      <label htmlFor={`favorite-${id}`} className="absolute right-0 top-0 mt-2 mr-1 sm:mr-0 sm:mt-2 z-10 w-full">
        <div className={`${check ? 'bg-green-400': 'bg-blue-400'} input mx-2 rounded-full w-10 h-5 transition-all duration-500 absolute right-0`}>
          <div className={`${check ? 'right-0': 'left-0'} absolute w-1/2 h-full bg-white rounded-full transition-all duration-500`} />
        </div>
        <input
          id={`favorite-${id}`}
          type="checkbox"
          checked={check}
          onChange={ (e) => { addFavorite(e.target.checked) } }
          className="sm:w-10 sm:h-5 hidden"
        />
      </label>
      { 
      Object.values(searchByName).length === 0
      ? <div
          className="w-full flex flex-col relative items-center justify-center transition duration-500 h-60"
        >
          <Loading />
        </div>
      : <Link
          to={`/pokemon/${id}`}
          className="w-full flex flex-col relative items-center justify-center  transition duration-500"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pokemonCards}
          custom={id}
        >
        { Object.values(searchByName.sprites.other)[2].front_default ? retornaImagem(): <Loading /> }
        <p className="pb-2 text-1xl w-full text-gray-700">
          <span className="pr-1">{'Nº'}</span>
          <span>{ numberZero(id) }</span>
        </p>
        <p className="pb-1 text-2xl w-full">
          {letraMaiuscula(name)}
        </p>
        <div className="flex items-center pb-5 w-full">
          { 
            type1 && !type2
            ? <img
                src={require(`../imagens/types/${type1}2.jpeg`)}
                alt=""
                className="w-1/3 object-contain rounded"
              />
            : type1 && type2 && 
              <div className="flex items-center w-full">
                  <img src={require(`../imagens/types/${type1}2.jpeg`)} alt="" className="w-1/3 object-contain rounded mr-1" />
                  <img src={require(`../imagens/types/${type2}2.jpeg`)} alt="" className="w-1/3 object-contain rounded" />
              </div>
          }
        </div>
      </Link>
      }
    </div>
  );
}

Pokemon.propTypes = {
  letraMaiuscula: PropTypes.func.isRequired,
  numeroDoPokemon: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  lista: PropTypes.string.isRequired,
};