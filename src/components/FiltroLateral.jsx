import React from 'react';
import data from '../fetchs';
const { allTypes } = data;

export default class ListaTodosPokemon extends React.Component {
  state = {
    lista: [],
    types: [],
  }
  async componentDidMout() {
    const types = await allTypes();
    this.setState({ types: types.results });
  }

  listaDeTipos = () => {
    const { types } = this.state;
    if (types[0]) {
      console.log('finalmente');
    }
  }

  render() {
    const { lista } = this.state;
    return (
      <div className="container-list">
        {this.listaDeTipos()}
      </div>
    );

  }
}