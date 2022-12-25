import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getByName } from '../../fetchs';

export default function NameNumber() {
  const [localNameNumber, setLocalNameNumber] = useState([]);
  const history = useHistory();

  const getByNameNumber = async () => {
      try {
      await getByName(localNameNumber);
      history.push(`/pokemon/${localNameNumber.toLowerCase()}`);
    } catch(error) {
      global.alert("Não foi possível encontrar este Pokémon! Reveja o número ou nome inserido ou tente novamente mais tarde!");
    }
    setLocalNameNumber('');
  };
  return(
      <div className="w-full mx-auto px-1">
        <div className="bg-black/75 h-35vh sm:h-screen w-full flex-col items-center mb-1">
          <div className="w-full py-1">
            <p className="text-white w-full h-full flex flex-col sm:flex-row items-center justify-center text-xl sm:text-2xl md:text-4xl sm:py-10 font-bold text-center p-3 sm:p-0">
              Digite o nome ou o número do Pokémon
            </p>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-center">
            <input
              type="text"
              className="p-2 my-2 sm:mr-2 ml-0 sm:ml-2 w-11/12 sm:w-9/12 text-center"
              value={localNameNumber}
              placeholder={`Digite o Nome ou o Número do Pokémon:`}
              onChange={(e) => setLocalNameNumber(e.target.value) }
            />
            <button
              type="button"
              className="w-11/12 sm:w-2/12 bg-gray-500 p-2 sm:my-2"
              onClick={ () => { getByNameNumber(localNameNumber) }}
            >
              <i className="fa-solid fa-magnifying-glass text-white"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }