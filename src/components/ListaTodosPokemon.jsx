import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default class ListaTodosPokemon extends React.Component {
  render() {
    const { lista, retorna10, avanca10 } = this.props;
    return (
      <div className="container-list">
        <button onClick={retorna10}><IoIosArrowBack /></button>
        <div className="lista-de-pokemon">
          {lista}
        </div>
        <button onClick={avanca10}><IoIosArrowForward /></button>
      </div>
    );

  }
}