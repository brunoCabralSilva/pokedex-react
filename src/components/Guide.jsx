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
      className="w-10/12 sm:w-full flex justify-center my-5 text-sm sm:text-base "
    >
      {
        firstPage > 1 &&
        <button
          onClick={ () => previousPage() }
          className="border"
          id={ position === 'top' ? 'init' : '' }
        >
          <GrFormPrevious />
        </button>
      }
      <div className="flex flex-wrap sm2:flex-none justify-center">
      { returnFivePages(list, listDisplayed, position) }
      </div>
      {
        firstPage < Math.round(list.length/20) - 5 &&
        <button
          onClick={ () => nextPage(list) }
          className="border"
          id={ position === 'top' ? 'init' : '' }
        >
          <GrFormNext />
        </button>
      }
    </div>
  );
}
