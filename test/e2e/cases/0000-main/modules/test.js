import XCharts from '/dist/modules/main.js';
import '/dist/modules/components/pie-3d/main.js';

const xChartsConstructorArg = {
  containerDiv: document.getElementById('x-charts'),
  options: {
    backgroundColor: '#f7ffff',
  },
};
const ins = new XCharts(xChartsConstructorArg);

const addComponentArg = {
  type: 'pie-3d',
  zIndex: '1',
  options: {
    thicknessPx: 50,
    radiusPx: 500,
    centerXPx: 400,
    centerYPx: 300,
    rotationAroundCenterXAxisDeg: 60,
    rotationAroundCenterZAxisDeg: 45,
  },
  data: [
    { value: 40, meta: { color: '#ff0000', }, },
    { value: 25, meta: { color: '#37ff00', }, },
    { value: 35, meta: { color: '#000aff', }, },
  ],
};
ins.add(addComponentArg);
