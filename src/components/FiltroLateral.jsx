import React from 'react';
import imageType from './types';
import '../css/filtrolateral.css';
import data from '../fetchs';
const { allTypes } = data;

export default class FiltroLateral extends React.Component {
  state = {
    list: 'vazio',
  }

  async componentDidMount() {
    const types = await allTypes();
    const { results } = types;
    const typeList = await results.map((resultados) => {
      const { name } = resultados;
      if (name === 'unknown' || name === 'shadow') {
        return null;
      }
      return (
        <scroll-page className="cadaTipo">
          {imageType(name)}
          <p className="text-type">{this.letraMaicuscula(name)}</p>
        </scroll-page>
      );
    });
    this.setState({ list: typeList });
  }

  letraMaicuscula = (nome) => {
    let novoNome = nome[0].toUpperCase();
    for (let i = 1; i < nome.length; i += 1) {
      novoNome += nome[i];
    }
    return novoNome;
  }

  render() {
    const { list } = this.state;
    return (
      <div className="type">
        <scroll-container>
          {list}
        </scroll-container>
      </div>
    );

  }
}