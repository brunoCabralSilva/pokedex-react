import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [ showMenu, setShowMenu] = useState(false);

  const menu = () => {
    setShowMenu(!showMenu);
  }

  const barra1 = () => {
    if(!showMenu) {
      return 'rotate-0 transition duration-500';
    } return 'rotate-45deg transition duration-500 translate-y-3';
  }

  const barra2 = () => {
    if(!showMenu) {
      return 'rotate-0 transition duration-500';
    } return 'rotate-45 transition duration-500';
  }

  const barra3 = () => {
    if(!showMenu) {
      return 'opacity-1 transition duration-500';
    } return 'opacity-0 transition duration-500';
  }

  const returnItemMenu = () => {
    if(showMenu) {
      return 'fixed top-0 right-0 bg-hTransp opacity-1 z-30 w-screen sm:w-60  h-screen items-end pt-10 sm:pr-4 transition duration-500 flex flex-col text-white bg-t-transp justify-center'
    } else return 'bg-hTransp opacity-0 hidden items-end p-3 transition duration-500 text-white';
  }

  const returnLiMenu = () => {
  if(showMenu) {
    return 'sm:px-3 my-4 font-bold opacity-1 z-30 w-full text-center'
  } else return 'opacity-0 z-1 transition duration-500' 
  }

  const returnItemsMenu = () => {
    if(showMenu) {
      return 'items-center justify-center';
    } return 'items-end';
  }

    return (
      <nav className="w-full z-40 font-andika text-base absolute 2xl:text-xl leading-6">
        <div className={`fixed right-0 top-0 z-40 mr-4 mt-4 flex flex-col ${returnItemsMenu()}`} onClick={menu}>
            <div className={`h-2 w-10 mb-1 z-40 bg-yellow-pokemon border-2 border-black ${barra1()}`}> </div>
            <div className={`h-2 w-10 mb-1 z-40 bg-yellow-pokemon border-2 border-black ${barra2()}`}> </div>
            <div className={`h-2 w-10 z-40 bg-yellow-pokemon border-2 border-black ${barra3()}`}> </div>
          <ul
            className={`${returnItemMenu()}`}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            exit={{ y: -30, opacity: 0, transition: { duration: 0.5 } }}
          >
            <li className={returnLiMenu()}>
              <Link
                to="/"
                className="text-white hover:text-crepusculo transition duration-1000 sm:px-2"
              >
                Início
              </Link>
            </li>
            <li className={returnLiMenu()}>
              <Link to="/"
                className="text-white hover:text-crepusculo transition duration-1000 sm:px-2"
              >
                Catálogo
              </Link>
            </li>
            <li className={returnLiMenu()}>
              <Link to="/"
                className="text-white hover:text-crepusculo transition duration-1000 sm:px-2"
              >
                Sobre
              </Link>
            </li>
            <li className={returnLiMenu()}>
              <Link to="/"
                className="text-white hover:text-crepusculo transition duration-1000 sm:px-2"
              >
                Contato
              </Link>
            </li>
          <div className="py-7 flex justify-center w-full">
            <hr className="bg-crepusculo w-1/2" />
          </div>
          <div className="w-full flex flex-row justify-center p-2 my-4 sm:my-0">
            <img
              src={require("../imagens/pokebola.png")}
              alt="Pokébola"
              className="w-16"
            />
          </div>
        </ul>
      </div>
    </nav> 
  );
}