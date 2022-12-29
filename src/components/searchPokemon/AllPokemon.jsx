import { useState, useEffect, useContext } from "react";
import contexto from '../../context';
import { getAllPokemonSpecies, getGeneralist } from '../../fetchs';
import { useHistory } from "react-router-dom";
import Pokemon from "../Pokemon";

export default function AllPokemon() {
  const [finish, setFinish] = useState(false);
  const history = useHistory();
  const context = useContext(contexto);
  const {
    numberPokemon,
    listAllPokemon, setListAllPokemon,
    listPokemonDisplayed, setListPokemonDisplayed,
    firstPositionListPokemon, setFirstPositionListPokemon,
  } = context;

  const queryMorePokemon = async(list) => {
    console.log('url', list);
    let listItems = await Promise.all(
      list.map(async (item) => await getGeneralist(item.url)));
      if (listPokemonDisplayed.length > 0) {
        setListPokemonDisplayed([...listPokemonDisplayed, ...listItems]);
    } else {
      setListPokemonDisplayed(listItems);
    }
  };

  const displayedPokemon = async () => {
    if (listPokemonDisplayed.length + 20 > listAllPokemon.length) {
      let last = [];
      for (let i = firstPositionListPokemon; i < listAllPokemon.length - listPokemonDisplayed.length; i += 1) {
        last.push(listAllPokemon[i]);
      }
      queryMorePokemon(last);
      setFinish(true);
    } else {
      let last = [];
      for (let i = firstPositionListPokemon; i < firstPositionListPokemon + 20; i += 1) {
        last.push(listAllPokemon[i]);
      }
      setFirstPositionListPokemon(firstPositionListPokemon + 20);
      queryMorePokemon(last);
    } 
  };

  useEffect(() => {
    const seedListPokemon = async () => {
      const allMoves = await getAllPokemonSpecies();
      if (listAllPokemon.length === 0) {
        console.log('entrei');
        console.log('todos', allMoves);
        setListAllPokemon(allMoves.results);
        let last = [];
          for (let i = 0; i < 20; i += 1) {
          last.push(allMoves.results[i]);
        }
        setFirstPositionListPokemon(20);
        queryMorePokemon(last);
      };
    };
    seedListPokemon();
  }, []);

  return(
    <div className="flex flex-col items-center">
      <div className="w-9/12">
        <p className="mt-8 sm:mt-20 text-4xl sm:text-left pb-5 w-full bg-gradient-to-b">
          Bem vindo à Pokédex!
        </p>
        <p className="pt-5">
          Abaixo serão listados todos pokémon ordenados numericamente.
          Você também utilizar as outras abas acima para pesquisar Pokémon por nome, número, geração ou tipo. 
        </p>
        <p className="pt-2">  
          Clicando em um Pokémon, será possível ver mais detalhes sobre ele. Além disso, caso você clique no botão que existe no canto superior direito de cada Pokémon, este será salvo na sua lista de Favoritos.
        </p>
        <p className="pt-2 pb-10">  
          Explore o quanto quiser e divirta-se!
        </p>
      </div>
      <div className="bg-white w-9/12 p-1 gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        { console.log('list', listAllPokemon) }
        {
          listPokemonDisplayed.length !== 1
            ? listPokemonDisplayed.length > 0 && listPokemonDisplayed.map((poke, index) => (
              <Pokemon
                key={index}
                className="w-full"
                name={poke.name}
                id={numberPokemon(poke)}
                dataPokemon={poke}
              />
            ))
            : history.push(`/pokemon/${listPokemonDisplayed[0].id}`)
        }
      </div>
      <div className="w-9/12">
        <button
          type="button"
          className={`px-1 w-full ${ finish && 'hidden' }`}
          onClick={ displayedPokemon }
        >
          <div className="bg-anil/80 text-black text-xl p-4 w-full h-full bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500">
            Mais Pokémon
          </div>
        </button>
        <button
          type="button"
          className="p-1 w-full mb-1"
          onClick={ () => window.scrollTo(0, 0) }
        >
          <div className="bg-anil/80 text-black text-xl p-4 w-full h-full bg-anil font-bold border-2 border-anil hover:border-2 hover:border-marinho transition-colors duration-500">
            Voltar ao Topo
          </div>
        </button>
      </div>
    </div>
  );
}