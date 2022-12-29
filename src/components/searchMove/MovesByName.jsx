import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getMove } from '../../fetchs';

export default function MovesByName() {
  const [localName, setLocalName] = useState([]);
  const history = useHistory();

  const getByNameNumber = async () => {
      try {
      await getMove(localName);
      history.push(`/moves/${localName.toLowerCase()}`);
    } catch(error) {
      global.alert("Não foi possível encontrar este Pokémon! Reveja o número ou nome inserido ou tente novamente mais tarde!");
    }
    setLocalName('');
  };
  return(
    <div className="flex flex-col items-center">
        <div className="w-9/12">
          <p className="mt-8 sm:mt-20 text-4xl sm:text-left pb-5 w-full bg-gradient-to-b">
            Pesquisando um Movimento pelo Nome
          </p>
          <p className="pt-5">
            Abaixo é possível pesquisar um Movimento pelo seu nome.
            Você também utilizar as outras abas acima para pesquisar Movimentos por um tipo específico, ou ainda listar todos de uma vez por ordem alfabética.
          </p>
          <p className="pt-2">
            Digite a seguir um nome válido de um Movimento. Caso este Movimento seja encontrado, você será direcionado para a página de detalhes dele.
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
              value={localName}
              placeholder={`Digite o Nome ou o Nº do Pokémon:`}
              onChange={(e) => setLocalName(e.target.value) }
            />
            <button
              type="button"
              className="rounded w-11/12 sm:w-2/12 bg-anil text-marinho hover:bg-marinho hover:text-anil transition-colors duration-500 border-2 border-marinho p-2 sm:my-2"
              onClick={ () => { getByNameNumber(localName) }}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }