import {useContext } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import contexto from '../context';

export default function Guide({ list, listDisplayed }) {
  const context = useContext(contexto);
  const {
    NUMBERBYPAGE,
    firstPage,
    previousPage,
    nextPage,
    valueButton,
    queryByPage,
    setFirstPage,
    setValueButton,
    allPages,
  } = context;

  const largura = window.screen.width;
    let pages = [];
    let numberButtons = 0;
    if (largura >= 450) {
      numberButtons = 6;
    } else if (largura < 280) {
      numberButtons = 1;
    } else {
      numberButtons = 2;
    }

  const elementPrevious = (list, setListDisplayed) => {
    if (firstPage - 15 > 0) {
      <button
      className={`px-2 py-1 border mr-1 sm:mx-1 ${valueButton === firstPage - 15 && 'border-2 border-marinho'}`}
        onClick={ () => {
          queryByPage(firstPage - 15, list, setListDisplayed);
          setFirstPage(firstPage - 15);
        }}
      >
        { firstPage - 15 }
      </button>;
    } return null;
  };

  const spanFirst = (pages) => {
    if (pages[0].props.children > 2) {
      return (
        <div
          className={`${largura < 330 ? 'px-0' : 'px-2 py-1 border'}  mx-1`}
        >
          ...
        </div>
      );
    } return null;
  };
  
  const elementFirst = (pages, list, setListDisplayed) => {
    if (pages[0].props.children !== 1) {
      const previousPage = pages[0].props.children - 4 <= 0 ? 1 : pages[0].props.children - 4;
      return (
        <button
          className={`px-2 py-1 border mr-1 sm:mx-1 ${valueButton === 1 && 'border-2 border-marinho'}`}
          onClick={ () => {
              setValueButton(previousPage);
              queryByPage(previousPage, list, setListDisplayed);
              setFirstPage(previousPage);
          }}
        >
          { pages[pages.length - 1].props.children < 10 ? 1 : pages[pages.length - 1].props.children - 9 }
        </button>
      );
    } return null;
  };
  
  const elementLast = (pages, list, setListDisplayed) => {
    if (pages[pages.length - 1].props.children < allPages - 2) {
      <button
      className={`px-2 py-1 border ml-1 sm:mx-1 ${valueButton === allPages && 'border-2 border-marinho'}`}
        onClick={ () => {
          setValueButton(allPages);
          queryByPage(allPages, list, setListDisplayed);
          setFirstPage(Math.round(list.length/20 - 5));
          }
        }
        >
        {allPages}
      </button>;
    } return null;
  };
  
  const spanLast = (allPages, pages, largura) => {
    if (pages[pages.length - 1].props.children < allPages) {
      return (
        <div
          className={`${largura < 330 ? 'px-0' : 'px-2 py-1 border'}  mx-1`}
        >
          ...
        </div>
      );
    } return null;
  };
  
  const elementNext = (allPages, list, numberButtons, setListDisplayed) => {
    const lastPage = firstPage + 15 > allPages ? allPages : firstPage + 15;
    if (firstPage + numberButtons < allPages) {
      return (<button
        className={`px-2 py-1 border ml-1 sm:mx-1  ${valueButton === firstPage + 15 && 'border-2 border-marinho'}`}
        onClick={ () => {
          setValueButton(lastPage);
          if (firstPage + 15 > (allPages- 5)) {
            setFirstPage(allPages- 5);
            queryByPage(allPages- 5, list, setListDisplayed);
          } else {
            queryByPage(lastPage, list, setListDisplayed);
            setFirstPage(lastPage);
          }
        }}
      >
        { lastPage }
      </button>);
    } return null;
  };

  const returnFivePages = (list, setListDisplayed) => {
    let allPages = Math.round(list.length/20);
    const pagesByNUMBEROFPAGES = list.length/NUMBERBYPAGE;
    const roundNUMBEROFPAGES = Math.round(list.length/20);
    if (pagesByNUMBEROFPAGES > roundNUMBEROFPAGES) {
      allPages = roundNUMBEROFPAGES + 1;
    }
    let totalPages = firstPage;
    if (allPages < 6) {
      numberButtons = allPages;
      totalPages = 1;
    }

    for (let i = 0; i < numberButtons ; i += 1 ) {
      pages.push(
        <button
          key={i}
          type="button"
          className={`px-2 py-1 border mx-1 ${valueButton === totalPages + i && 'border-2 border-marinho'}`}
          onClick={ () => {
            setValueButton(totalPages + i);
            if (totalPages + i > (allPages- 5)) {
              queryByPage(totalPages + i, list, setListDisplayed);
              setFirstPage(allPages- 5);
            } else {
              queryByPage(totalPages + i, list, setListDisplayed);
              setFirstPage(totalPages + i);
            }
          }}
        >
          { totalPages + i}
        </button>
      );
    }

    return [
      elementPrevious(list, listDisplayed),
      elementFirst(pages, list, listDisplayed),
      spanFirst(pages),
      pages,
      spanLast(allPages, pages, largura),
      elementLast(pages, list, listDisplayed),
      elementNext(allPages, list, numberButtons, listDisplayed),
    ];
  };

  return(
    <div
      className="w-10/12 sm:w-full flex justify-center my-5 text-sm sm:text-base "
    >
      {
        firstPage > 1 &&
        <button
          onClick={ () => previousPage() }
          className="mr-1 border"
        >
          <GrFormPrevious />
        </button>
      }
      <div className="flex flex-wrap sm2:flex-none justify-center">
      { returnFivePages(list, listDisplayed) }
      </div>
      {
        firstPage < Math.round(list.length/20) - numberButtons &&
        <button
          onClick={ () => nextPage(list, numberButtons) }
          className="ml-1 border"
        >
          <GrFormNext />
        </button>
      }
    </div>
  );
}
