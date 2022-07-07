import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default class List extends React.Component {
  render() {
    const { primeiro, ultimo, listPokemon } = this.props;
    //  let list = [];
    //   for (let i = primeiro; i <= ultimo; i += 1) {
    //     list.push
    //     (<Pokemon
    //         numeroDoPokemon={numeroPokemon + i}
    //         nome={results[i].name}
    //         i={i}
    //         letraMaicuscula={ this.letraMaicuscula }
    //       />
    //     );
    //   };
    //   this.setState({
    //     lista: list,
    //     numeroPokemon: 10,
    //     primeiro: 10,
    //     ultimo: 19,
    //   });
    return (
      <div className="flex flex-row items-center justify-center">
        <button onClick={''}><IoIosArrowBack className="text-5xl" /></button>
        <div className="flex flex-row items-center justify-center">
          { listPokemon }
        </div>
        <button onClick={''}><IoIosArrowForward className="text-5xl" /></button>
      </div>
    );

  }
}

List.propTypes = {
  lista: PropTypes.string.isRequired,
};