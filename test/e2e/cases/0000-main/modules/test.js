import XCharts from '/dist/modules/main.js';
import '/dist/modules/components/pie-3d/main.js';
import '/dist/modules/components/legend/main.js';


const xChartsConstructorArg = {
  containerDiv: document.getElementById('x-charts-js'),
  options: {
    //backgroundColor: '#3300ff' /* blue */,
    backgroundColor: '#ffffff' /* white */,
    isComponentInspectMode: false,
  },
};
const ins = new XCharts(xChartsConstructorArg);

const data = getData();
const addMethodArgPie3d = getAddMethodArgPie3d(data);
ins.add(addMethodArgPie3d);

const addMethodArgLegend = getAddMethodArgLegend(data);
ins.add(addMethodArgLegend);

function getAddMethodArgLegend(data) {
  const rows = data.reduce((s, d) => {
    return s + `
      <div class="row">
        <div class="marker" style="background-color: ${ d.faceColor }"></div>
        ${ d.label }, ${ d.value.toLocaleString() }
      </div>
    `;
  }, '');
  return {
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
          margin-top: 0.1em;
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
          ${ rows }
        </div>
      </div>
    `,
  };
}

function getData() {
  return [
    { label: 'USA',                  value: 4890,
      faceColor: '#af9760' /* brown */,
      rimColor: '#93793d', },
    { label: 'Saudi Arabia',         value: 4130,
      faceColor: '#b7b872' /* golden-brown */,
      rimColor: '#9fa046', },
    { label: 'Russia',               value: 3940,
      faceColor: '#e4c5c5' /* grey-pinkish */,
      rimColor: '#c99e9e', },
    { label: 'Canada',               value: 1730,
      faceColor: '#9dd999' /* light-green */,
      rimColor: '#54a94f', },
    { label: 'Iraq',                 value: 1510,
      faceColor: '#b4b605' /* golden */,
      rimColor: '#929416', },
    { label: 'China',                value: 1090,
      faceColor: '#eef07a' /* yellow */,
      rimColor: '#b7b93d', },
    { label: 'United Arab Emirates', value: 1070,
      faceColor: '#b3a4b5' /* violet-grey */,
      rimColor: '#99759d', },
  ];
}

function getAddMethodArgPie3d(data) {
  return {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 30,
      radiusPx: 200,
      centerXPx: 400,
      centerYPx: 300,
      startAtDeg: 0,
      rotationAroundCenterXAxisDeg: 50,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: data.map((d) => {
      return {
        value: d.value,
        meta: { faceColor: d.faceColor, rimColor: d.rimColor, },
      };
    }),
  };
}
