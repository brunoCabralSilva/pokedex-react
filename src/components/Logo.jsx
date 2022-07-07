import React from 'react';
import PropTypes from 'prop-types';

class Logo extends React.Component {
  render() {
    const { classImage } = this.props;
    return (
     <img
        src={require('../imagens/Pokémon_logo.png')}
        className={ `${classImage} object-contain p-2` }
        alt="Logo Pokémon"
    />
    );
  }
}

Logo.propTypes = {
    classImage: PropTypes.string.isRequired,
}

export default Logo;