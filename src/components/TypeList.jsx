import React from 'react';
import PropTypes from 'prop-types';
import imageType from './Types';
import data from '../fetchs';
const { allTypes } = data;

export default class TypeList extends React.Component {
  state = {
    list: 'vazio',
  }

  async componentDidMount() {
    const { letraMaicuscula } = this.props;
    const types = await allTypes();
    const { results } = types;
    const typeList = await results.map((resultados, index) => {
      const { name } = resultados;
      if (name === 'unknown' || name === 'shadow') {
        return null;
      }
      return (
        <div className="snap-start" key={index}>
          <div className=" flex flex-row p-2 hover:font-bold">
          <div className="">
          {imageType(name)}
          </div>
          <p className="pl-2">{letraMaicuscula(name)}</p>
        </div>
        </div>
      );
    });
    this.setState({ list: typeList });
  }

  render() {
    const { list } = this.state;
    return (
      <div className="">
        <div className="snap-y overflow-y-scroll h-72">
          {list}
        </div>
      </div>
    );

  }
}

TypeList.propTypes = {
  letraMaicuscula: PropTypes.func.isRequired,
};