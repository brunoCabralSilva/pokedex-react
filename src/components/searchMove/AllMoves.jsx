import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import contexto from '../../context';
import { getGeneralist } from '../../fetchs';

export default function AllMoves() {
  const [finish, setFinish] = useState(0);
  const context = useContext(contexto);
  const {
    listAllMoves, setListAllMoves,
    listMovesDisplayed, setListMovesDisplayed,
    firstPositionLitMove, setFirstPositionLitMove,
    letraMaiuscula,
  } = context;

  const displayedMoves = async (use) => {
    if (listMovesDisplayed.length + 20 > listAllMoves.length) {
      let last = [];
      for (let i = firstPositionLitMove; i < listAllMoves.length - listMovesDisplayed.length; i += 1) {
        last.push(listAllMoves[i]);
      }
      queryMoveDetails(last);
      setFinish(true);
    } else {
      let last = [];
      for (let i = firstPositionLitMove; i < firstPositionLitMove + 20; i += 1) {
        last.push(listAllMoves[i]);
      }
      setFirstPositionLitMove(firstPositionLitMove + 20);
      queryMoveDetails(last);
    } 
  };

  useEffect(() => {
    const seedListMoves = async () => {
        if (listAllMoves.length === 0) {
          const allMoves = await getGeneralist('https://pokeapi.co/api/v2/move?offset=1&limit=1000');
          const allMovesSorted = await allMoves.results
            .sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            });
          setListAllMoves(allMovesSorted);
          let last = [];
            for (let i = 0; i < 20; i += 1) {
            last.push(allMovesSorted[i]);
          }
          setFirstPositionLitMove(20);
          queryMoveDetails(last);
      };
    };
    seedListMoves();
  }, []);

  const queryMoveDetails = async(list) => {
    let listItems = await Promise.all(
      list.map(async (item) => await getGeneralist(item.url)));
      if (listMovesDisplayed.length > 0) {
      setListMovesDisplayed([...listMovesDisplayed, ...listItems]);
    } else {
      setListMovesDisplayed(listItems);
    }
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <div className="w-9/12">
        <p className="mt-8 sm:mt-20 text-4xl sm:text-left pb-5 w-full bg-gradient-to-b">
          Bem vindo à página de Movimentos de Pokémon!
        </p>
        <p className="pt-5">
          Abaixo serão listados todos Movimentos ordenados alfabeticamente.
          Você também utilizar as outras abas acima para pesquisar Movimentos por nome ou tipo específico. 
        </p>
        <p className="pt-2">  
          Clicando em um Movimento, será possível ver mais detalhes sobre ele.
        </p>
        <p className="pt-2 pb-10">  
          Explore o quanto quiser e divirta-se!
        </p>
      </div>
      <div className="w-9/12 flex flex-row items-left justify-center">
        { console.log(listMovesDisplayed)}
        {
          listMovesDisplayed.length > 0 &&
          <div className="lg:px-5 pr-5 lg:pl-0 pb-5 w-full grid grid-cols-1 sm2:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            { 
              listMovesDisplayed.map((move, index) => (
                <Link
                  to={`/moves/${move.name}`}
                  type="button"
                  key={ index }
                  className={`h-20 flex items-center  justify-center px-2 py-3 font-bold border-2 rounded-2xl bg-white text-marinho transition-colors duration-500 hover:bg-marinho hover:text-white border-marinho text-center mr-1 my-1`}>
                  { letraMaiuscula(move.name) }
                </Link>
            ))
            }
          </div>
        }
      </div>
      <div className="w-9/12">
        <button
          type="button"
          className={`px-1 w-full ${ finish && 'hidden' }`}
          onClick={ displayedMoves }
        >
          <div className="bg-anil/80 text-black text-xl p-4 w-full h-full bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500">
            Mais Movimentos
          </div>
        </button>
        <button
          type="button"
          className="p-1 w-full mb-1"
          onClick={ () => window.scrollTo(0, 0) }
        >
          <div className="bg-anil/80 text-black text-xl p-4 w-full h-full bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500">
            Voltar ao Topo
          </div>
        </button>
      </div>
    </div>
  );
  }
