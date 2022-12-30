export default function AllDataTypes(type) {
  const widthImage = 'w-16';
  if (type === 'normal' || type === '1') {
    return {
      image:(<img src={require('../imagens/types/normal.png')}
      alt={type}
      className={widthImage}
    />),
    type:'1',
    name:"Normal",
    color: '#929BA3',
    class: 'bg-[#929BA3] text-white',
    };
  }

  if (type === 'fighting' || type === '2') {
    return {
      image: <img src={require('../imagens/types/fighting.png')}
      alt={type}
      className={widthImage}
    />,
    type:'2',
    name:"Lutador",
    color: '#E12C6A',
    class: 'bg-[#E12C6A] text-white',
    };
  }

  if (type === 'flying' || type === '3') {
    return {
      image: <img src={require('../imagens/types/flying.png')}
      alt={type}
      className={widthImage}
    />,
    type:'3',
    name:"Voador",
    color: '#9CD7F9',
    class: 'bg-[#9CD7F9] text-white',
    };
  }

  if (type === 'poison' || type === '4') {
    return {
      image: <img src={require('../imagens/types/poison.png')}
      alt={type}
      className={widthImage}
    />,
    type:'4',
    name:"Venenoso",
    color: '#B667CF',
    class: 'bg-[#B667CF] text-white',
    };
  }

  if (type === 'ground' || type === '5') {
    return {
      image: <img src={require('../imagens/types/ground.png')}
      alt={type}
      className={widthImage}
    />,
    type:'5',
    name:"Terrestre",
    color: '#E97333',
    class: 'bg-[#E97333] text-white',
    };
  }

  if (type === 'rock' || type === '6') {
    return {
      image: <img src={require('../imagens/types/rock.png')}
      alt={type}
      className={widthImage}
    />,
    type:'6',
    name:"Pedra",
    color: '#C9B787',
    class: 'bg-[#C9B787] text-white',
    };
  }

  if (type === 'bug' || type === '7') {
    return {
      image: <img src={require('../imagens/types/bug.png')}
      alt={type}
      className={widthImage}
    />,
    type:'7',
    name:"Inseto",
    color: '#84C400',
    class: 'bg-[#84C400] text-white',
    };
  }

  if (type === 'ghost' || type === '8') {
    return {
      image: <img src={require('../imagens/types/ghost.png')}
      alt={type}
      className={widthImage}
    />,
    type:'8',
    name:"Fantasma",
    color: '#4B6AB3',
    class: 'bg-[#4B6AB3] text-white',
    };
  }

  if (type === 'steel' || type === '9') {
    return {
      image: <img src={require('../imagens/types/steel.png')}
      alt={type}
      className={widthImage}
    />,
    type:'9',
    name:"Aço",
    color: '#5A8FA3',
    class: 'bg-[#5A8FA3] text-white',
    };
  }

  if (type === 'fire' || type === '10') {
    return {
      image: <img src={require('../imagens/types/fire.png')}
      alt={type}
      className={widthImage}
    />,
    type:'10',
    name:"Fogo",
    color: '#FF983F',
    class: 'bg-[#FF983F] text-white',
    };
  }

  if (type === 'water' || type === '11') {
    return {
      image: <img src={require('../imagens/types/water.png')}
      alt={type}
      className={widthImage}
    />,
    type:'11',
    name:"Água",
    color: '#3393DD',
    class: 'bg-[#3393DD] text-white',
    };
  }

  if (type === 'grass' || type === '12') {
    return {
      image: <img src={require('../imagens/types/grass.png')}
      alt={type}
      className={widthImage}
    />,
    type:'12',
    name:"Planta",
    color: '#35C04A',
    class: 'bg-[#35C04A] text-white',
    };
  }

  if (type === 'electric' || type === '13') {
    return {
      image: <img src={require('../imagens/types/electric.png')}
      alt={type}
      className={widthImage}
      />,
    type:'13',
    name:"Elétrico",
    color: '#FBD200',
    class: 'bg-[#FBD200] text-white',
    };
  }

  if (type === 'psychic' || type === '14') {
    return {
      image: <img src={require('../imagens/types/psychic.png')}
      alt={type}
      className={widthImage}
      />,
    type:'14',
    name:"Psíquico",
    color: '#FF6676',
    class: 'bg-[#FF6676] text-white',
    };
  }

  if (type === 'ice' || type === '15') {
    return {
      image: <img src={require('../imagens/types/ice.png')}
      alt={type}
      className={widthImage}
    />,
    type:'15',
    name:"Gelo",
    color: '#4BD2C1',
    class: 'bg-[#4BD2C1] text-white',
    };
  }

  if (type === 'dragon' || type === '16') {
    return {
      image: <img src={require('../imagens/types/dragon.png')}
      alt={type}
      className={widthImage}
    />,
    type:'16',
    name:"Dragão",
    color: '#006FCA',
    class: 'bg-[#006FCA] text-white',
    };
  }

  if (type === 'dark' || type === '17') {
    return {
      image: <img src={require('../imagens/types/dark.png')}
      alt={type}
      className={widthImage}
    />,
    type:'17',
    name:"Sombrio",
    color: '#5B5366',
    class: 'bg-[#5B5366] text-white',
    };
  }

  if (type === 'fairy' || type === '18') {
    return {
      image: <img src={require('../imagens/types/fairy.png')}
      alt={type}
      className={widthImage}
    />,
    type:'18',
    name:"Fada",
    color: '#FB8AEC',
    class: 'bg-[#FB8AEC] text-white',
    };
  }
};