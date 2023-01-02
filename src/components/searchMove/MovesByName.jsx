import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import contexto from '../../context';
import Guide from '../Guide';
import Loading from '../Loading';

export default function MovesByName() {
  const [localName, setLocalName] = useState([]);
  const history = useHistory();
  const context = useContext(contexto);
  const {
    listAllMoves, letraMaiuscula, listOfAll, 
    setListOfAll, allListDisplayed, setAllListDisplayed, NUMBERBYPAGE,queryMorePokemon,
   } = context;

   useEffect(() => {
    setListOfAll([]);
    setAllListDisplayed([]);
  }, []);

  const getByNameNumber = async () => {
      try {
        const found = listAllMoves.filter((move) => move.name.includes(localName.toLowerCase()));
        if (found.length === 1) {
          setListOfAll([]);

          history.push(`/moves/${found[0].name}`);
        } else if (found.length === 0) {
          global.alert("Não foi possível encontrar este Pokémon! Reveja o número ou nome inserido ou tente novamente mais tarde!");
        } else {
          setListOfAll(found);
          let last = [];
        if (found.length <= 20) {
          for (let i = 0; i < found.length; i += 1) {
            last.push(found[i]);
          }
        } else {
          for (let i = 0; i < NUMBERBYPAGE; i += 1) {
            last.push(found[i]);
          }
        }
        queryMorePokemon(last, setAllListDisplayed);
        }
    } catch(error) {
      global.alert("Não foi possível encontrar este Pokémon! Reveja o número ou nome inserido ou tente novamente mais tarde!");
    }
    setLocalName('');
  };
  return(
    <div className="flex flex-col items-center">
        <div className="w-9/12">
          <p className="mt-8 sm:mt-20 text-4xl sm:text-left pb-5 w-full bg-gradient-to-b">
            Pesquisando um Movimento pelo Nome
          </p>
          <p className="pt-5">
            Abaixo é possível pesquisar um Movimento pelo seu nome.
            Você também utilizar as outras abas acima para pesquisar Movimentos por um tipo específico, ou ainda listar todos de uma vez por ordem alfabética.
          </p>
          <p className="pt-2">
            Digite a seguir um nome válido de um Movimento ou, caso não se lembre de seu nome exato, digite um trecho do seu nome, ambos em inglês. Caso mais de uma opção seja encontrada, exibiremos nesta página. Caso apenas um Movimento seja encontrado, você será direcionado para a página de detalhes dele.
          </p>
          <p className="pt-2 pb-10">  
            Explore o quanto quiser e divirta-se!
          </p>
        </div>
        <div className="w-9/12 flex-col items-center mb-20 sm:mb-28 sm:mt-5">
          <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-start">
            <input
              type="text"
              className="border-2 border-marinho p-2 my-2 sm:mr-2 ml-0 w-11/12 sm:w-9/12 text-center"
              value={localName}
              placeholder={`Digite o Nome ou o Nº do Pokémon:`}
              onChange={(e) => setLocalName(e.target.value) }
            />
            <button
              type="button"
              className="rounded w-11/12 sm:w-2/12 bg-anil text-marinho hover:bg-marinho hover:text-anil transition-colors duration-500 border-2 border-marinho p-2 sm:my-2"
              onClick={ () => getByNameNumber()}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div>
          {
          listOfAll.length > 0 &&
          <div>
            <div className="w-full flex justify-center px-1 my-1 sm:my-0">
              <p className="pt-14 pb-10 text-marinho w-full text-3xl h-full flex flex-col sm:flex-row items-center sm:p-0 sm:py-14 text-left">
                { `Total de Movimentos encontrados relacionados à pesquisa: ${listOfAll.length} ` }
              </p>
          </div>
          {
            listOfAll.length > 20 &&
              <Guide
                list={listAllMoves}
                listDisplayed={setAllListDisplayed}
                position="top"
              />
          }
          <div className="lg:px-5 pr-5 lg:pl-0 pb-5 w-full grid grid-cols-1 sm2:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            { 
              allListDisplayed.length > 0 ?
                allListDisplayed.map((move, index) => (
                  <Link
                    to={`/moves/${move.name}`}
                    type="button"
                    key={ index }
                    className={`h-20 flex items-center  justify-center px-2 py-3 font-bold border-2 rounded-2xl bg-white text-marinho transition-colors duration-500 hover:bg-marinho hover:text-white border-marinho text-center mr-1 my-1`}>
                    { letraMaiuscula(move.name) }
                  </Link>
                ))
              : <div className="h-50vh"><Loading /></div>
            }
          </div>
          {
            listOfAll.length > 20 &&
              <Guide
                list={listAllMoves}
                listDisplayed={setAllListDisplayed}
                position="top"
              />
          }
          </div>
        }
          </div>
        </div>
      </div>
    );
  }