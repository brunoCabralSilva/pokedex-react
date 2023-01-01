import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import contexto from '../context';
import { getByName }  from '../fetchs';
import Loading from './Loading';

export default function Pokemon (props) {
  const [altura, setAltura] = useState('');
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const [messageAdd, setMessageAdd] = useState('');
  const [searchByName, setSearchByName] = useState({});
  const [check, setCheck] = useState(false);
  const context = useContext(contexto);
  const {
    addFavorite,
    team,
    setTeam,
    letraMaiuscula,
    loadingPokemon,
    setListFavorites,
  } = context;

  
  const { name, id, teams, type } = props;

  const search = async () => {
    const searchBy = await getByName(id);
    setSearchByName(searchBy);
    const typeList = await searchBy.types.map((item) => item.type.name);
    setType1(typeList[0]);
    setType2(typeList[1]);
    let locStorage = JSON.parse(localStorage.getItem('favorites'));
    if (locStorage === null) {
      setListFavorites([]);
      setCheck(false);
    } else {
      setListFavorites(JSON.parse(localStorage.getItem('favorites')));
      const verification = locStorage
        .filter((fav) => fav.name === searchBy.name);
      if(verification.length > 0)  setCheck(true);
      else setCheck(false);
    }
  };

  useEffect(() => {
    setType1('');
    setType2('');
    search();
    
    if(type === 'moves') {
      setAltura("h-64 sm1:h-72 sm2:h-96 sm3:h-100 sm:h-56 md:h-48 md2:h-60 lg:h-80 2xl:h-96");
    } else if(type === 'team') {
      setAltura("h-54 sm1:h-60 sm2:h-80 sm3:h-96 sm:h-44 md:h-44 md2:h-60 lg:h-80 2xl:h-110");
    } else {
    setAltura("h-68 sm1:h-72 sm2:h-80 sm3:h-96 sm:h-40 md:h-48 md2:h-60 lg:h-60 2xl:h-80");
    }
  }, []);

  useEffect(() => {
    console.log('entrou')
    search();
  });

  const isOfTeam = (name) => {
    let storage = JSON.parse(localStorage.getItem('teams'));
    if (storage === null) {
      storage = [];
    }
    const search = storage.filter((item) => item.name === name);
    if (search.length > 0) {
      return true
    } else {
      return false;
    }
  };

  const retornaImagem = (name) => {    
    return (
      <div className={`w-full h-full relative flex items-center col-span-1 ${ isOfTeam(name) ? 'bg-gradient-to-t from-anil via-marinho/80 to-marinho' : 'bg-gradient-to-t from-anil via-anil/60 to-anil/10'}`}>
        <p className="text-marinho absolute bottom-0 w-full text-center pb-2 pt-4 font-bold bg-gradient-to-t from-anil via-anil/60 to-anil/10">{ messageAdd }</p>
        <img
          src={Object.values(searchByName.sprites.other)[2].front_default} 
          className={`w-11/12 sm:w-full rounded-lg p-5`} alt={name}
        />
      </div>
    );
  };

  const addRemoveFavorite = (checked) => {
    addFavorite(checked, searchByName);
    setCheck(checked);
    if (checked) {
      setMessageAdd('Adicionado aos Favoritos');
      setTimeout(() => {
        setMessageAdd('');
      }, 2000);
    } else {
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

  const addToTeam = async () => {
    let storage = JSON.parse(localStorage.getItem('teams'));
    if (storage === null) {
      storage = [];
    }
    const search = team.filter((item) => item.name === searchByName.name);
    if (search.length > 0) {
      const search = team.filter((item) => item.name !== searchByName.name);
      localStorage.setItem('teams', JSON.stringify(search));
      setTeam(search);
    } else if(team.length === 6) {
      window.alert("Você já possui seis pokémon no seu time. Remova algum deles para inserir um novo");
    } else {
      localStorage.setItem('teams', JSON.stringify([...team, searchByName]));
      setTeam([...team, searchByName]);
    }
  };
  
  return (
    <div
    className="w-full flex flex-col relative items-center transition duration-1000"
    >
      { 
      loadingPokemon ? 
      <div className={`flex items-center justify-center text-marinho relative bottom-0 w-full text-center pb-2 pt-4 font-bold bg-gradient-to-t ${altura} from-anil via-anil/60 to-anil/10`}>
        <img
          src={require('../imagens/all/001.png')}
          alt="opacity 0"
          className="opacity-0 absolute"
        />
        <Loading />
      </div> 
      :<div className="">
      <label htmlFor={`favorite-${id}`} className="absolute right-0 top-0 mt-2 mr-1 sm:mr-0 sm:mt-2 z-10 w-full">
        <div className={`${check ? 'bg-green-400': 'bg-blue-400'} input mx-2 rounded-full w-10 h-5 transition-all duration-500 absolute right-0`}>
          <div className={`${check ? 'right-0': 'left-0'} absolute w-1/2 h-full bg-white rounded-full transition-all duration-500`} />
        </div>
        <input
          id={`favorite-${id}`}
          type="checkbox"
          checked={check}
          onChange={ (e) => { addRemoveFavorite(e.target.checked) } }
          className="sm:w-10 sm:h-5 hidden"
        />
      </label>
      { 
      Object.values(searchByName).length === 0
      ? <div
          className="w-full flex flex-col relative items-center justify-center transition duration-500 h-68 sm1:h-72 sm2:h-80 sm3:h-96 sm:h-40 md:h-48 md2:h-60 lg:h-60 2xl:h-80"
        >
          <img
            src={require('../imagens/all/001.png')}
            alt="opacity 0"
            className="opacity-0 absolute"
          />
          <Loading />
        </div>
      : <div>
        <Link
          to={`/pokemon/${id}`}
          className="w-full flex flex-col relative items-center justify-center  transition duration-500"
        >
        <div className={`w-full ${altura} bg-gradient-to-t from-anil via-anil/60 to-anil/10 flex items-center`}>
        {
          Object.values(searchByName.sprites.other)[2].front_default
            ? retornaImagem(searchByName.name)
            : 
            <div className="relative w-full h-68 sm1:h-72 sm2:h-80 sm3:h-96 sm:h-40 md:h-48 md2:h-60 lg:h-60 2xl:h-80 flex items-center justify-center">
              <img
                src={require('../imagens/all/001.png')}
                alt="opacity 0"
                className="opacity-0 absolute"
              />
              <Loading />
            </div> }
        </div>
        <p className="pb-2 text-1xl w-full text-gray-700">
          <span className="pr-1">{'Nº'}</span>
          <span>{ numberZero(id) }</span>
        </p>
        <p className="pb-1 text-2xl w-full">
          {letraMaiuscula(searchByName.name)}
        </p>
        <div className="flex flex-col items-start w-full">
          { 
            type1 && !type2
            ? <img
                src={require(`../imagens/types/${type1}2.jpeg`)}
                alt=""
                className="w-1/3 object-contain rounded"
              />
            : type1 && type2 && 
              <div className={`flex items-center w-full ${!teams && 'pb-8'}`}>
                <img src={require(`../imagens/types/${type1}2.jpeg`)} alt="" className="w-1/3 object-contain rounded mr-1" />
                <img src={require(`../imagens/types/${type2}2.jpeg`)} alt="" className="w-1/3 object-contain rounded" />
              </div>
          }
        </div>
      </Link>
        {
          teams &&
          <button 
            type="button"
            onClick={ () => addToTeam() }
            className="w-full mt-2 object-contain rounded border-2 border-marinho p-2 bg-white hover:bg-anil transition-all duration-500 mb-5">
            { isOfTeam(name) ? "Remover do time" : "Adicionar ao time" }
          </button>
        }
      </div>
      }
      </div>
      }
    </div>
    );
}