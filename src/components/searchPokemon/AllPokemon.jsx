import { useEffect, useContext } from "react";
import contexto from '../../context';
import { getAllPokemonSpecies } from '../../fetchs';
import { useHistory } from "react-router-dom";
import Pokemon from "../Pokemon";
import Guide from "../Guide";
const NUMBERBYPAGE = 20;

export default function AllPokemon() {
  const history = useHistory();
  const context = useContext(contexto);
  const {
    listOfAllPokemon, setListOfAllPokemon,
    listOfAllPokemonDisplayed, setListOfAllPokemonDisplayed,
    numberPokemon,
    setFirstPage,
    setValueButton,
    queryMorePokemon,
    return20empty,
  } = context;

  useEffect(() => {
    setListOfAllPokemonDisplayed([])
    setFirstPage(1);
    setValueButton(1);
    const seedListPokemon = async () => {
      let last = [];
      const allMoves = await getAllPokemonSpecies();
      setListOfAllPokemon(allMoves.results);
        for (let i = 0; i < NUMBERBYPAGE; i += 1) {
        last.push(allMoves.results[i]);
      };
      queryMorePokemon(last, setListOfAllPokemonDisplayed, 'all');
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
        <p className="pt-2 pb-10" id="init">  
          Explore o quanto quiser e divirta-se!
        </p>
      </div>
      {
        listOfAllPokemon.length > 0 &&
          <Guide
            list={listOfAllPokemon}
            listDisplayed={setListOfAllPokemonDisplayed}
            position="top"
          />
      }
        <div className="bg-white relative w-full flex justify-center">
          <div className="w-9/12 p-1 gap-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
            {
              listOfAllPokemonDisplayed.length !== 1
                ? listOfAllPokemonDisplayed.length > 0
                  ? 
                    listOfAllPokemonDisplayed.map((poke, index) => (
                    <Pokemon
                      key={index}
                      className=""
                      name={poke.name}
                      id={numberPokemon(poke)}
                      dataPokemon={poke}
                    />
                    ))
                    : return20empty()
                : history.push(`/pokemon/${listOfAllPokemonDisplayed[0].id}`)
            }
          </div>
        </div>
        { 
          listOfAllPokemon.length > 0 &&
            <Guide
              list={listOfAllPokemon}
              listDisplayed={setListOfAllPokemonDisplayed}
              position="bottom"
            />
        }
    </div>
  );
}