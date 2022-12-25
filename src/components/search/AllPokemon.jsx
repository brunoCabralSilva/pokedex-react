import { useState, useEffect, useContext } from "react";
import contexto from '../../context';
import { getAllPokemon, getNumberOfPokemon } from '../../fetchs';
import { useHistory } from "react-router-dom";
import Pokemon from "../Pokemon";

export default function AllPokemon() {
  const [first, setFirst] = useState(0);
  const [finish, setFinish] = useState(false);
  const history = useHistory();
  const context = useContext(contexto);
  const {
    setList,
    list,
    numberPokemon,
    countPokemon,
    setCountPokemon,
  } = context;

  useEffect(() => {
    const firstCall = async () => {
      let count = countPokemon;
      if (countPokemon === 0) {
        const number = await getNumberOfPokemon();
        setCountPokemon(number.count);
        count = number.count;
      }
      if(list.length === 0) {
        const call = await getAllPokemon(first);
        if (list.length <= 20) {
          if (first + 20 < count) {
            setList(call.results);
          } else {
            let last = [];
            for (let i = 0; i < count - first; i += 1) {
              last.push(call.results[i]);
            }
            setList(last);
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
      if (newFirst + 20 < countPokemon) {
        setFirst(newFirst);
        setList([...list, ...call.results]);
        setFinish(false);
      } else {
        let last = [];
        for (let i = 0; i < countPokemon - newFirst; i += 1) {
          last.push(call.results[i]);
        }
        setFirst(newFirst);
        setList([...list, ...last]);
        setFinish(true);
      }
  };

  return(
    <div>
      <div className="w-full p-1 gap-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {
          list.length !== 1
            ? list.length > 0 && list.map((poke, index) => (
              <Pokemon
                key={index}
                className="w-full"
                name={poke.name}
                id={numberPokemon(poke)}
                dataPokemon={poke}
              />
            ))
            : history.push(`/pokemon/${list[0].id}`)
        }
      </div>
      <div className="w-full">
        <button
          type="button"
          className={`px-1 w-full ${ finish && 'hidden' }`}
          onClick={ moreTwentyForAll }
        >
          <div className="bg-black/70 text-white text-xl p-4 font-bold hover:border-2 hover:border-white w-full h-full">
            Mais Pokémon
          </div>
        </button>
        <button
          type="button"
          className="p-1 w-full mb-1"
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