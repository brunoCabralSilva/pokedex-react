export default function AllDataTypes({ tipo: type }) {
  const widthImage = 'w-16 pb-5';
  switch (type) {
    case 'normal':
      return {
        image:(<img src={require('../imagens/types/normal.png')}
        alt={type}
        className={widthImage}
      />),
      type:'1',
      color: '#929BA3',
      };
    case 'fighting':
      return {
        image: <img src={require('../imagens/types/fighting.png')}
        alt={type}
        className={widthImage}
      />,
      type:'2',
      color: '#E12C6A',
      };
    case 'flying':
      return {
        image: <img src={require('../imagens/types/flying.png')}
        alt={type}
        className={widthImage}
      />,
      type:'3',
      color: '#9CD7F9',
    };
    case 'poison':
      return {
        image: <img src={require('../imagens/types/poison.png')}
        alt={type}
        className={widthImage}
      />,
      type:'4',
      color: '#B667CF',
    };
    case 'ground':
      return {
        image: <img src={require('../imagens/types/ground.png')}
        alt={type}
        className={widthImage}
      />,
      type:'5',
      color: '#E97333',
      };
    case 'rock':
      return {
        image: <img src={require('../imagens/types/rock.png')}
        alt={type}
        className={widthImage}
      />,
      type:'6',
      color: '#C9B787',
      }
    case 'bug':
      return {
        image: <img src={require('../imagens/types/bug.png')}
        alt={type}
        className={widthImage}
      />,
      type:'7',
      color: '#84C400',
      };
    case 'ghost':
      return {
        image: <img src={require('../imagens/types/ghost.png')}
        alt={type}
        className={widthImage}
      />,
      type:'8',
      color: '#4B6AB3',
      };
    case 'steel':
      return {
        image: <img src={require('../imagens/types/steel.png')}
        alt={type}
        className={widthImage}
      />,
      type:'9',
      color: '#5A8FA3',
      };
    case 'fire':
      return {
        image: <img src={require('../imagens/types/fire.png')}
        alt={type}
        className={widthImage}
      />,
      type:'10',
      color: '#FF983F',
      };
    case 'water':
      return {
        image: <img src={require('../imagens/types/water.png')}
        alt={type}
        className={widthImage}
      />,
      type:'11',
      color: '#3393DD',
      };
    case 'grass':
      return {
        image: <img src={require('../imagens/types/grass.png')}
        alt={type}
        className={widthImage}
      />,
      type:'12',
      color: '#35C04A',
      };
    case 'electric':
      return {
        image: <img src={require('../imagens/types/electric.png')}
        alt={type}
        className={widthImage}
        />,
      type:'13',
      color: '#FBD200',
      };
    case 'psychic':
      return {
        image: <img src={require('../imagens/types/psychic.png')}
        alt={type}
        className={widthImage}
        />,
      type:'14',
      color: '#FF6676',
      };
    case 'ice':
      return {
        image: <img src={require('../imagens/types/ice.png')}
        alt={type}
        className={widthImage}
      />,
      type:'15',
      color: '#4BD2C1',
      };
    case 'dragon':
      return {
        image: <img src={require('../imagens/types/dragon.png')}
        alt={type}
        className={widthImage}
      />,
      type:'16',
      color: '#006FCA',
      };
    case 'dark':
      return {
        image: <img src={require('../imagens/types/dark.png')}
        alt={type}
        className={widthImage}
      />,
      type:'17',
      color: '#5B5366',
      };
    case 'fairy':
      return {
        image: <img src={require('../imagens/types/fairy.png')}
        alt={type}
        className={widthImage}
      />,
      type:'18',
      color: '#FB8AEC',
      };
    default: return null;
  }
};