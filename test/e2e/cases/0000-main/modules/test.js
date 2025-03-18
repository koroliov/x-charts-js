import XCharts from '/dist/modules/main.js';
import '/dist/modules/components/pie-3d.js';

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
    //
  },
  data: [
    //
  ],
});
