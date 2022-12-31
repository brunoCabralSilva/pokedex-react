import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import contexto from '../../context';
import Guide from '../Guide';
import Pokemon from '../Pokemon';
import { getGeneralist } from '../../fetchs';

export default function NameNumber() {
  const [localNameNumber, setLocalNameNumber] = useState([]);
  const history = useHistory();
  const context = useContext(contexto);
  const {
    numberPokemon,
    listOfAllPokemon,
    listOfAll, setListOfAll,
    allListDisplayed, setAllListDisplayed,
    setLoadingPokemon,
    NUMBERBYPAGE, setValueButton,
    setFirstPage,
  } = context;

  useEffect(() => {
    setFirstPage(1);
    setValueButton(1);
    setListOfAll([]);
    setAllListDisplayed([]);
  }, []);

  const queryMorePokemon = async(list, setListDisplayed) => {
    setLoadingPokemon(true);
    let listItems = await Promise.all(
      list.map(async (item) => await getGeneralist(item.url)));
      setListDisplayed(listItems);
      setTimeout(() => {
        setLoadingPokemon(false);
      }, 500);
  };

  const getByNameNumber = async () => {
    setValueButton(1);
    setAllListDisplayed([]);
    try {
      setListOfAll([]);
      const found = listOfAllPokemon.filter((poke) => poke.name.includes(localNameNumber.toLowerCase()));
      if (found.length === 1) {
        setListOfAll([]);
        const id = numberPokemon(found[0]);
        history.push(`/pokemon/${id}`);
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
    setLocalNameNumber('');
  };

  return(
    <div className="flex flex-col items-center">
      <div className="w-9/12">
        <p className="mt-8 sm:mt-20 text-4xl sm:text-left pb-5 w-full bg-gradient-to-b">
          Pesquisando por Nome ou Número
        </p>
        <p className="pt-5">
          Abaixo é possível pesquisar um Pokémon por nome ou número.
          Você também utilizar as outras abas acima para pesquisar Pokémon por geração ou tipo, ou ainda listar todos os pokémon por ordem numérica. 
        </p>
        <p className="pt-2">
          Digite a seguir um nome ou número válido de um Pokémon. Caso este Pokémon seja encontrado, você será direcionado para a página de detalhes dele.
        </p>
        <p className="pt-2 pb-10">  
          Explore o quanto quiser e divirta-se!
        </p>
      </div>
      <div className="w-9/12 flex-col items-center mb-20 sm:mb-28 sm:mt-14">
        <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-start">
          <input
            type="text"
            className="border-2 border-marinho p-2 my-2 sm:mr-2 ml-0 w-11/12 sm:w-9/12 text-center"
            value={localNameNumber}
            placeholder={`Digite o Nome ou o Nº do Pokémon:`}
            onChange={(e) => setLocalNameNumber(e.target.value) }
          />
          <button
            type="button"
            className="rounded w-11/12 sm:w-2/12 bg-anil text-marinho hover:bg-marinho hover:text-anil transition-colors duration-500 border-2 border-marinho p-2 sm:my-2"
            onClick={ () => { getByNameNumber(localNameNumber) }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
          {
            listOfAll.length > 0 &&
            <div>
              <div className="w-full flex justify-center px-1 my-1 sm:my-0">
                <p className="pt-14 pb-10 text-marinho w-full text-3xl h-full flex flex-col sm:flex-row items-center sm:p-0 sm:py-14 text-left">
                  { `Total de Pokémon encontrados relacionados à pesquisa: ${listOfAll.length} ` }
                </p>
            </div>
              {
                listOfAll.length > 20 &&
                <Guide
                  list={listOfAll}
                  listDisplayed={setAllListDisplayed}
                  position="top"
                />
              }
              <div className="lg:px-5 pr-5 lg:pl-0 pb-5 w-full grid grid-cols-1 gap-3 p-1 sm:grid-cols-3 lg:grid-cols-4">
                { 
                  allListDisplayed.length > 0
                  ? allListDisplayed.map((poke, index) => (
                    <Pokemon
                      key={index}
                      className="w-full"
                      name={poke.name}
                      id={numberPokemon(poke)}
                      dataPokemon={poke}
                    />
                  ))
                  : <div className="h-screen" />
                }
              </div>
              {
                listOfAll.length > 20 &&
                <Guide
                  list={listOfAll}
                  listDisplayed={setAllListDisplayed}
                  position="bottom"
                />
              }
            </div>
          }
      </div>
    </div>
  );
}