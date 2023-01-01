import {useContext, useEffect, useState } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import contexto from '../context';

export default function Guide({ list, position, listDisplayed }) {
  const context = useContext(contexto);
  const [pagination, setPagination] = useState([1, 2, 3]);
  const {
    firstPage,
    previousPage,
    returnFivePages,
    nextPage,
    valueButton,
  } = context;

  useEffect(() => {
    const value = returnFivePages(list, listDisplayed, position);
    setPagination(value);
  }, []);

  useEffect(() => {
    const value = returnFivePages(list, listDisplayed, position);
    setPagination(value);
  }, [firstPage, valueButton]);

  return(
    <div
      className="w-10/12 sm:w-full flex justify-center my-5 text-sm sm:text-base "
    >
      {
        firstPage > 1 &&
        <button
          onClick={ () => previousPage() }
          className="mr-1 border"
          id={ position === 'top' ? 'init' : '' }
        >
          <GrFormPrevious />
        </button>
      }
      <div className="flex flex-wrap sm2:flex-none justify-center">
      { pagination }
      </div>
      {
        firstPage < Math.round(list.length/20) - 5 &&
        <button
          onClick={ () => nextPage(list) }
          className="ml-1 border"
          id={ position === 'top' ? 'init' : '' }
        >
          <GrFormNext />
        </button>
      }
    </div>
  );
}
