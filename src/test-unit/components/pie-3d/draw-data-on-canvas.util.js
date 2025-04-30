//@flow strict
import type { PieData, } from '../../../components/pie-3d/types.js';
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
        </style>
      </head>
      <body>
        <span>a dot marks the start of a slice</span>
        <div id="container">
          <div>
            <span>Actual<span><br>
            <canvas id="actual" width="${ arg.canvasWidthPx }" height="${
              arg.canvasHeightPx }"></canvas>
          </div>
          <div>
            <span>Expected<span><br>
            <canvas id="expected" width="${ arg.canvasWidthPx }" height="${
              arg.canvasHeightPx }"></canvas>
          </div>
        </div>
        <script>
          ${ jsString }
        </script>
        <script src="http://localhost:${ livereloadPort
          }/livereload.js?snipver=1"></script>
      </body>
      </html>
    `;

    function generateJs() {
      const drawHeads = String(Boolean(arg.drawHeads));
      const drawTails = String(Boolean(arg.drawTails));
      const drawDotsHeads = String(Boolean(arg.drawDotsHeads));
      const drawDotsTails = String(Boolean(arg.drawDotsTails));

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

        function drawDots(canvas, pieData, isHeads) {
          const ctx = canvas.getContext('2d');
          pieData.slices.forEach((s, i) => {
            ctx.beginPath();
            const x = s[isHeads ? 'startPointHeads' : 'startPointTails'][0];
            const y = s[isHeads ? 'startPointHeads' : 'startPointTails'][1];
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.fill();
            ctx.strokeText(i, x + 8, y);
          });
        }

        function drawEllipse(canvas, pieData, isHeads) {
          const ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.ellipse(
            pieData[isHeads ? 'centerHeads' : 'centerTails'][0],
            pieData[isHeads ? 'centerHeads' : 'centerTails'][1],
            pieData.someEllipseMethodArgs.radiusX,
            pieData.someEllipseMethodArgs.radiusY,
            pieData.someEllipseMethodArgs.rotationClockwise,
            0,
            Math.PI * 2,
          );
          ctx.stroke();
        }
      `;
    }
  }

  function generateContainerFilePath() {
    const cwd = process.cwd();
    return `${ cwd }/${ arg.serverAbsFilePath }`;
  }
}
