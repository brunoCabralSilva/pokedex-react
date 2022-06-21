import React from 'react';
import '../css/nav.css';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul className="ul-nav">
          <li className="li-nav">
            <Link to="" className="a-nav">Início</Link>
          </li>
          <li className="li-nav">
            <Link to="" className="a-nav">Catálogo</Link>
          </li>
          <li className="li-nav">
            <Link to="" className="a-nav">Sobre</Link>
          </li>
          <li className="li-nav">
            <Link to="" className="a-nav">Contato</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;