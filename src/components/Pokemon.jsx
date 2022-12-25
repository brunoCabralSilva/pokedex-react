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
    return <img src={Object.values(searchByName.sprites.other)[2].front_default} className="w-8/12" alt={name} />;
  };

  const addFavorite = (checked) => {
    let storage = JSON.parse(localStorage.getItem('favorites'));
    if (storage === null) {
      storage = [];
    }
    setCheck(checked);
    if (checked) {
      localStorage.setItem('favorites', JSON.stringify([...storage, dataPokemon]));
      setMessageAdd(
        <div className="p-3 z-20 absolute w-full h-full flex items-center justify-center text-white text-xl font-bold text-center bg-black/80">
          Adicionado aos Favoritos
        </div>
      );
      setTimeout(() => {
        setMessageAdd('');
      }, 2000);
    } else {
      const removeFavorites = storage
        .filter((favorite) => favorite.name !== dataPokemon.name);
        localStorage.setItem('favorites', JSON.stringify(removeFavorites));
      setMessageAdd(
        <div className="z-20 absolute w-full h-full flex items-center justify-center text-white text-xl font-bold text-center bg-black/80">
          Removido dos Favoritos
        </div>
      );
      setTimeout(() => {
        setMessageAdd('');
      }, 2000);
    }
  };
  
  return (
    <div
      to={`/pokemon/${id}`}
      className="flex flex-col relative items-center justify-center transition duration-1000"
      >
      <input
        type="checkbox"
        checked={check}
        onChange={ (e) => { addFavorite(e.target.checked) } }
        className="sm:w-10 z-10 sm:h-5 absolute right-0 top-0 mt-1 mr-1 sm:mr-0 sm:mt-3" />
      <div className="absolute w-full h-full flex items-center justify-center text-white text-xl font- text-center">
        { messageAdd }
      </div>
      { 
      Object.values(searchByName).length === 0
      ? <div
          className="w-full flex flex-col relative items-center justify-center bg-half-transp hover:bg-min-transp transition duration-500 h-60"
        >
          <Loading />
        </div>
      : <Link
        to={`/pokemon/${id}`}
        className="w-full flex flex-col relative items-center justify-center bg-half-transp hover:bg-min-transp transition duration-500"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pokemonCards}
        custom={id}
      >
        { Object.values(searchByName.sprites.other)[2].front_default ? retornaImagem(): <Loading /> }
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