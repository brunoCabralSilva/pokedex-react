import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import contexto from '../../context';
import AllDataTypes from '../AllDataTypes';
import { getAllTypes, getByType, getGeneralist } from '../../fetchs';
import Pokemon from '../Pokemon';
import Guide from '../Guide';

export default function Type() {
  const [allTheTypes, setAllTheTypes] = useState([]);
  const [hiddeTypes, setHiddeTypes] = useState(false);
  const history = useHistory();
  const context = useContext(contexto);
  const {
    type,
    setType,
    loadingPokemon,
    messageTypes,
    setMessageTypes,
    setLoadingPokemon,
    NUMBERBYPAGE,
    setValueButton,
    listOfAll, setListOfAll,
    allListDisplayed, setAllListDisplayed,
    setListOfAllPokemonDisplayed,
    
  } = context;

  useEffect(() => {
    setListOfAllPokemonDisplayed([]);
    setListOfAll([]);
    setAllListDisplayed([]);
    const listTypes = async () => {
      const types = await getAllTypes();
      setAllTheTypes(types.results);
    };
    listTypes();
  }, []);

  const queryMorePokemon = async(list, setListDisplayed) => {
    setLoadingPokemon(true);
    console.log('list', list);
    let listItems = await Promise.all(
      list.map(async (item) => await getGeneralist(item.url)));
      setListDisplayed(listItems);
      setTimeout(() => {
        setLoadingPokemon(false);
      }, 500);
  };

  const returnMessageButton = () => {
    if (type.length === 1) {
      const message = `Buscar Pokémon do tipo ${AllDataTypes(type[0]).name}`;
      return message;
    } else if (type.length === 2) {
      const message = `Buscar Pokémon do tipo ${AllDataTypes(type[0]).name} e ${AllDataTypes(type[1]).name}`;
      return message;
    } else return 'Buscar';
  };

  const addType = (name) => {
    if(type.includes(AllDataTypes(name).type.toString())) {
      if (type.length === 1) {
        setType([]);
      } else {
        const att = type.filter((f) => (f) !== AllDataTypes(name).type.toString());
        setType(att);
      }
    } else if (type.length >= 2) {
      global.alert('Não existem pokémon com três tipos: Remova um dos dois tipos selecionados ou realize a pesquisa com os dois tipos já escolhidos.');
    } else {
      setType(prevState => [...prevState, AllDataTypes(name).type.toString()]);
    }
  };

  const searchByType = async () => {
    setValueButton(1);
    setLoadingPokemon(true);
    setAllListDisplayed([]);
    setListOfAll([]);
    setHiddeTypes(true);
    if(type.length !== 1) {
    const type1 = await getByType(type[0]);
    const type2 = await getByType(type[1]);
      if(type1) {
        const pokemonTwoTypes = type1.pokemon.filter((x) => {
          const pokemonType2 = type2.pokemon.find((f) => f.pokemon.name === x.pokemon.name);
          if(pokemonType2 !== undefined) return pokemonType2;
          return null;
        });
        const all = pokemonTwoTypes.map((poke) => {
          const numero = poke.pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", '');
          const number = numero.replace('/', '');
          const objPokemon = {
            name: poke.pokemon.name,
            url: poke.pokemon.url,
            id: number,
          };
          return objPokemon;
        });
        setListOfAll(all);
        let last = [];
        if (all.length <= 20) {
          for (let i = 0; i < all.length; i += 1) {
            last.push(all[i]);
          }
        } else {
          for (let i = 0; i < NUMBERBYPAGE; i += 1) {
            last.push(all[i]);
          }
        }
        queryMorePokemon(last, setAllListDisplayed);
      }
    } else {
      const allByType = await getByType(type[0]);
      const all = allByType.pokemon.map((poke) => {
        const numero = poke.pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", '');
        const number = numero.replace('/', '');
        const objPokemon = {
          name: poke.pokemon.name,
          url: poke.pokemon.url,
          id: number
        };
        return objPokemon;
      });
      setListOfAll(all);
        let last = [];
        if (all.length <= 20) {
          for (let i = 0; i < all.length; i += 1) {
            last.push(all[i]);
          }
        } else {
          for (let i = 0; i < NUMBERBYPAGE; i += 1) {
            last.push(all[i]);
          }
        }
        queryMorePokemon(last, setAllListDisplayed);
    }
    setType([]);
    returnMessageSearch();
  };

  const returnMessageSearch = () => {
    if (type.length === 1) {
      setMessageTypes(`Total de Pokémon do tipo ${AllDataTypes(type[0]).name}:`);
    } else if (type.length === 2) {
      setMessageTypes(`Total de Pokémon do tipo ${AllDataTypes(type[0]).name} e ${AllDataTypes(type[1]).name}:`);
    }
  };

  return (
    <div className={`flex flex-col items-center w-full ${hiddeTypes && 'min-h-70vh'}`}>
      <div className="w-9/12">
          <p className="mt-8 sm:mt-20 text-4xl sm:text-left pb-5 w-full bg-gradient-to-b">
            Pesquisando pelo Tipo
          </p>
          <p className="pt-5">
            Abaixo é possível pesquisar um Pokémon por seu tipo.
            Você também utilizar as outras abas acima para pesquisar Pokémon por nome, número ou geração, ou ainda listar todos os pokémon por ordem numérica. 
          </p>
          <p className="pt-2">
            Escolha abaixo um ou dois tipos existentes de Pokémon. Ao clicar em buscar, serão listados todos os Pokémon pertencentes aos pré-requisitos da busca.
          </p>
          <p className="pt-2">  
            Clicando em um Pokémon, será possível ver mais detalhes sobre ele. Além disso, caso você clique no botão que existe no canto superior direito de cada Pokémon, este será salvo na sua lista de Favoritos.
          </p>
          <p className="pt-2 pb-10">  
            Explore o quanto quiser e divirta-se!
          </p>
        </div>
      <div
        className={`border-2 border-anil px-5 py-5 gap-2 w-9/12 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 ${hiddeTypes && 'hidden'}`}
        onChange={(e) => setType(e.target.value)}
      >
        {
          allTheTypes.length > 0 && allTheTypes.map((resultados, index) => {
            const id = resultados.url.replace('https://pokeapi.co/api/v2/type/', '').replace('/', '');
            const { name } = resultados;
            if (name === 'unknown' || name === 'shadow') {
              return null;
            }
            return (
              <div
                className={`px-2 py-2 rounded-full flex items-center sm3:justify-start justify-center text-xl w-full h-full ${type.includes(id) ? 'bg-anil/50 border-2 border-anil/50' : 'border-2 text-marinho'} `}
                key={index}
                onClick={() => addType(name)}
              >
                <div>{ AllDataTypes(name).image }</div>
                <p className="hidden sm3:flex pl-3">
                  {AllDataTypes(name).name}
                </p>
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
            { returnMessageButton() }
            <i className="fa-solid fa-magnifying-glass hidden sm:flex"></i>
          </div>
      </button>
      <div className="w-full flex justify-center px-1 my-1 sm:my-0">
          { listOfAll.length === 0
            ? loadingPokemon
              ? 
                <p className="py-14 text-marinho w-9/12 text-3xl h-full flex flex-col sm:flex-row items-center sm:p-0 sm:py-14 text-left">
                  Buscando Pokémon, Por favor aguarde.
                </p>
              : 
                ''
            : listOfAll.length === 0
              ?
                <p className="py-14 text-marinho w-9/12 text-3xl h-full flex flex-col sm:flex-row items-center sm:p-0 sm:py-14 text-left">
                  Nenhum Pokémon que corresponda a estes tipos foi encontrado.
                </p>
              : 
                <p className="py-14 text-marinho w-9/12 text-3xl h-full flex flex-col sm:flex-row items-center sm:p-0 sm:py-14 text-left">
                  { `${messageTypes} ${listOfAll.length} ` }
                </p>
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
      <div className="p-1 w-9/12 gap-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        {
          allListDisplayed.length !== 1
            ? allListDisplayed.length > 0 && allListDisplayed.map((poke, index) => (
              <Pokemon
                key={index}
                className="w-full"
                name={poke.name}
                id={poke.id}
                dataPokemon={poke}
              />
            ))
            : 
              history.push(`/pokemon/${allListDisplayed[0].id}`)
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
  );
  }