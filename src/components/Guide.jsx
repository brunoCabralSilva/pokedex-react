import {useContext } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import contexto from '../context';

export default function Guide({ list, position, listDisplayed }) {
  const context = useContext(contexto);
  const {
    firstPage,
    previousPage,
    returnFivePages,
    nextPage,
  } = context;

  return(
    <div
      className="flex justify-center my-5"
      id={ position === 'top' ? 'init' : '' }
    >
      {
        firstPage > 1 &&
        <button onClick={ () => previousPage()  }>
          <GrFormPrevious />
        </button>
      }
      { returnFivePages(list, listDisplayed, position) }
      {
        firstPage < Math.round(list.length/20) - 5 &&
        <button
          onClick={ () => nextPage(list) }
          id={ position === 'top' ? 'init' : '' }
        >
          <GrFormNext />
        </button>
      }
    </div>
  );
}
