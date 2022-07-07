const imagemType = (tipo) => {
    switch (tipo) {
        case 'normal':
            return (<img src={require('../imagens/types/normal.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'fighting':
            return (<img src={require('../imagens/types/fighting.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'flying':
            return (<img src={require('../imagens/types/flying.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'rock':
            return (<img src={require('../imagens/types/rock.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'ground':
            return (<img src={require('../imagens/types/ground.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'bug':
            return (<img src={require('../imagens/types/bug.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'ghost':
            return (<img src={require('../imagens/types/ghost.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'steel':
            return (<img src={require('../imagens/types/steel.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'water':
            return (<img src={require('../imagens/types/water.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'poison':
            return (<img src={require('../imagens/types/poison.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'fire':
            return (<img src={require('../imagens/types/fire.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'grass':
            return (<img src={require('../imagens/types/grass.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'dragon':
            return (<img src={require('../imagens/types/dragon.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'dark':
            return (<img src={require('../imagens/types/dark.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'fairy':
            return (<img src={require('../imagens/types/fairy.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'psychic':
            return (<img src={require('../imagens/types/psychic.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'electric':
            return (<img src={require('../imagens/types/electric.png')}
                alt={tipo}
                className="w-10"
            />);
        case 'ice':
            return (<img src={require('../imagens/types/ice.png')}
                alt={tipo}
                className="w-10"
            />);
        default: return null;
    }
}

export default imagemType;