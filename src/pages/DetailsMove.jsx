import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';
import Nav from '../components/Nav';
import { useParams } from 'react-router-dom';
import { getMove } from '../fetchs';
import Pokemon from '../components/Pokemon';
import contexto from '../context';
import AllDataTypes from '../components/AllDataTypes';

export default function DetailsMove() {
  const [move, setMove] = useState({});
  const params = useParams();
  const history = useHistory();
  const context = useContext(contexto);
  const { numberPokemon, letraMaiuscula } = context;
  useEffect(() => {
    const getMoveByName = async () => {
      const get = await getMove((params.name));
      setMove(get);
    }
    getMoveByName();
  },[]);

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gradient-to-l via-white from-anil to-white">
      <Nav />
      <div
        className="z-40 text-black text-4xl p-2 fixed top-0 left-0 w-full flex justify-left bg-gradient-to-l via-white from-anil to-white"
        onClick={ () => { 
          history.push('/moves');
        } }
      >
        <img
          src={ require('../imagens/arrow-left.png') }
          alt="seta"
          className="w-10"
        />
      </div>
      <div className="flex flex-row items-center justify-center lg:pl-7">
        {
          Object.values(move).length > 0 &&
          <div className="flex flex-col items-start justify-center px-7">
            <div className="flex flex-col w-full justify-start pt-10 gap-3">
              { AllDataTypes(move.type.name).image }
              <p className="text-3xl sm:text-2xl md:text-4xl">{ letraMaiuscula(move.name) }</p>
              <p className="pb-2 text-1xl text-gray-700"># { move.id }</p>
            </div>
            <div className="pt-5">
            <p className="text-3xl sm:text-2xl md:text-4xl">Dados</p>
              <p className="pt-5">Precisão: { move.accuracy }</p>
              <p className="pt-1">Classe de dano: { letraMaiuscula(move.damage_class.name) }</p>
              <p className="pt-1">Poder: {move.power}</p>
              <p className="pt-1">PP: {move.pp}</p>
              <p className="pt-1">Prioridade: {move.priority}</p>
              <p className="pt-1">Alvo: {move.target.name}</p>
              <p className="pt-10 text-3xl sm:text-2xl md:text-4xl">Efeito</p>
              <p className="pt-5">
                Espanhol: { move.flavor_text_entries.find((text) => text.language.name === 'es').flavor_text }
              </p>
              <p className="pt-3">
                Inglês: { move.effect_entries[0].effect }
              </p> /fazer um map
            </div>
            <div className="flex flex-col items-center">
              <p className="w-full text-3xl sm:text-2xl md:text-4xl py-10">
                {`Aprendido por ${move.learned_by_pokemon.length} Pokémon:`}
              </p>
              <div className="bg-white p-1 gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
                {
                  move.learned_by_pokemon.map((poke) => (
                    <Pokemon
                    name={poke.name}
                    id = {numberPokemon(poke)}
                    dataPokemon={poke}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        }
      </div>
      <Footer />
    </div>
  );
}

//   "past_values": [],
//   "stat_changes": [],
//   "machines": [
//       {
//           "machine": {
//               "url": "https://pokeapi.co/api/v2/machine/1151/"
//           },
//           "version_group": {
//               "name": "sword-shield",
//               "url": "https://pokeapi.co/api/v2/version-group/20/"
//           }
//       },
//       {
//           "machine": {
//               "url": "https://pokeapi.co/api/v2/machine/1222/"
//           },
//           "version_group": {
//               "name": "diamond-pearl",
//               "url": "https://pokeapi.co/api/v2/version-group/8/"
//           }
//       },
//       {
//           "machine": {
//               "url": "https://pokeapi.co/api/v2/machine/1223/"
//           },
//           "version_group": {
//               "name": "platinum",
//               "url": "https://pokeapi.co/api/v2/version-group/9/"
//           }
//       },
//       {
//           "machine": {
//               "url": "https://pokeapi.co/api/v2/machine/1224/"
//           },
//           "version_group": {
//               "name": "heartgold-soulsilver",
//               "url": "https://pokeapi.co/api/v2/version-group/10/"
//           }
//       }
//   ],
//   "meta": {
//       "ailment": {
//           "name": "none",
//           "url": "https://pokeapi.co/api/v2/move-ailment/0/"
//       },
//       "ailment_chance": 0,
//       "category": {
//           "name": "damage",
//           "url": "https://pokeapi.co/api/v2/move-category/0/"
//       },
//       "crit_rate": 0,
//       "drain": 0,
//       "flinch_chance": 0,
//       "healing": 0,
//       "max_hits": null,
//       "max_turns": null,
//       "min_hits": null,
//       "min_turns": null,
//       "stat_chance": 0
//   },

