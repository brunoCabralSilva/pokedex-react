import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import contexto from '../../context';
import imageType from '../Types';
import data from '../../fetchs';
import Pokemon from '../Pokemon';
const { allTypes, getByType } = data;

export default function Type() {
  const [allTheTypes, setAllTheTypes] = useState([]);
  const [type, setType] = useState([]);
  const [hiddeTypes, setHiddeTypes] = useState(false);
  const history = useHistory();
  const context = useContext(contexto);
  const {
    letraMaiuscula,
    setListType,
    listType,
    numberPokemon,
  } = context;

  useEffect(() => {
    const listTypes = async () => {
      const types = await allTypes();
      setAllTheTypes(types.results);
    };
    listTypes();
  }, []);

  const returnMessageButton = () => {
    if (type.length === 1) {
      const message = `Buscar Pokémon do tipo ${returnTypeByNumber(type[0])}`;
      return message;
    } else if (type.length === 2) {
      const message = `Buscar Pokémon do tipo ${returnTypeByNumber(type[0])} e ${returnTypeByNumber(type[1])}`;
      return message;
    } else return 'Buscar';
  }

  const addType = (name) => {
    if(type.includes(imageType(name).type.toString())) {
      if (type.length === 1) {
        setType([]);
      } else {
        const att = type.filter((f) => (f) !== imageType(name).type.toString());
        setType(att);
      }
    } else if (type.length >= 2) {
      global.alert('Não existem pokémon com três tipos: Remova um dos dois tipos selecionados ou realize a pesquisa com os dois tipos já escolhidos.');
    } else {
      setType(prevState => [...prevState, imageType(name).type.toString()]);
    }
  };

  const returnTypeByNumber = (number) => {
    switch(number) {
      case '1':
        return 'Normal';
      case '2':
        return 'Lutador';
      case '3':
        return 'Voador';
      case '4':
        return 'Venenoso';
      case '5':
        return 'Terrestre';
      case '6':
        return 'Pedra';
      case '7':
        return 'Inseto';       
      case '8':
        return 'Fantasma';
      case '9':
        return 'Aço';
      case '10':
        return 'Fogo';
      case '11':
        return 'Água';
      case '12':
        return 'Grama';
      case '13':
        return 'Elétrico';
      case '14':
        return 'Psíquico';
      case '15':
        return 'Gelo';
      case '16':
        return 'Dragão';
      case '17':
        return 'Sombrio';
      case '18':
        return 'Fada';
      default: return null;
    }
  }

  const searchByType = async () => {
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
        const arrayTipos = all.filter((tipo) => Number(tipo.id) <= 898);
        setListType(arrayTipos);
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
      const arrayTipos = all.filter((tipo) => Number(tipo.id) <= 898);
      setListType(arrayTipos);
    }
    setType([]);
  };

  return (
    <div className="flex flex-col w-full min-h-75vh">
      <div
        className={`px-1 py-2 w-full grid grid-cols-4 ${hiddeTypes && 'hidden'}`}
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
              <div className="p-1 w-full">
                <div
                  className={`flex flex-col items-center sm3:justify-start justify-center text-white font-bold p-2 w-full h-full ${type.includes(id) ? 'bg-black border-2 border-white' : 'bg-black/60 hover:bg-black/70'} `}
                  key={index}
                  onClick={() => addType(name)}
                >
                  { imageType(name).image }
                  <p className="hidden sm3:flex pl-2">{letraMaiuscula(name)}</p>
                </div>
              </div>
            );
          })
        }
      </div>
      <button
        type="button"
        className="w-full px-2 mt-2"
        onClick={ () => setHiddeTypes(!hiddeTypes) }
        >
          <div
            className=" bg-black/70 text-white flex items-center justify-between text-xl p-4 font-bold hover:border-2 hover:border-white w-full h-full"
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
        className="w-full p-2 mb-2"
        onClick={ searchByType }
        >
          <div className="bg-black/70 text-white text-xl p-4 font-bold hover:border-2 hover:border-white w-full h-full flex items-center justify-between">
            { returnMessageButton() }
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
      </button>
      <div className="w-full grid grid-cols-4">
        {
          listType.length !== 1
            ? listType.length > 0 && listType.map((poke, index) => (
              <Pokemon
                key={index}
                className="w-full"
                name={poke.name}
                id={numberPokemon(poke)}
              />
            ))
            : history.push(`/pokemon/${listType[0].id}`)
          }
        </div>
          <div className={`w-full grid grid-cols-1 ${listType.length < 20 && 'hidden'}`}>
            <button
              type="button"
              className="p-1 w-full mb-4"
              onClick={ () => window.scrollTo(0, 0) }
            >
              <div className="bg-black/70 text-white text-xl p-4 font-bold hover:border-2 hover:border-white w-full h-full">
                Voltar ao Topo
              </div>
            </button>
          </div>
    </div>
  );
  }