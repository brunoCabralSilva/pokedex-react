import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';
import contexto from '../context';
import Pokemon from '../components/Pokemon';
import { getAlternativePokemon } from '../fetchs';

export default function Alternatives() {
  const [first, setFirst] = useState(905);
  const history = useHistory();
  const context = useContext(contexto);
  const {
    listAlternatives, setListAlternatives,
    listAltDisplayed, setListAltDisplayed,
    numberPokemon,
  } = context;

  useEffect(() => {
    const firstCall = async () => {
      // let count = countPokemon;
      // if (countPokemon === 0) {
      //   const number = await getNumberOfPokemon();
      //   setCountPokemon(number.count);
      //   count = number.count;
      // }
      if(listAlternatives.length === 0) {
        const call = await getAlternativePokemon();
        setListAlternatives(call);
        if (listAltDisplayed.length <= 20) {
          if (listAltDisplayed + 20 < call.length) {
            setListAltDisplayed(call);
          } else {
            let last = [];
            for (let i = 0; i < call.length - first; i += 1) {
              last.push(call[i]);
            }
            setListAltDisplayed(last);
          }
        }
      } else if (listAltDisplayed.length === 20) {
        setFirst(listAltDisplayed.length);
        window.scrollTo(0, 0);
      } else {
        setFirst(listAltDisplayed.length);
        window.scrollTo(0, document.body.scrollHeight);
      }
    };
    firstCall();
  }, []);

  // const moreTwentyForAll = async () => {
  //   const newFirst = first + 20;
  //   const call = await getAllPokemon(newFirst);
  //   if (newFirst + 20 < countPokemon) {
  //     setFirst(newFirst);
  //     setList([...list, ...call.results]);
  //     setFinish(false);
  //   } else {
  //     let last = [];
  //     for (let i = 0; i < countPokemon - newFirst; i += 1) {
  //       last.push(call.results[i]);
  //     }
  //     setFirst(newFirst);
  //     setList([...list, ...last]);
  //     setFinish(true);
  //   }
  // };

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <Nav />
      <Header name="Alternatives" />
      <div className="flex flex-row items-left justify-center">
      <div className="bg-white w-9/12 p-1 gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        {console.log(listAltDisplayed)}
        
        {
          listAltDisplayed
            ? listAltDisplayed.length > 0 && listAltDisplayed.map((poke, index) => (
              <Pokemon
                key={index}
                className="w-full"
                name={poke.name}
                id={numberPokemon(poke)}
                dataPokemon={poke}
              />
            ))
            : ''// : history.push(`/pokemon/${listAltDisplayed[0].id}`)
        }
      </div>
      </div>
      <Footer />
    </div>
  );
}
