import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default class List extends React.Component {
  render() {
    const { lista  } = this.props;
    return (
      <div className="flex flex-row items-center justify-center">
        <button onClick={''}><IoIosArrowBack className="text-5xl" /></button>
        <div className="flex flex-row items-center justify-center">
          {lista}
        </div>
        <button onClick={''}><IoIosArrowForward className="text-5xl" /></button>
      </div>
    );

  }
}

List.propTypes = {
  lista: PropTypes.string.isRequired,
};