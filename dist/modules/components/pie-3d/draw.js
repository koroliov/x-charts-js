//      strict
import { prepareData, } from './prepare-data.js';
import { prepareRimSlicesData, } from './prepare-rim-slices-data.js';
                                                             

export function draw(arg   
                                
                                             
 ) {
  const { addComponentArg, ctx, } = arg;
  const pieData = prepareData(addComponentArg);
  ctx.lineWidth = 0.5;
  const rimSlicesData = prepareRimSlicesData(pieData);
  if (!pieData.isHeadsVisibleToUser && !pieData.isTailsVisibleToUser) {
    processRimBar({ action: 'fill', });
    processRimBar({ action: 'stroke', });
  } else {
    const isHeads = pieData.isHeadsVisibleToUser;
    processFace({ isHeads, action: 'fill', });
    processRimElliptic({ isHeadsVisible: isHeads, rimSlicesData,
      action: 'fill', });
    processFace({ isHeads, action: 'stroke', });
    processRimElliptic({ isHeadsVisible: isHeads, rimSlicesData,
      action: 'stroke', });
  }

  function processRimBar(arg                                ) {
    const isFill = arg.action === 'fill';
    const isStroke = !isFill;
    rimSlicesData.forEach((sd, i) => {
      ctx.beginPath();
      ctx.moveTo(sd.pointEndOnHeads[0], sd.pointEndOnHeads[1]);
      ctx.lineTo(sd.pointStartOnHeads[0], sd.pointStartOnHeads[1]);
      ctx.lineTo(sd.pointStartOnTails[0], sd.pointStartOnTails[1]);
      ctx.lineTo(sd.pointEndOnTails[0], sd.pointEndOnTails[1]);
      if (isStroke && i < rimSlicesData.length - 1) {
        ctx.stroke();
      }
      ctx.lineTo(sd.pointEndOnHeads[0], sd.pointEndOnHeads[1]);
      if (isStroke && i === rimSlicesData.length - 1) {
        ctx.stroke();
      }
      if (isFill) {
        ctx.fillStyle = sd.color;
        ctx.fill();
      }
    });
  }

  function processRimElliptic(arg   
                            
                                                           
                              
   ) {
    if (!pieData.isRimVisibleToUser) {
      return;
    }
    const isFill = arg.action === 'fill';
    const isStroke = !isFill;
    const isHeadsVisible = arg.isHeadsVisible;
    arg.rimSlicesData.forEach(drawSlice);

    function drawSlice(sd                             , i        ) {
      const {
        pointStartOnVisibleFace,
        pointStartOnInvisibleFace,
        pointEndOnVisibleFace,
        pointEndOnInvisibleFace,
        ellipseArgumentsOnInvisibleFace,
        ellipseArgumentsOnVisibleFace,
      } = getPropNames();

      ctx.beginPath();
      ctx.moveTo(sd[pointStartOnVisibleFace][0],
        sd[pointStartOnVisibleFace][1]);
      ctx.lineTo(sd[pointStartOnInvisibleFace][0],
        sd[pointStartOnInvisibleFace][1]);
      drawEllipse(sd[ellipseArgumentsOnInvisibleFace]);
      if (isStroke && i !== arg.rimSlicesData.length - 1) {
        ctx.stroke();
      }
      ctx.lineTo(sd[pointEndOnVisibleFace][0], sd[pointEndOnVisibleFace][1]);
      if (isStroke && i === arg.rimSlicesData.length - 1) {
        ctx.stroke();
      }
      drawEllipse(sd[ellipseArgumentsOnVisibleFace]);
      ctx.closePath();
      if (isFill) {
        ctx.fillStyle = sd.color;
        ctx.fill();
      }

      function getPropNames() {
        if (isHeadsVisible) {
          return {
            pointStartOnVisibleFace: 'pointStartOnHeads',
            pointStartOnInvisibleFace: 'pointStartOnTails',
            pointEndOnVisibleFace: 'pointEndOnHeads',
            pointEndOnInvisibleFace: 'pointEndOnTails',
            ellipseArgumentsOnInvisibleFace: 'ellipseArgumentsOnTails',
            ellipseArgumentsOnVisibleFace: 'ellipseArgumentsOnHeads',
          };
        } else {
          return {
            pointStartOnVisibleFace: 'pointStartOnTails',
            pointStartOnInvisibleFace: 'pointStartOnHeads',
            pointEndOnVisibleFace: 'pointEndOnTails',
            pointEndOnInvisibleFace: 'pointEndOnHeads',
            ellipseArgumentsOnInvisibleFace: 'ellipseArgumentsOnHeads',
            ellipseArgumentsOnVisibleFace: 'ellipseArgumentsOnTails',
          };
        }
      }
    }

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
    if (pieData.slices.length === 1) {
      return processSliceWhenOnlyOne();
    }
    const startPointPropName = arg.isHeads ? 'startPointHeads' :
      'startPointTails';
    pieData.slices.forEach(processSliceWhenMultiple);

    function processSliceWhenOnlyOne() {
      const s = pieData.slices[0];
      ctx.beginPath();
      ctx.ellipse(
        pieData[centerPointPropName][0],
        pieData[centerPointPropName][1],
        pieData.ellipseMethodArgs.radiusX,
        pieData.ellipseMethodArgs.radiusY,
        pieData.ellipseMethodArgs.axesRotationCounterClockwise,
        0,
        Math.PI * 2,
        false,
      );
      if (arg.action === 'fill') {
        ctx.fillStyle = s.color;
        ctx.fill();
      } else {
        ctx.stroke();
      }
      return;
    }

    function processSliceWhenMultiple(s                          , i        ) {
      ctx.moveTo(pieData[centerPointPropName][0],
        pieData[centerPointPropName][1]);
      ctx.beginPath();
      ctx.lineTo(s[startPointPropName][0], s[startPointPropName][1]);
      ctx.ellipse(
        pieData[centerPointPropName][0],
        pieData[centerPointPropName][1],
        pieData.ellipseMethodArgs.radiusX,
        pieData.ellipseMethodArgs.radiusY,
        pieData.ellipseMethodArgs.axesRotationCounterClockwise,
        s.faceEllipseMethodArguments.startAngle,
        s.faceEllipseMethodArguments.endAngle,
        pieData.ellipseMethodArgs.isCounterClockwiseOnVisibleFace,
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
