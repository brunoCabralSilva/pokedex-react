const imagemType = (tipo) => {
    const widthImage = 'w-10';
    switch (tipo) {
        case 'normal':
            return {
                image:(<img src={require('../imagens/types/normal.png')}
                alt={tipo}
                className={widthImage}
            />),
            type:'1',
            };
        case 'fighting':
            return {
                image: <img src={require('../imagens/types/fighting.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'2',
            };
        case 'flying':
            return {
                image: <img src={require('../imagens/types/flying.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'3',
        };
        case 'poison':
            return {
                image: <img src={require('../imagens/types/poison.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'4',
        };
        case 'ground':
            return {
                image: <img src={require('../imagens/types/ground.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'5',
            };
        case 'rock':
            return {
                image: <img src={require('../imagens/types/rock.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'6',
            }
        case 'bug':
            return {
                image: <img src={require('../imagens/types/bug.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'7',
            };
        case 'ghost':
            return {
                image: <img src={require('../imagens/types/ghost.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'8',
            };
        case 'steel':
            return {
                image: <img src={require('../imagens/types/steel.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'9',
            };
        case 'fire':
            return {
                image: <img src={require('../imagens/types/fire.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'10',
            };
        case 'water':
            return {
                image: <img src={require('../imagens/types/water.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'11',
            };
        case 'grass':
            return {
                image: <img src={require('../imagens/types/grass.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'12',
            };
        case 'electric':
            return {
                image: <img src={require('../imagens/types/electric.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'13',
            };
        case 'psychic':
            return {
                image: <img src={require('../imagens/types/psychic.png')}
                alt={tipo}
                className={widthImage}
                />,
            type:'14',
            };
        case 'ice':
            return {
                image: <img src={require('../imagens/types/ice.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'15',
            };
        case 'dragon':
            return {
                image: <img src={require('../imagens/types/dragon.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'16',
            };
        case 'dark':
            return {
                image: <img src={require('../imagens/types/dark.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'17',
            };
        case 'fairy':
            return {
                image: <img src={require('../imagens/types/fairy.png')}
                alt={tipo}
                className={widthImage}
            />,
            type:'18',
            };
        default: return null;
    }
}

export default imagemType;