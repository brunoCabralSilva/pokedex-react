import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul className="flex flex-col sm:flex-row items-center justify-between w-full">
          <img src={require('../imagens/pokebola.png')} alt="pokebola" className="w-16 object-contain sm:py-1 sm:px-2" />
          <div className="flex flex-row flex-wrap items-center">
          <li className="p-1 sm:p-2">
            <Link to="" className="">Início</Link>
          </li>
          |
          <li className="p-1 sm:p-2">
            <Link to="" className="">Catálogo</Link>
          </li>
          |
          <li className="p-1 sm:p-2">
            <Link to="" className="">Sobre</Link>
          </li>
          |
          <li className="p-1 sm:p-2">
            <Link to="" className="">Contato</Link>
          </li>
          </div>
        </ul>
      </nav>
    );
  }
}

export default Nav;