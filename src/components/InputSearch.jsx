import React, { useState, useContext, useEffect } from 'react';
import contexto from '../context';
import imageType from './Types';
import data from '../fetchs';
const { allTypes } = data;

export default function InputSearch(props) {
  const context = useContext(contexto);
  const { 
    searchByNameId,
    searchByGen,
    setButton,
    setFirstValor,
    letraMaiuscula,
    searchByType,
    firstCall,
    setList,
    setAllItemsList,
    type,
    addType,
  } = context;

  const [result, setResult] = useState([]);
  const [localName, setLocalName] = useState('');
  const [localNumber, setLocalNumber] = useState('');
  const [localGen, setLocalGen] = useState('1');

  useEffect(() => {
    const init = async () => {
      const types = await allTypes();
      const { results } = types;
      setResult(results);
    };
    return init;
  }, []);

  const reset = () => {
    setLocalName('');
    setLocalNumber('');
    setLocalGen('');
  }

  const searchButton = () => {
    if(type.includes('all')) {
      setFirstValor(0);
      firstCall();
      setButton('all');
    } else {
      searchByType('type');
    }
  }

  const returnInput = () => {
    const { input } = props;
    if (input === 'generation') {
      return (
        <div className="flex flex-row justify-center align-center sm:align-start w-full sm:w-7/12 mx-auto my-5 sm:my-10">
          <select
            className="p-2 my-2 mr-2 ml-0 sm:ml-2 w-10/12 sm:w-9/12 text-center"
            onChange={(e) => setLocalGen(e.target.value)}
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
            className="w-2/12 bg-gray-500 p-2 my-2"
            onClick={ () => searchByGen(localGen) }
          >
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
          </div>
      );
    } else if (input === 'type') {
      return (
        <div className="flex flex-col w-full">
          <div
            className="px-1 py-2 w-full flex flex-row flex-wrap"
            onChange={(e) => setLocalGen(e.target.value)}
          >
            {
              result.map((resultados, index) => {
                const { name } = resultados;
                if (name === 'unknown' || name === 'shadow') {
                  return null;
                }
                return (
                  <div className="p-1 w-1/3 h-18 sm:w-1/4 lg:w-2/12">
                    <div className="flex flex-row items-center sm3:justify-start justify-center hover:font-bold p-2 bg-gray-400 w-full h-full" key={index} onClick={() => addType(name)}>
                      {imageType(name).image}
                      <p className="hidden sm3:flex pl-2">{letraMaiuscula(name)}</p>
                    </div>
                  </div>
                );
              })
            }
            <div className="p-1 w-1/3 h-18 sm:w-1/4 lg:w-2/12">
              <div className="flex flex-row items-center hover:font-bold p-2 bg-gray-400 w-full" onClick={() => addType('all')}>
                <img src={require('../imagens/pokebola.png')} alt="pokebola" className="w-12 object-contain sm:py-1" />
                <p className="hidden sm3:flex pl-2">{letraMaiuscula('todos os Pokémon')}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="w-2/12 bg-gray-500 p-2 my-2"
            onClick={ () => {
              searchButton();
              setAllItemsList([]);
              setList([]);
            }}
            >
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
        </div>
      );
    } else {
      return(
        <div className="flex flex-row justify-center align-center sm:align-start w-full sm:w-7/12 mx-auto my-5 sm:my-10">
          <input
            type={input}
            className="p-2 my-2 mr-2 ml-0 sm:ml-2 w-10/12 sm:w-9/12 text-center"
            value={input==="text" ? localName : localNumber}
            placeholder={`Digite o ${input === 'text' ? 'Nome' : 'Número'} do Pokémon:`}
            onChange={(e) => input==="text" ? setLocalName(e.target.value) : setLocalNumber(e.target.value)}
          />
          <button
            type="button"
            className="w-2/12 bg-gray-500 p-2 my-2"
            onClick={
              async () => {
                if (input === 'text') {
                  await searchByNameId(localName);
                } else {
                  await searchByNameId(localNumber);
                }
                reset();
              }
            }
          >
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
        </div>
      );
    }
  }
    return(
      <div className="w-full">{ returnInput() }</div>
    );
  }