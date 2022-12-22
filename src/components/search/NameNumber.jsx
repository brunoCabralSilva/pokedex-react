import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function NameNumber() {
  const [localNameNumber, setLocalNameNumber] = useState([]);
  const history = useHistory();

  const getByNameNumber = async () => {
      history.push(`/pokemon/${localNameNumber.toLowerCase()}`);
      setLocalNameNumber('');
  };
  return(
      <div className="w-full sm:w-full mx-auto px-1">
        <div className="bg-black/75 h-75vh w-full py-10 flex flex-row justify-center ">
          <div className="w-full h-full flex items-start justify-center">
            <input
              type="text"
              className="p-2 my-2 mr-2 ml-0 sm:ml-2 w-10/12 sm:w-1/2 text-center"
              value={localNameNumber}
              placeholder={`Digite o Nome ou o Número do Pokémon:`}
              onChange={(e) => setLocalNameNumber(e.target.value) }
            />
            <button
              type="button"
              className="w-2/12 bg-gray-500 p-2 my-2"
              onClick={ () => { getByNameNumber(localNameNumber) }}
            >
              <i className="fa-solid fa-magnifying-glass text-white"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }