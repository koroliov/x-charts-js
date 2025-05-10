import XCharts from '/dist/modules/main.js';
import '/dist/modules/components/pie-3d/main.js';

const xChartsConstructorArg = {
  containerDiv: document.getElementById('x-charts'),
  options: {
    //backgroundColor: '#3300ff' /* blue */,
    backgroundColor: '#ffffff' /* white */,
  },
};
const ins = new XCharts(xChartsConstructorArg);

const addComponentArg = {
  type: 'pie-3d',
  zIndex: '1',
  options: {
    thicknessPx: 50,
    radiusPx: 200,
    centerXPx: 400,
    centerYPx: 250,
    startAtDeg: 0,
    rotationAroundCenterXAxisDeg: 60,
    rotationAroundCenterZAxisDeg: 45,
  },
  data: [
    { value: 15, meta: { color: '#ff0000' /* red */, }, },
    { value: 4, meta: { color: '#37ff00' /* green */, }, },
    //{ value: 55, meta: { color: '#000aff' /* blue */, }, },
  ],
};
ins.add(addComponentArg);
