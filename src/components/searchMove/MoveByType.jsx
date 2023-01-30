import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contexto from '../../context';
import AllDataTypes from '../AllDataTypes';
import { getAllTypes, getByType } from '../../fetchs';

export default function MovesByType() {
  const [allTheTypes, setAllTheTypes] = useState([]);
  const [hiddeTypes, setHiddeTypes] = useState(false);
  const context = useContext(contexto);
  const {
    letraMaiuscula,
    listTypeMove, setListTypeMove,
    typeMove, setTypeMove,
    messageTypesMove, setMessageTypesMove,
  } = context;

  useEffect(() => {
    setTypeMove('');
    const listTypes = async () => {
      const types = await getAllTypes();
      setAllTheTypes(types.results);
    };
    listTypes();
  }, []);

  const searchByType = async () => {
    setListTypeMove([]);
    setHiddeTypes(true);
      const allByType = await getByType(AllDataTypes(typeMove).type);
      setListTypeMove(allByType.moves.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      }));
    setMessageTypesMove(typeMove);
    setTypeMove('');
  };

  return (
    <div className={`flex flex-col items-center w-full ${hiddeTypes && 'min-h-70vh'}`}>
      <div className="w-9/12">
          <p className="mt-8 sm:mt-20 text-4xl sm:text-left pb-5 w-full bg-gradient-to-b">
            Pesquisando um Movimento pelo Tipo
          </p>
          <p className="pt-5">
            Abaixo é possível pesquisar um Movimento por seu tipo.
            Você também utilizar as outras abas acima para pesquisar Movimentos por nome ou ainda listar todos de uma vez por ordem alfabética. 
          </p>
          <p className="pt-2">  
            Clicando em um Movimento, será possível ver mais detalhes sobre ele.
          </p>
          <p className="pt-2 pb-10">  
            Explore o quanto quiser e divirta-se!
          </p>
        </div>
      <div
        className={`border-2 border-anil px-5 py-5 gap-2 w-9/12 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 ${hiddeTypes && 'hidden'}`}
        onChange={(e) => setTypeMove(e.target.value)}
      >
        {
          allTheTypes.length > 0 && allTheTypes.map((resultados, index) => {
            const { name } = resultados;
            if (name === 'unknown' || name === 'shadow') {
              return null;
            }
            return (
              <div
                className={`px-2 py-2 rounded-full flex items-center sm3:justify-start justify-center text-xl w-full h-full ${typeMove === name ? 'bg-anil/50 border-2 border-anil/50' : 'border-2 text-marinho'} `}
                key={index}
                onClick={() => setTypeMove(name)}
              >
                <div>{ AllDataTypes(name).image }</div>
                <p className="hidden sm3:flex pl-3">{AllDataTypes(name).name}</p>
              </div>
            );
          })
        }
      </div>
      <button
        type="button"
        className="w-9/12 px-1 mt-1"
        onClick={ () => setHiddeTypes(!hiddeTypes) }
        >
          <div
            className="bg-anil/80 text-black text-xl flex justify-between items-center p-4 w-full h-full bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500"
          >
            { hiddeTypes ? 'Exibir Tipos' : 'Minimizar Tipos' }
            <img
              src={ require(`../../imagens/arrow-${hiddeTypes ? 'down' : 'up'}.png`) }
              alt="seta"
              className="w-10"
            />
          </div>
      </button>
      <button
        type="button"
        className="w-9/12 p-1"
        onClick={ searchByType }
        >
          <div className="bg-anil/80 text-black text-xl flex justify-between items-center p-4 w-full h-full bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500">
            { `Buscar ${typeMove !== '' ? `Movimento do tipo ${AllDataTypes(typeMove).name}` : ''}` }
            <i className="fa-solid fa-magnifying-glass hidden sm:flex"></i>
          </div>
      </button>
      <div className="w-full flex justify-center px-1 my-1 sm:my-0">
          { 
            listTypeMove.length > 0 &&
              <p className="pt-14 pb-10 text-marinho w-9/12 text-3xl h-full flex flex-col sm:flex-row items-center sm:p-0 sm:py-14 text-left">
                { `Todos os Movimentos do tipo ${AllDataTypes(messageTypesMove).name} ${listTypeMove.length} ` }
              </p>
          }
      </div>
      <div className="p-1 w-9/12 gap-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 pb-10">
        { 
          listTypeMove.map((move, index) => (
            <Link
              to={`/moves/${move.name}`}
              type="button"
              key={ index }
              className={`h-24 flex flex-col items-center  justify-center font-bold border-2 ${AllDataTypes(messageTypesMove).class} rounded-2xl transition-colors duration-500 text-center hover:border-marinho`}>
              { letraMaiuscula(move.name) }
              <img src={require(`../../imagens/types/${messageTypesMove}.png`)} alt={messageTypesMove} className="rounded-b-xl w-10" />
            </Link>
          ))
        }
      </div>
        { listTypeMove.length > 10 &&
          <div className="w-9/12">
            <button
              type="button"
              className="px-1 w-full mb-1"
              onClick={ () => window.scrollTo(0, 0) }
            >
              <div className="bg-anil/80 text-black text-xl p-4 w-full h-full bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500">
                Voltar ao Topo
              </div>
            </button>
          </div>
        }
    </div>
  );
  }