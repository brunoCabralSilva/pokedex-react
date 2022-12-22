import { useState, useEffect, useContext } from "react";
import contexto from '../../context';
import data from '../../fetchs';
import { useHistory } from "react-router-dom";
import Pokemon from "../Pokemon";

const { getAllPokemon } = data;

export default function AllPokemon() {
  const [first, setFirst] = useState(0);
  const [finish, setFinish] = useState(false);
  const history = useHistory();
  const context = useContext(contexto);
  const {
    setList,
    list,
    numberPokemon,
  } = context;

  useEffect(() => {
    const firstCall = async () => {
      if(list.length === 0) {
        const call = await getAllPokemon(first);
        if (list.length <= 20) {
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
      } else if (list.length === 20) {
        setFirst(list.length);
        window.scrollTo(0, 0);
      } else {
        setFirst(list.length);
        window.scrollTo(0, document.body.scrollHeight);
      }
    };
    firstCall();
  }, []);

  const moreTwentyForAll = async () => {
    const newFirst = first + 20;
    const call = await getAllPokemon(newFirst);
      if (newFirst + 20 < 898) {
        setFirst(newFirst);
        setList([...list, ...call.results]);
        setFinish(false);
      } else {
        let last898 = [];
        for (let i = 0; i < 898 - newFirst; i += 1) {
          last898.push(call.results[i]);
        }
        setFirst(newFirst);
        setList([...list, ...last898]);
        setFinish(true);
      }
  };

  return(
    <div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {
          list.length !== 1
            ? list.length > 0 && list.map((poke, index) => (
              <Pokemon
                key={index}
                className="w-full"
                name={poke.name}
                id={numberPokemon(poke)}
              />
            ))
            : history.push(`/pokemon/${list[0].id}`)
        }
      </div>
      <div className="w-full grid grid-cols-1">
        <button
          type="button"
          className={`p-1 w-full mt-2 ${ finish && 'hidden' }`}
          onClick={ moreTwentyForAll }
        >
          <div className="bg-black/70 text-white text-xl p-4 font-bold hover:border-2 hover:border-white w-full h-full">
            Mais Pokémon
          </div>
        </button>
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