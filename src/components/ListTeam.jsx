import React, { useState, useEffect, useContext } from 'react';
import { Link } from  'react-router-dom';
import contexto from '../context';

export default function ListTeam() {
  const context = useContext(contexto);
  const [list, setList] = useState([]);
  const [ showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    let locStorage = JSON.parse(localStorage.getItem('teams'));
    if (!locStorage) setList([]);
    else setList(locStorage);
  }, []);

  const {
    team, setTeam, numberPokemon, letraMaiuscula,
  } = context;

  const returnList = () => {
    const returnList = list.map((item) => {
      let number = numberPokemon(item);
      if (Number(number) < 10) number = `00${number}`;
      else if (Number(number) < 100) number = `0${number}`;
      return (<div>
        <img
          src={require(`../imagens/all/${number}.png`)}
          className="w-20"
          alt={item.name}
        />
        <p className="w-full text-center">{ letraMaiuscula(item.name) }</p>
      </div>);
    });
    return returnList;
  }

  return (
    <nav className="w-full absolute h-7vh bg-white 2xl:text-xl leading-6 flex flex-col justify-center items-end px-2 sm:px-4">
      <div
        onClick={ () => { setShowMenu(!showMenu) }}
        className={`z-50 ${showMenu ? 'fixed' : ''}`}
      >
        <button
          type="button"
          className="fixed bottom-0 right-0 p-5"
        >
          <img
            src={require(`../imagens/arrow-${showMenu ? 'right' : 'left'}.png`)}
            className="w-10 rounded-full bg-anil border-2 border-marinho p-1"
            alt=""
          />
        </button>
      </div>
      {
        showMenu && 
        <div className="sm:pt-7vh fixed top-0 right-0 w-full sm:w-2/5 md:w-3/12 bg-marinho/80 h-screen z-30 border-l-2 border-marinho flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center pt-7vh text-marinho text-lg">
            {
              list.length > 0
              ? list.map((item) => (
                  <div>
                    <img
                      src={require(`../imagens/all/001.png`)}
                      className="w-20"
                      alt={item.name}
                    />
                    <p className="w-full text-center">{ letraMaiuscula(item.name) }</p>
                  </div>
                ))
              : 'Nenhum encontrado'
            }
          <img
              src={ require('../imagens/wallpaper/pokeball.jpg') } 
              alt="pokébola"
              className="w-20vw sm:w-5vw py-5 pt-10"
            />
          </div>
        </div>
      }
    </nav> 
  );
}