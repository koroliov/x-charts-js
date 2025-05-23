//@flow strict
import type { RimSlicesDataFaceVisible, } from
  '../../../components/pie-3d/types.js';
import fs from 'fs';

type Arg = {
  +serverAbsFilePath: StringPrefix<'/test/served-tmp/'>,
  +actual: RimSlicesDataFaceVisible,
  +expected: RimSlicesDataFaceVisible,
  +canvasWidthPx: number,
  +canvasHeightPx: number,
}

export function drawRimSlicesDataOnCanvas(arg: Arg) {
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
      return `
        'use strict';
        const actual = ${ JSON.stringify(arg.actual) };
        const expected = ${ JSON.stringify(arg.expected) };
        const canvasActual = document.getElementById('actual');
        const canvasExpected = document.getElementById('expected');

        drawSlices(canvasActual, actual);
        drawSlices(canvasExpected, expected);

        function drawSlices(canvas, rimSlicesData, isHeads) {
          const ctx = canvas.getContext('2d');
          if (!rimSlicesData?.[0]?.ellipseArgumentsOnVisibleFace) {
            rimSlicesData.forEach((rsd) => {
              ctx.beginPath();
              ctx.moveTo(rsd.pointStartOnVisibleFace[0],
                rsd.pointStartOnVisibleFace[1]);
              ctx.lineTo(rsd.pointStartOnInvisibleFace[0],
                rsd.pointStartOnInvisibleFace[1]);
              ctx.lineTo(rsd.pointEndOnInvisibleFace[0],
                rsd.pointEndOnInvisibleFace[1]);
              ctx.lineTo(rsd.pointEndOnVisibleFace[0],
                rsd.pointEndOnVisibleFace[1]);
              ctx.lineTo(rsd.pointStartOnVisibleFace[0],
                rsd.pointStartOnVisibleFace[1]);
              ctx.fillStyle = rsd.color;
              ctx.fill();
            });
          } else {
            rimSlicesData.forEach((rsd) => {
              ctx.beginPath();
              ctx.moveTo(rsd.pointStartOnVisibleFace[0],
                rsd.pointStartOnVisibleFace[1]);
              ctx.lineTo(rsd.pointStartOnInvisibleFace[0],
                rsd.pointStartOnInvisibleFace[1]);
              ctx.ellipse(
                rsd.ellipseArgumentsOnInvisibleFace.centerX,
                rsd.ellipseArgumentsOnInvisibleFace.centerY,
                rsd.ellipseArgumentsOnInvisibleFace.radiusX,
                rsd.ellipseArgumentsOnInvisibleFace.radiusY,
                rsd.ellipseArgumentsOnInvisibleFace
                  .axesRotationCounterClockwise,
                rsd.ellipseArgumentsOnInvisibleFace.angleStart,
                rsd.ellipseArgumentsOnInvisibleFace.angleEnd,
                rsd.ellipseArgumentsOnInvisibleFace.isCounterClockwise,
              );
              ctx.lineTo(rsd.pointEndOnVisibleFace[0],
                rsd.pointEndOnVisibleFace[1]);
              ctx.ellipse(
                rsd.ellipseArgumentsOnVisibleFace.centerX,
                rsd.ellipseArgumentsOnVisibleFace.centerY,
                rsd.ellipseArgumentsOnVisibleFace.radiusX,
                rsd.ellipseArgumentsOnVisibleFace.radiusY,
                rsd.ellipseArgumentsOnVisibleFace.axesRotationCounterClockwise,
                rsd.ellipseArgumentsOnVisibleFace.angleStart,
                rsd.ellipseArgumentsOnVisibleFace.angleEnd,
                rsd.ellipseArgumentsOnVisibleFace.isCounterClockwise,
              );
              ctx.fillStyle = rsd.color;
              ctx.fill();
            });
            drawEllipse(true);
            drawEllipse(false);
          }

          function drawEllipse(isVisible) {
            const propName = isVisible ? 'ellipseArgumentsOnVisibleFace' :
              'ellipseArgumentsOnInvisibleFace';

            ctx.beginPath();
            ctx.ellipse(
              rimSlicesData[0][propName].centerX,
              rimSlicesData[0][propName].centerY,
              rimSlicesData[0][propName].radiusX,
              rimSlicesData[0][propName].radiusY,
              rimSlicesData[0][propName].axesRotationCounterClockwise,
              0,
              Math.PI * 2,
            );
            ctx.lineWidth = 0.1;
            ctx.stroke();
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
