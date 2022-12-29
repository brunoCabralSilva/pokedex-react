import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { useParams } from 'react-router-dom';
import { getMove } from '../fetchs';

export default function DetailsMove() {
  const [move, setMove] = useState({});
  const params = useParams();
  useEffect(() => {
    const getMoveByName = async () => {
      const get = await getMove((params.name));
      setMove(get);
    }
    getMoveByName();
  },[]);

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <Nav />
      <div className="flex flex-row items-left justify-center">
        {
          Object.values(move).length > 0 &&
          <div>
            <p>{ move.name }</p>
            <p>id { move.id }</p>
            <p>Type: {move.type.name}</p>
            <p>Accuracy { move.accuracy }</p>
            <p>damage class { move.damage_class.name }</p>
            <p>Efeito: { move.flavor_text_entries.find((text) => text.language.name === 'es').flavor_text }</p>
            <p>Efeito: { move.effect_entries[0].effect }</p> /fazer um map
            <p>Power: {move.power}</p>
            <p>pp: {move.pp}</p>
            <p>Priority: {move.priority}</p>
            <p>Target: {move.target.name}</p>
            <div>
              <p>{`Learned by ${move.learned_by_pokemon.length} pokemon`}</p>
              <div className="grid grid-cols-4">
                {
                  move.learned_by_pokemon.map((poke) => (
                    <div>
                      <p>{ poke.name }</p>
                      <p>{ poke.url }</p>
                    </div>
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

