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
    <div className="flex flex-col items-center">
        <div className="w-9/12">
          <p className="mt-8 sm:mt-20 text-4xl sm:text-left pb-5 w-full bg-gradient-to-b">
            Pesquisando por Nome ou Número
          </p>
          <p className="pt-5">
            Abaixo é possível pesquisar um Pokémon por nome ou número.
            Você também utilizar as outras abas acima para pesquisar Pokémon por geração ou tipo, ou ainda listar todos os pokémon por ordem numérica. 
          </p>
          <p className="pt-2">
            Digite a seguir um nome ou número válido de um Pokémon. Caso este Pokémon seja encontrado, você será direcionado para a página de detalhes dele.
          </p>
          <p className="pt-2 pb-10">  
            Explore o quanto quiser e divirta-se!
          </p>
        </div>
        <div className="w-9/12 flex-col items-center mb-20 sm:mb-28 sm:mt-14">
          <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-start">
            <input
              type="text"
              className="border-2 border-marinho p-2 my-2 sm:mr-2 ml-0 w-11/12 sm:w-9/12 text-center"
              value={localNameNumber}
              placeholder={`Digite o Nome ou o Nº do Pokémon:`}
              onChange={(e) => setLocalNameNumber(e.target.value) }
            />
            <button
              type="button"
              className="rounded w-11/12 sm:w-2/12 bg-anil text-marinho hover:bg-marinho hover:text-anil transition-colors duration-500 border-2 border-marinho p-2 sm:my-2"
              onClick={ () => { getByNameNumber(localNameNumber) }}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }