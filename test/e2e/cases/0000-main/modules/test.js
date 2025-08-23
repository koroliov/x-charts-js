import XCharts from '/dist/modules/main.js';
import '/dist/modules/components/pie-3d/main.js';
import '/dist/modules/components/legend/main.js';

const xChartsConstructorArg = {
  containerDiv: document.getElementById('x-charts'),
  options: {
    //backgroundColor: '#3300ff' /* blue */,
    backgroundColor: '#ffffff' /* white */,
    isComponentInspectMode: true,
  },
};
const ins = new XCharts(xChartsConstructorArg);

const addMethodArg = {
  type: 'pie-3d',
  zIndex: '1',
  options: {
    thicknessPx: 50,
    radiusPx: 200,
    centerXPx: 400,
    centerYPx: 300,
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
ins.add(addMethodArg);

const addMethodArgLegend = {
  type: 'legend',
  zIndex: '2',
  htmlFragment: `
    <style>
      .root {
        direction: ltr;
        background-color: transparent;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: end;
      }
      .legend {
        background-color: white;
        display: inline-block;
        text-align: start;
        width: 200px;
        border: 1px solid black;
        padding: 1em 1em 0;
        overflow: hidden;
        margin: 1em;
        font-size: 0.8em;
        font-family: sans-serif;
      }
      .header {
        font-size: 1.3em;
        font-weight: bold;
        margin-bottom: 1em;
      }
      .header > span {
        font-size: 0.8em;
        font-weight: normal;
      }
      .row {
        line-height: 1.2em;
        display: block;
        margin: 0.5em 0;
      }
      .marker {
        content: '';
        float: inline-start;
        clear: both;
        width: 2em;
        height: 0.8em;
        margin-inline-end: 1em;
        margin-top: 0.2em;
        margin-bottom: 0.3em;
        border: 1px solid black;
      }
    </style>
    <div class="root">
      <div class="legend">
        <div class="header">
          Oil producers<br>
          <span>(ml barrels per year)</span>
        </div>
        <div class="row">
          <div class="marker"></div>
          USA, 4,890
        </div>
        <div class="row">
          <div class="marker"></div>
          Saudi Arabia, 4,130
        </div>
        <div class="row">
          <div class="marker"></div>
          Russia, 3,940
        </div>
        <div class="row">
          <div class="marker"></div>
          Canada, 1,730
        </div>
        <div class="row">
          <div class="marker"></div>
          Iraq, 1,510
        </div>
        <div class="row">
          <div class="marker"></div>
          China, 1,090
        </div>
        <div class="row">
          <div class="marker"></div>
          United Arab Emirates, 1,070
        </div>
      </div>
    </div>
  `,
};
ins.add(addMethodArgLegend);
