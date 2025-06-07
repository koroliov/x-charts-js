//@flow strict
import type { RimSlicesData, } from '../../../components/pie-3d/types.js';
import fs from 'fs';

type Arg = {
  +serverAbsFilePath: StringPrefix<'/test/served-tmp/'>,
  +actual: RimSlicesData,
  +expected: RimSlicesData,
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
          if (!rimSlicesData?.[0]?.ellipseArgumentsOnHeads) {
            rimSlicesData.forEach((rsd) => {
              ctx.beginPath();
              ctx.moveTo(rsd.pointStartOnHeads[0], rsd.pointStartOnHeads[1]);
              ctx.lineTo(rsd.pointStartOnTails[0], rsd.pointStartOnTails[1]);
              ctx.lineTo(rsd.pointEndOnTails[0], rsd.pointEndOnTails[1]);
              ctx.lineTo(rsd.pointEndOnHeads[0], rsd.pointEndOnHeads[1]);
              ctx.lineTo(rsd.pointStartOnHeads[0], rsd.pointStartOnHeads[1]);
              ctx.fillStyle = rsd.color;
              ctx.fill();
            });
          } else {
            rimSlicesData.forEach((rsd) => {
              ctx.beginPath();
              ctx.moveTo(rsd.pointStartOnHeads[0], rsd.pointStartOnHeads[1]);
              ctx.lineTo(rsd.pointStartOnTails[0], rsd.pointStartOnTails[1]);
              ctx.ellipse(
                rsd.ellipseArgumentsOnTails.centerX,
                rsd.ellipseArgumentsOnTails.centerY,
                rsd.ellipseArgumentsOnTails.radiusX,
                rsd.ellipseArgumentsOnTails.radiusY,
                rsd.ellipseArgumentsOnTails
                  .axesRotationCounterClockwise,
                rsd.ellipseArgumentsOnTails.angleStart,
                rsd.ellipseArgumentsOnTails.angleEnd,
                rsd.ellipseArgumentsOnTails.isCounterClockwise,
              );
              ctx.lineTo(rsd.pointEndOnHeads[0], rsd.pointEndOnHeads[1]);
              ctx.ellipse(
                rsd.ellipseArgumentsOnHeads.centerX,
                rsd.ellipseArgumentsOnHeads.centerY,
                rsd.ellipseArgumentsOnHeads.radiusX,
                rsd.ellipseArgumentsOnHeads.radiusY,
                rsd.ellipseArgumentsOnHeads.axesRotationCounterClockwise,
                rsd.ellipseArgumentsOnHeads.angleStart,
                rsd.ellipseArgumentsOnHeads.angleEnd,
                rsd.ellipseArgumentsOnHeads.isCounterClockwise,
              );
              ctx.fillStyle = rsd.color;
              ctx.fill();
            });
            drawEllipse(true);
            drawEllipse(false);
          }

          function drawEllipse(isVisible) {
            const propName = isVisible ? 'ellipseArgumentsOnHeads' :
              'ellipseArgumentsOnTails';

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
