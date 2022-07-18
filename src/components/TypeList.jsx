import React, { useState, useContext, useEffect } from 'react';
import contexto from '../context';
import PropTypes from 'prop-types';
import imageType from './Types';
import data from '../fetchs';
const { allTypes } = data;

export default function TypeList() {
    const context = useContext(contexto);
    const { letraMaiuscula, arrayTypes, changeArrayTypes,
      firstCall, searchByType, selectedType, cleanArrayTypes, addTypes} = context;
    const [list, setList] = useState('Carregando...');
    let array = [];

  useEffect(() => {
    const init = async () => {
      const types = await allTypes();
      const { results } = types;
      const typeList = await results.map((resultados, index) => {
        const { name } = resultados;
        if (name === 'unknown' || name === 'shadow') {
          return null;
        }
        return (
          <div className="snap-start" key={index}>
            <button className=" flex flex-row p-2 hover:font-bold" onClick={() => addTypes(imageType(name).type)}>
              <div className="">
                {imageType(name).image}
              </div>
              <p className="pl-2">{letraMaiuscula(name)}</p>
            </button>
          </div>
        );
      });
      setList(typeList);
    };
  return init;
  }, []);

  return (
    <div className="">
      <div className="snap-y overflow-y-scroll h-72">
      <div className="snap-start" onClick={firstCall}>
        <div className=" flex flex-row p-2 hover:font-bold">
          <div className="">
          <img src={require('../imagens/pokebola.png')} alt="pokebola" className="w-12 object-contain sm:py-1 sm:px-2" />
          </div>
          <p className="pl-2">{letraMaiuscula('todos os Pokémon')}</p>
        </div>
      </div>
        {list}
      </div>
      <div>
        <button className=" flex flex-row p-2 hover:font-bold">
          <p className="text-center" onClick={() => {
            searchByType('init');
            cleanArrayTypes();
            console.log('array tipos', arrayTypes);
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