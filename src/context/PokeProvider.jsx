import { useState } from 'react';
import contexto from './index';
import data from '../fetchs';
const { getByName, getByType, getByGeneration, getAllPokemon } = data;

export default function PokeProvider({ children }) {
  const [listPokemon, setListPokemon] = useState([]);
  const [pokeGen, setPokeGen] = useState([]);
  const [selectedTypeList, setSelectedTypeList] = useState([]);
  const [buttonOption, setButtonOption] = useState('all');
  const [ultimo, setUltimo] = useState([0]);
  const [finish, setFinish] = useState(false);
  const [first, setFirst] = useState(0);


  const twentyExibition = async (response, array, buttonMessage) => {
     if(response !== 'more20' ) {
      setPokeGen(array);
      let arrayGen = [];
      for(let i = 0; i <= 19; i += 1){
        arrayGen.push(array[i]);
      }
      setListPokemon(arrayGen);
      setUltimo(19);
      setFinish(false);
    } else {
        let arrayGen = [];
        if (ultimo+20 < pokeGen.length) {
          for(let i = ultimo + 1; i <= ultimo + 20; i += 1){
            arrayGen.push(pokeGen[i]);
          }
          setListPokemon([...listPokemon, ...arrayGen]);
          setUltimo(ultimo + 20);
        } else {
          const valor = pokeGen.length - ultimo - 1;
          for(let i = ultimo + 1; i < ultimo + 1 + valor; i += 1){
            arrayGen.push(pokeGen[i]);
          }
          setListPokemon([...listPokemon, ...arrayGen]);
          setUltimo(pokeGen.length);
          setFinish(true);
        }
      }
      setButtonOption(buttonMessage);
  }

  const searchByType = async (t) => {
    if(t !== 'more20' ) {
      const allByType = await getByType(t);
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
      twentyExibition(t, arrayTipos, 'type');
  } else {
    twentyExibition(t, null, 'type');
  }
}
  
  const setList = (list) => {
    setListPokemon(list);
  }

  const setButton = (alternative) => {
    setButtonOption(alternative);
  }

  const firstCall = async () => {
    const call = await getAllPokemon(0);
    setListPokemon(call.results);
    setButton('all');
  };

  const moreTwenty = async () => {
    const newFirst = first + 20;
    const call = await getAllPokemon(newFirst);
    setFirst(newFirst);
    setList([...listPokemon, ...call.results]);
    setButton('all');
  }

  const searchByGen = async (generation) => {
    if(generation !== 'more20' ) {
      const call = await getByGeneration(generation);
      setPokeGen(call);
      let arrayGen = [];
      for(let i = 0; i <= 19; i += 1){
        arrayGen.push(call[i]);
      }
      setListPokemon(arrayGen);
      setUltimo(19);
      setFinish(false);
    } else {
        let arrayGen = [];
        if (ultimo+20 < pokeGen.length) {
          for(let i = ultimo + 1; i <= ultimo + 20; i += 1){
            arrayGen.push(pokeGen[i]);
          }
          setListPokemon([...listPokemon, ...arrayGen]);
          setUltimo(ultimo + 20);
        } else {
          const valor = pokeGen.length - ultimo - 1;
          for(let i = ultimo + 1; i < ultimo + 1 + valor; i += 1){
            arrayGen.push(pokeGen[i]);
          }
          setListPokemon([...listPokemon, ...arrayGen]);
          setUltimo(pokeGen.length);
          setFinish(true);
        }
      }
      setButtonOption('generation');
  }

  const searchByNameId = async (state) => {
    if(typeof(state) === 'string') {
      state = state.toLowerCase();
    }
    const fetchApi = await getByName(state);
    setListPokemon([{ name: fetchApi.name, id: fetchApi.id }]);
    setButtonOption('hidden');
  }

  function letraMaiuscula (nome) {
    let novoNome = nome[0].toUpperCase();
    for (let i = 1; i < nome.length; i += 1) {
      novoNome += nome[i];
    }
    return novoNome;
  }

  return(
    <contexto.Provider value={{
      listPokemon, pokeGen, buttonOption,
      searchByNameId, letraMaiuscula, setList, searchByGen, setButton, firstCall, moreTwenty, finish, searchByType,
      }}
    >
      {children}
    </contexto.Provider>
  );
}