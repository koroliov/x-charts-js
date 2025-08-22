import XCharts from '/dist/modules/main.js';
import '/dist/modules/components/pie-3d/main.js';

const xChartsConstructorArg = {
  containerDiv: document.getElementById('x-charts'),
  options: {
    //backgroundColor: '#3300ff' /* blue */,
    backgroundColor: '#ffffff' /* white */,
    isComponentInspectMode: false,
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
    startAtDeg: 130,
    rotationAroundCenterXAxisDeg: 70,
    rotationAroundCenterZAxisDeg: 0,
  },
  data: [
    { value: 25, meta: { color: '#37ff00' /* green */, }, },
    { value: 25, meta: { color: '#ff0000' /* red */, }, },
    { value: 50, meta: { color: '#f2b5f6' /* pinkish */, }, },
  ],
};
ins.add(addComponentArg);
