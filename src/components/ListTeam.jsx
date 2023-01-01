import React, { useState, useContext, useEffect } from 'react';
import contexto from '../context';

export default function ListTeam({ list, setList }) {
  const context = useContext(contexto);
  const [ showMenu, setShowMenu] = useState(false);
  const {
    team, setTeam, letraMaiuscula,
  } = context;

  const deleteFromTeam = (name) => {
    const search = team.filter((item) => item.name !== name);
    localStorage.setItem('teams', JSON.stringify(search));
    setTeam(search);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('teams'))) {
      setTeam(JSON.parse(localStorage.getItem('teams')));
    }
  }, []);

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
      <div className={`${showMenu ? '' : 'hidden'} fixed top-0 right-0 w-full sm:w-2/5 md:2/5 lg:w-3/12 lg1:w-1/5 bg-marinho/80 h-screen z-30 border-l-2 border-marinho flex flex-col items-center justify-center`}>
        <div className="w-full flex flex-col items-center justify-center text-marinho text-lg">
          { list.length === 0 && JSON.parse(localStorage.getItem('teams'))
            ? <p className="font-bold text-xl text-white py-2 flex flex-col items-center w-9/12 my-2 px-4 text-center">
                <img
                  src={ require('../imagens/wallpaper/pokeball.jpg') } 
                  alt="pokébola"
                  className="w-20vw sm:w-5vw py-5 pt-10"
                />
                <span>
                  Você ainda não possui nenhum Pokémon no seu time.
                </span>
                <span className="pt-5">
                  Clique em "Adicionar ao time" em algum dos Pokémon de seu interesse para mudar isso!
                </span>
                <img
                  src={ require('../imagens/wallpaper/pokeball.jpg') } 
                  alt="pokébola"
                  className="w-20vw sm:w-5vw py-5 pt-10"
                />
              </p>
            : <p className="font-bold text-xl text-white py-2">
                <span className="pr-2">Seu Time</span>
                <span>{`( ${list.length === 0 && JSON.parse(localStorage.getItem('teams')) ? JSON.parse(localStorage.getItem('teams')).length : list.length } / 6 )`}</span>
              </p>
          }
          { 
          team.map((item) => (
          <div className="flex items-center justify-between border-2 w-9/12 my-2 sm1:w-2/3 sm0:w-1/2 sm:w-11/12">
            <img
              src={Object.values(item.sprites.other)[2].front_default}
              className="pl-1 h-10vh"
              alt={item.name}
            />
            <div className="flex flex-col items-start justify-center w-2/3 px-4">
              <p className="w-full text-left text-white font-bold">
                { letraMaiuscula(item.name) }
              </p>
              <div className="flex flex-col items-start w-full">
                { 
                  item.types[0].type.name && !item.types[1]
                  ? <img
                      src={require(`../imagens/types/${item.types[0].type.name}2.jpeg`)}
                      alt=""
                      className="w-1/3 object-contain rounded"
                    />
                  : item.types[0].type.name && item.types[1].type.name && 
                    <div className={`flex items-center w-full`}>
                      <img src={require(`../imagens/types/${item.types[0].type.name}2.jpeg`)} alt="" className="w-1/3 object-contain rounded mr-1" />
                      <img src={require(`../imagens/types/${item.types[1].type.name}2.jpeg`)} alt="" className="w-1/3 object-contain rounded" />
                    </div>
                }
              </div>
              <button
                type="button"
                className="px-3 py-1 my-1 w/full sm:w-2/3 text-sm bg-marinho/60 rounded text-white hover:bg-marinho duration-500 transition-colors"
                onClick={ () => deleteFromTeam(item.name) }
              >
                Remover
              </button>
            </div>
          </div>
        )) }
        </div>
      </div>
    </nav> 
  );
}