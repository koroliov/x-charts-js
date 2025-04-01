import XCharts from '/dist/modules/main.js';
import '/dist/modules/components/pie-3d/main.js';

const ins = new XCharts({
  containerDiv: document.getElementById('x-charts'),
  options: {
    backgroundColor: '#f7ffff',
  },
});
ins.add({
  type: 'pie-3d',
  zIndex: '1',
  options: {
    thickness: '50px',
    radius: '500px',
    centerX: '400px',
    centerY: '300px',
    rotationAroundCenterXAxis: '60deg',
    rotationAroundCenterZAxis: '45deg',
  },
  data: [
    { value: 40, meta: { color: '#ff0000', }, },
    { value: 25, meta: { color: '#37ff00', }, },
    { value: 35, meta: { color: '#000aff', }, },
  ],
});
