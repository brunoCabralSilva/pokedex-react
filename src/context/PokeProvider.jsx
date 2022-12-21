import { useState } from 'react';
import contexto from './index';
import data from '../fetchs';
import imageType from '../components/Types';
const { getByName, getByType, getByGeneration, getAllPokemon } = data;

export default function PokeProvider({ children }) {
  const [type, setAllType] = useState([]);
  const [listPokemon, setListPokemon] = useState([]);
  const [buttonOption, setButtonOption] = useState('all');
  const [ultimo, setUltimo] = useState([0]);
  const [first, setFirst] = useState(0);
  const [allItemsList, setAllItemsList] = useState([]);
  const [finish, setFinish] = useState(false);

  const twentyExibition = async (response, arrayTipos, buttonMessage) => {
     if(response !== 'more20' ) {
      let arrayGen = [];
      for(let i = 0; i <= 19; i += 1){
        arrayGen.push(arrayTipos[i]);
      }
      setListPokemon(arrayGen);
      setUltimo(19);
      setFinish(false);
      setButtonOption('type');
    } else {
        let arrayGen = [];
        setButtonOption('type');
        if (ultimo + 20 <= allItemsList.length - 1) {
          setFinish(false);
          for(let i = ultimo + 1; i <= ultimo + 20; i += 1){
            arrayGen.push(allItemsList[i]);
          }
          setListPokemon([...listPokemon, ...arrayGen]);
          setUltimo(ultimo + 20);
        } else {
          const valor = allItemsList.length - ultimo;
          for(let i = ultimo + 1; i < ultimo + valor; i += 1){
            arrayGen.push(allItemsList[i]);
          }
          setListPokemon([...listPokemon, ...arrayGen]);
          setUltimo(ultimo + 20);
          setFinish(true);
        }
      }

      if(allItemsList.length < 20) {
        setFinish(true);
      }
  }

  const searchByType = async (t) => {
    if(t !== 'more20' ) {
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
        setListPokemon(arrayTipos);
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
        setAllItemsList(arrayTipos);
        twentyExibition(t, arrayTipos, 'type');
        if(arrayTipos.length < 20) {
          setButtonOption('hidden');
        }
        setAllItemsList(arrayTipos);
      }} else {
        twentyExibition(type, [], 'more20');
  }
  setAllType([]);
}

const firstCall = async () => {
  const call = await getAllPokemon(first);
  if (listPokemon.length <= 20) {
    if (first + 20 < 898) {
      setList(call.results);
    } else {
      let last898 = [];
      for (let i = 0; i < 898 - first; i += 1) {
        last898.push(call.results[i]);
      }
      setList(last898);
    }
  }
};
  
  const setList = (list) => {
    setListPokemon(list);
  }

  const setFirstValor = (valor) => {
    setFirst(valor);
  }

  const setButton = (alternative) => {
    setButtonOption(alternative);
  }

  const moreTwentyForAll = async () => {
    const newFirst = first + 20;
    if(buttonOption === 'all') {
      const call = await getAllPokemon(newFirst);
      if (newFirst + 20 < 898) {
        setFirst(newFirst);
        setList([...listPokemon, ...call.results]);
        setFinish(false);
      } else {
        let last898 = [];
        for (let i = 0; i < 898 - newFirst; i += 1) {
          last898.push(call.results[i]);
        }
        setFirst(newFirst);
        setList([...listPokemon, ...last898]);
        setFinish(true);
      }
    }
  }

  const setTheFinish = (alternative) => {
    setFinish(alternative);
  }

  const addType = (name) => {
    if (name === 'all') {
      if(type.includes('all')) {
        const removeAll = type.filter((t) => t !== 'all');
        setAllType(removeAll);
      } else {
        setAllType(['all']);
      }
    } else {
        const removeAll = type.filter((t) => t !== 'all');
        setAllType(removeAll);
        if(type.includes(imageType(name).type.toString())) {
          if (type.length === 1) {
            setAllType([]);
          } else {
            const att = type.filter((f) => (f) !== imageType(name).type.toString());
            setAllType(att);
          }
      } else if (type.length >= 2) {
        global.alert('Não existem pokémon com três tipos: Remova um dos dois tipos selecionados ou realize a pesquisa com os dois tipos já escolhidos.');
      } else {
        setAllType(prevState => [...prevState, imageType(name).type.toString()]);
      }
    }
  }

  // const searchByGen = async (generation) => {
  //   if(generation !== 'more20' ) {
  //     const call = await getByGeneration(generation);
  //     setPokeGen(call);
  //     let arrayGen = [];
  //     for(let i = 0; i <= 19; i += 1){
  //       arrayGen.push(call[i]);
  //     }
  //     setListPokemon(arrayGen);
  //     setUltimo(19);
  //     setFinish(false);
  //   } else {
  //       let arrayGen = [];
  //       if (ultimo+20 < pokeGen.length) {
  //         for(let i = ultimo + 1; i <= ultimo + 20; i += 1){
  //           arrayGen.push(pokeGen[i]);
  //         }
  //         setListPokemon([...listPokemon, ...arrayGen]);
  //         setUltimo(ultimo + 20);
  //       } else {
  //         const valor = pokeGen.length - ultimo - 1;
  //         for(let i = ultimo + 1; i < ultimo + 1 + valor; i += 1){
  //           arrayGen.push(pokeGen[i]);
  //         }
  //         setListPokemon([...listPokemon, ...arrayGen]);
  //         setUltimo(pokeGen.length);
  //         setFinish(true);
  //       }
  //     }
  //     setButtonOption('generation');
  // }

  // const searchByNameId = async (state) => {
  //   if(typeof(state) === 'string') {
  //     state = state.toLowerCase();
  //   }
  //   const fetchApi = await getByName(state);
  //   setListPokemon([{ name: fetchApi.name, id: fetchApi.id }]);
  //   setButtonOption('hidden');
  // }
  // const setPokeGeneration = async (array) => {
  //   setPokeGen(array)
  // }

  function letraMaiuscula (nome) {
    let novoNome = nome[0].toUpperCase();
    for (let i = 1; i < nome.length; i += 1) {
      novoNome += nome[i];
    }
    return novoNome;
  }

  return(
    <contexto.Provider value={{
      finish,
      buttonOption,
      first,
      listPokemon,
      type,
      addType,
      letraMaiuscula,
      setList,
      moreTwentyForAll,
      setFirstValor,
      setButton,
      setTheFinish,
      firstCall,
      searchByType,
      twentyExibition,
      allItemsList,
      setAllItemsList,
      // pokeGen,
      // searchByNameId,
      // searchByGen,
      // setPokeGeneration,
      }}
    >
      {children}
    </contexto.Provider>
  );
}