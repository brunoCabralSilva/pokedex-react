import React, { useState, useContext, useEffect } from 'react';
import contexto from '../context';
import PropTypes from 'prop-types';
import imageType from './Types';
import data from '../fetchs';
const { allTypes } = data;

export default function TypeList() {
    const context = useContext(contexto);
    const { letraMaiuscula, setButton, setFirstValor,
      firstCall, searchByType, cleanArrayTypes } = context;
    const [type, setType] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
      const init = async () => {
        const types = await allTypes();
        const { results } = types;
        setResults(results);
      };
    return init;
    }, []);
    
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
    }

  return (
    <div className="">
      <div className="snap-y overflow-y-scroll h-72">
      <div
        className="snap-start"
        onClick={() => {
          setFirstValor(0)
          firstCall();
          setButton('all')
        }}
      >
        <div className=" flex flex-row p-2 hover:font-bold">
          <div className="">
          <img src={require('../imagens/pokebola.png')} alt="pokebola" className="w-12 object-contain sm:py-1 sm:px-2" />
          </div>
          <p className="pl-2">{letraMaiuscula('todos os Pokémon')}</p>
        </div>
      </div>
        {
          results.map((resultados, index) => {
            const { name } = resultados;
            if (name === 'unknown' || name === 'shadow') {
              return null;
            }
            return (
              <div className="snap-start" key={index}>
                <button className=" flex flex-row p-2 hover:font-bold" onClick={() => addType(name)}>
                  <div className="">
                    {imageType(name).image}
                  </div>
                  <p className="pl-2">{letraMaiuscula(name)}</p>
                </button>
              </div>
            );
          })
        }
        </div>
        <div>
          <button className=" flex flex-row p-2 hover:font-bold">
            <p className="text-center" onClick={() => {
              searchByType('init', type);
              setType([]);
            }}
        >
          Buscar
        </p>
        </button>
      </div>
    </div>
  );
}

TypeList.propTypes = {
  letraMaiuscula: PropTypes.func.isRequired,
};