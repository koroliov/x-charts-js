//      strict
import { prepareData, } from './prepare-data.js';
import { prepareRimSlicesData, } from './prepare-rim-slices-data.js';
                                                                      
                                             

export function draw(arg   
                                
                                             
 ) {
  const { addComponentArg, ctx, } = arg;
  const pieData = prepareData(addComponentArg);
  ctx.lineWidth = 0.5;
  if (!pieData.isHeadsVisibleToUser && !pieData.isTailsVisibleToUser) {
  } else {
    const isHeads = pieData.isHeadsVisibleToUser;
    const rimSlicesData = prepareRimSlicesData(pieData);
    processFace({ isHeads, action: 'fill', });
    processRimElliptic({ rimSlicesData, action: 'fill', });
    processFace({ isHeads, action: 'stroke', });
    processRimElliptic({ rimSlicesData, action: 'stroke', });
  }

  function processRimElliptic(arg   
                                                           
                              
   ) {
    if (!pieData.isRimVisibleToUser) {
      return;
    }
    arg.rimSlicesData.forEach((sd, i) => {
      ctx.beginPath();
      ctx.moveTo(sd.pointStartOnVisibleFace[0], sd.pointStartOnVisibleFace[1]);
      ctx.lineTo(sd.pointStartOnInvisibleFace[0],
        sd.pointStartOnInvisibleFace[1]);
      drawEllipse(sd.ellipseArgumentsOnInvisibleFace);
      if (arg.action === 'stroke') {
        ctx.stroke();
      }
      ctx.lineTo(sd.pointEndOnInvisibleFace[0], sd.pointEndOnInvisibleFace[1]);
      drawEllipse(sd.ellipseArgumentsOnVisibleFace);
      ctx.closePath();
      if (arg.action === 'fill') {
        ctx.fillStyle = sd.color;
        ctx.fill();
      }
    });

    function drawEllipse(ellipsArg             
                                                                       ) {

      ctx.ellipse(
        ellipsArg.centerX,
        ellipsArg.centerY,
        ellipsArg.radiusX,
        ellipsArg.radiusY,
        ellipsArg.axesRotationCounterClockwise,
        ellipsArg.angleStart,
        ellipsArg.angleEnd,
        ellipsArg.isCounterClockwise,
      );
    }
  }

  function processFace(arg   
                     
                              
   ) {
    const centerPointPropName = arg.isHeads ? 'centerHeads' : 'centerTails';
    const startPointPropName = arg.isHeads ? 'startPointHeads' :
      'startPointTails';
    pieData.slices.forEach(processSlice);

    function processSlice(s                          , i        ) {
      ctx.moveTo(pieData[centerPointPropName][0],
        pieData[centerPointPropName][1]);
      ctx.beginPath();
      ctx.lineTo(s[startPointPropName][0], s[startPointPropName][1]);
      ctx.ellipse(
        pieData[centerPointPropName][0],
        pieData[centerPointPropName][1],
        pieData.someEllipseMethodArgs.radiusX,
        pieData.someEllipseMethodArgs.radiusY,
        pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
        s.startAngleOnEllipseClockwise,
        s.endAngleOnEllipseClockwise,
        pieData.someEllipseMethodArgs.isCounterClockwiseOnVisibleFace,
      );
      ctx.lineTo(pieData[centerPointPropName][0],
        pieData[centerPointPropName][1]);
      if (arg.action === 'fill') {
        ctx.fillStyle = s.color;
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
}
