import ReactApexChart from 'react-apexcharts';

export default function Charts({ data, color }) { 
  const primaryColor = color && color[0];
  const secondaryColor = color && color[1];
  const arrayNomes = data && data.map((d) => d.stat.name).map((stat) => {
    switch(stat) {
      case 'hp':
        return 'Hp';
      case 'attack':
        return 'Ataque';
      case 'defense':
        return 'Defesa';
      case 'special-attack':
        return 'Atk. Especial';
      case 'special-defense':
        return 'Def. Especial';
      case 'speed':
        return 'Velocidade';
      default:
    return null;
    }
  });
  const arrayValores = data && data.map((d) => d.base_stat);

  const returnMaxValue = () => {
    let maxValue = 0;
    for (let i = 0; i < arrayValores.length; i += 1) {
      if (arrayValores[i] > maxValue) maxValue = arrayValores[i];
    };
    return maxValue;
  }

  const series = [{
    data: arrayValores,
  }];


  const options = {
    chart: {
      type: 'bar',
      height: 380
    },
    plotOptions: {
      bar: {
        barHeight: '85%',
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        },
      }
    },
    colors: [primaryColor],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff'],
        fontSize: "16px",
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + " - " + val
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    xaxis: {
      categories: arrayNomes,
      labels: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: arrayValores && returnMaxValue(),
      labels: {
        show: false
      }
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return '';
          }
        }
      }
    },
  };

  return (
      <ReactApexChart
        options={ options }
        series={ series }
        type="bar"
        height='500'
      />
  );
}
  