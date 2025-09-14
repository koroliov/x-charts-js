//@flow strict
import type { PieData, } from '../../../src/components/pie-3d/types.js';
import fs from 'fs';

type Arg = {
  +serverAbsFilePath: StringPrefix<'/test/served-tmp/'>,
  +actual: PieData,
  +expected: PieData,
  +canvasWidthPx: number,
  +canvasHeightPx: number,
  +drawHeads: boolean,
  +drawTails: boolean,
  +drawDotsHeads: boolean,
  +drawDotsTails: boolean,
  +drawLineToRightEdgeHeads: boolean,
  +drawLineToRightEdgeTails: boolean,
  +angleStartSliceIndex: number,
  +angleEndSliceIndex: number,
}

export function drawDataOnCanvas(arg: Arg) {
  const html = generateHtml();
  const filePath = generateContainerFilePath();
  fs.writeFileSync(filePath, html);

  function generateHtml() {
    const livereloadPort = process.env.LIVERELOAD_PORT;
    if (typeof livereloadPort === 'undefined') {
      throw new Error('No LIVERELOAD_PORT environment variable');
    }
    const jsString = generateJs();

    return `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>generated html</title>
        <meta name="google" content="notranslate">
        <link href="data:image/x-icon;base64," rel="icon" type="image/x-icon">
        <style>
          #container {
            display: flex;
          }
          canvas {
            width: ${ arg.canvasWidthPx }px;
            height: ${ arg.canvasHeightPx }px;
            border: 1px solid black;
            background-color: white;
            margin-right: 20px;
          }
          .notice {
            font-size: 2em;
            font-style: bold;
          }
        </style>
      </head>
      <body>
        <span>a dot marks the start of a slice.</span><br>
        <span>for hN, tN: h stands for heads, t stands for tails,
          N — the index of the slice</span><br>
        <span>the line is to the right edge</span>
        <div id="container">
          <div>
            <span>Actual${ arg.actual.isPieReversed ?
                ' <b class="notice">Reversed</b>' : '' }<span><br>
            <canvas id="actual" width="${ arg.canvasWidthPx }" height="${
              arg.canvasHeightPx }"></canvas>
          </div>
          <div>
            <span>Expected${ arg.expected.isPieReversed ?
                ' <b class="notice">Reversed</b>' : '' }<span><br>
            <canvas id="expected" width="${ arg.canvasWidthPx }" height="${
              arg.canvasHeightPx }"></canvas>
          </div>
        </div>
        <script>
          ${ jsString }
        </script>
        <script src="http://localhost:${ livereloadPort
          }/livereload.js"></script>
      </body>
      </html>
    `;

    function generateJs() {
      const drawHeads = String(arg.drawHeads);
      const drawTails = String(arg.drawTails);
      const drawDotsHeads = String(arg.drawDotsHeads);
      const drawDotsTails = String(arg.drawDotsTails);
      const drawLineToRightEdgeHeads = String(arg.drawLineToRightEdgeHeads);
      const drawLineToRightEdgeTails = String(arg.drawLineToRightEdgeTails);
      const angleStartI = arg.angleStartSliceIndex;
      const angleEndI = arg.angleEndSliceIndex;

      return `
        'use strict';
        const actual = ${ JSON.stringify(arg.actual) };
        const expected = ${ JSON.stringify(arg.expected) };
        const canvasActual = document.getElementById('actual');
        const canvasExpected = document.getElementById('expected');

        if (${ drawHeads }) {
          drawEllipse(canvasActual, actual, true);
          drawEllipse(canvasExpected, expected, true);
        }
        if (${ drawTails }) {
          drawEllipse(canvasActual, actual, false);
          drawEllipse(canvasExpected, expected, false);
        }
        if (${ drawDotsHeads }) {
          drawDots(canvasActual, actual, true);
          drawDots(canvasExpected, expected, true);
        }
        if (${ drawDotsTails }) {
          drawDots(canvasActual, actual, false);
          drawDots(canvasExpected, expected, false);
        }
        if (${ drawLineToRightEdgeHeads }) {
          drawLineFromCenterToRightEdge(canvasActual, actual, true);
          drawLineFromCenterToRightEdge(canvasExpected, expected, true);
        }
        if (${ drawLineToRightEdgeTails }) {
          drawLineFromCenterToRightEdge(canvasActual, actual, false);
          drawLineFromCenterToRightEdge(canvasExpected, expected, false);
        }

        function drawLineFromCenterToRightEdge(canvas, pieData, isHeads) {
          const ctx = canvas.getContext('2d');

          const cx = pieData[isHeads ? 'centerHeads' : 'centerTails'][0];
          const cy = pieData[isHeads ? 'centerHeads' : 'centerTails'][1];

          const rx = pieData.edgeRight[isHeads ?
            'pointHeads' : 'pointTails'][0];
          const ry = pieData.edgeRight[isHeads ?
            'pointHeads' : 'pointTails'][1];

          ctx.beginPath();
          drawLine();

          function drawLine() {
            ctx.moveTo(cx, cy);
            ctx.lineTo(rx, ry);
            ctx.stroke();
          }
        }

        function drawDots(canvas, pieData, isHeads) {
          const ctx = canvas.getContext('2d');

          drawCenterDot();
          pieData.slices.forEach((s, i) => {
            ctx.beginPath();
            const x = s[isHeads ? 'startPointHeads' : 'startPointTails'][0];
            const y = s[isHeads ? 'startPointHeads' : 'startPointTails'][1];
            drawSingleDot(x, y, (isHeads ? 'h' : 't') + i, s.faceColor);
          });

          function drawCenterDot() {
            ctx.beginPath();
            const x = pieData[isHeads ? 'centerHeads' : 'centerTails'][0];
            const y = pieData[isHeads ? 'centerHeads' : 'centerTails'][1];
            drawSingleDot(x, y, (isHeads ? 'hc' : 'tc'));
          }

          function drawSingleDot(x, y, text, color = 'black') {
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeText(text, x + 8, y);
          }
        }

        function drawEllipse(canvas, pieData, isHeads) {
          const ctx = canvas.getContext('2d');
          const { angleStart, angleEnd, } = getAngleArguments();
          ctx.beginPath();
          ctx.ellipse(
            pieData[isHeads ? 'centerHeads' : 'centerTails'][0],
            pieData[isHeads ? 'centerHeads' : 'centerTails'][1],
            pieData.ellipseMethodArgs.radiusX,
            pieData.ellipseMethodArgs.radiusY,
            pieData.ellipseMethodArgs.axesRotationCounterClockwise,
            angleStart,
            angleEnd,
            pieData.ellipseMethodArgs.isCounterClockwiseOnVisibleFace,
          );
          ctx.stroke();

          function getAngleArguments() {
            const angleStart = pieData.slices[${ angleStartI
              }].faceEllipseMethodArguments.startAngle;
            const angleEnd = pieData.slices[${ angleEndI
              }].faceEllipseMethodArguments.endAngle;
            return { angleStart, angleEnd, };
          }
        }
      `;
    }
  }

  function generateContainerFilePath() {
    const cwd = process.cwd();
    return `${ cwd }/${ arg.serverAbsFilePath }`;
  }
}
