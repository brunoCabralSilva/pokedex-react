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
        return 'Ataque Especial';
      case 'special-defense':
        return 'Defesa Especial';
      case 'speed':
        return 'Velocidade';
      default:
    return null;
    }
  });
console.log(color);
  const arrayValores = data && data.map((d) => d.base_stat);

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
        colors: ['#fff']
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
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: secondaryColor,
        type: "horizontal",
        shadeIntensity: 0.8,
        gradientToColors: secondaryColor,
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 0.7,
        stops: [0, 50, 100],
        colorStops: []
      }
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
  