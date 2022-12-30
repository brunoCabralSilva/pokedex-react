import React, { useContext, useEffect } from 'react';
import contexto from '../../context';
import { getByGeneration, getGeneralist } from '../../fetchs';
import Pokemon from '../Pokemon';
import Guide from '../Guide';

export default function Generation() {
  const context = useContext(contexto);
  const {
    gen,
    setGen,
    setFirstPage,
    setLoadingPokemon,
    lastSelectedGen,
    setLastSelectedGen,
    listGenerationDisplayed,
    setListGenerationDisplayed,
    listGeneration,
    setListGeneration,
    NUMBERBYPAGE,
  } = context;

  useEffect(() => {
    setFirstPage(1);
  }, []);

  const queryMorePokemon = async(list, setListDisplayed) => {
    setLoadingPokemon(true);
    let last = [];
    for (let i = 0; i < NUMBERBYPAGE; i += 1) {
      last.push(list[i]);
    }
    let listItems = await Promise.all(
      last.map(async (item) => await getGeneralist(item.url)));
      console.log(listItems);
      setListDisplayed(listItems);
      setTimeout(() => {
        setLoadingPokemon(false);
      }, 500);
  };

  const searchByGen = async () => {
      setFirstPage(1);
      setListGeneration([]);
      const call = await getByGeneration(gen);
      const genSort = call.sort((a, b) => a.id - b.id );
      setListGeneration(genSort);
      const selectGeneration = document.getElementById('select-generation');
      selectGeneration.selectedIndex = '1';
      setLastSelectedGen(gen);
      setGen('1');
      queryMorePokemon(genSort, setListGenerationDisplayed)
  };

  const showDataGeneration = () => {
    if (lastSelectedGen !== '') {
      return (
        <div className="w-full pb-2 flex justify-center">
          <p className="py-14 text-marinho w-9/12 text-3xl h-full flex flex-col sm:flex-row items-center sm:p-0 sm:py-14 text-left">
            {listGeneration.length && `Total de Pokémon da ${lastSelectedGen}ª Geração: ${listGeneration.length}` }
          </p>
        </div>
      );
    }
  }

  return(
      <div className="flex flex-col items-center">
        <div className="w-9/12">
          <p className="mt-8 sm:mt-20 text-4xl sm:text-left pb-5 w-full bg-gradient-to-b">
            Pesquisando pela Geração
          </p>
          <p className="pt-5">
            Abaixo é possível pesquisar um Pokémon por sua Geração.
            Você também utilizar as outras abas acima para pesquisar Pokémon por nome, número ou tipo, ou ainda listar todos os pokémon por ordem numérica. 
          </p>
          <p className="pt-2">
            Escolha abaixo uma das gerações existentes de Pokémon. Ao clicar em buscar, serão listados todos os Pokémon pertencentes a ela.
          </p>
          <p className="pt-2">  
            Clicando em um Pokémon, será possível ver mais detalhes sobre ele. Além disso, caso você clique no botão que existe no canto superior direito de cada Pokémon, este será salvo na sua lista de Favoritos.
          </p>
          <p className="pt-2 pb-10">  
            Explore o quanto quiser e divirta-se!
          </p>
        </div>
        <div className="w-9/12 flex flex-col justify-start items-center mb-2">
          <div className="w-full flex flex-col items-start justify-center">
            <div className="w-full flex flex-row items-center justify-start">
              <select
                id="select-generation"
                className="border-2 border-marinho p-2 my-2 font-bold sm:mr-2 ml-0 w-11/12 sm:w-9/12 text-center"
                onChange={(e) => setGen(e.target.value)}
              >
                <option disabled selected>Geração</option>
                <option value="1">1º Geração</option>
                <option value="2">2º Geração</option>
                <option value="3">3º Geração</option>
                <option value="4">4º Geração</option>
                <option value="5">5º Geração</option>
                <option value="6">6º Geração</option>
                <option value="7">7º Geração</option>
                <option value="8">8º Geração</option>
              </select>
              <button
                type="button"
                className="rounded ml-1 w-2/12 sm:w-2/12 bg-anil text-marinho hover:bg-marinho hover:text-anil transition-colors duration-500 border-2 border-marinho p-2 sm:my-2"
                onClick={ () => searchByGen() }
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            { listGeneration.length === 0 && <div className="w-full mb-20 sm:mb-28 sm:mt-14" /> }
          </div>
        </div>
        <div>
          { showDataGeneration() }
          <div className="w-full flex flex-col items-center">
            <div className={ listGeneration.length === 0 ? 'hidden' : '' }>
              <Guide
                className={ listGeneration.length === 0 && 'hidden' }
                list={listGeneration}
                listDisplayed={setListGenerationDisplayed}
                position="top"
              />
            </div>
            <div className="w-9/12 p-1 gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
              {
                listGenerationDisplayed.length > 0 && listGenerationDisplayed
                .sort((a, b) => Number(a.id) - Number(b.id))
                .map((poke, index) => (
                  <Pokemon
                    key={index}
                    className="w-full"
                    name={poke.name}
                    id={poke.id}
                    dataPokemon={poke}
                  />
                ))
              }
            </div>
            <div className={ listGeneration.length === 0 ? 'hidden' : '' }>
              <Guide
                list={listGeneration}
                listDisplayed={setListGenerationDisplayed}
                position="bottom"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }