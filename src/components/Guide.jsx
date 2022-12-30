import { useState, useContext } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import contexto from '../context';
import Loading from './Loading';

export default function Guide({ list }) {
  const [firstPage, setFirstPage] = useState(1);
  const context = useContext(contexto);
  const {
    queryByPage,
  } = context;

  const returnFivePages = () => {
    let pages = [];
    for (let i = 0; i < 6 ; i += 1 ) {
      pages.push(
        <button
          key={i}
          type="button"
          className="px-2 py-1 border mx-1"
          onClick={ () => {
            if (firstPage + i > (Math.round(list.length/20)- 5)) {
              queryByPage(firstPage + i, list);
              setFirstPage(Math.round(list.length/20)- 5);
            } else {
              queryByPage(firstPage + i, list);
              setFirstPage(firstPage + i);
            }
          }}
        >
          { firstPage + i}
        </button>
      );
    }
    const spanItem = <div className="px-2 py-1 border mx-1">...</div>;
    const elementFirst = <button
      className="px-2 py-1 border mx-1"
      onClick={ () => {
          queryByPage(1, list);
          setFirstPage(1);
        }
      }
    >1</button>;
    const elementLast = <button
      className="px-2 py-1 border mx-1"
      onClick={ () => {
          queryByPage(Math.round(list.length/20), list);
          setFirstPage(Math.round(list.length/20 - 5));
        }
      }
      >{Math.round(list.length/20)}</button>
    const elementPrevious = <button
      className="px-2 py-1 border mx-1"
      onClick={ () => {
        if (firstPage - 15 < 0) {
          setFirstPage(1);
          queryByPage(1, list);
        } else {
          queryByPage(firstPage - 15, list);
          setFirstPage(firstPage - 15);
        }
      }}
    >
      { firstPage - 15}
    </button>;
    const elementNext = <button
      className="px-2 py-1 border mx-1"
      onClick={ () => {
        if (firstPage + 15 > (Math.round(list.length/20)- 5)) {
          setFirstPage(Math.round(list.length/20)- 5);
          queryByPage(Math.round(list.length/20)- 5, list);
        } else {
          queryByPage(firstPage + 15, list);
          setFirstPage(firstPage + 15);
        }
      }}
    >
      { firstPage + 15}
    </button>;
    let concludePage = [];
    if (firstPage > 20 && firstPage + 15 < Math.round(list.length/20)) {
      concludePage = [elementPrevious, spanItem, ...pages, spanItem, elementNext];
    } else if (firstPage > 10 && firstPage < 20 && firstPage + 15 < Math.round(list.length/20)) {
        concludePage = [elementFirst, spanItem, ...pages, spanItem, elementNext];
    } else if (firstPage + 15 < Math.round(list.length/20)) {
      concludePage = [...pages, spanItem, elementNext];
    } else if (firstPage > 20 && firstPage + 15 > Math.round(list.length/20) - 5 && firstPage < Math.round(list.length/20) - 5) {
      concludePage = [elementPrevious, spanItem, ...pages, spanItem, elementLast];
    } else {
      concludePage = [elementPrevious, spanItem, ...pages];
    }
    return (concludePage);
  };

  const previousPage = () => {
    if (firstPage - 1 <= 0) {
      setFirstPage(1);
    } else {
      setFirstPage(firstPage - 1);
    }
  };

  const nextPage = () => {
    if (firstPage + 1 > (Math.round(list.length/20)- 5)) {
      setFirstPage(Math.round(list.length/20)- 5);
    }
    else {
      setFirstPage(firstPage + 1);
    }
  };

  return(
    <div className="flex justify-center my-5">
      {
        firstPage > 1 &&
        <button onClick={ previousPage  }>
          <GrFormPrevious />
        </button>
      }
      {
       returnFivePages()
      }
      {
        firstPage < Math.round(list.length/20) - 5 &&
        <button onClick={ nextPage }>
          <GrFormNext />
        </button>
      }
    </div>
  );
}
