//      strict
import { prepareData, } from './prepare-data.js';
                                                                      
                                             

export function draw(arg   
                                
                                             
 ) {
  const { addComponentArg, ctx, } = arg;
  const pieData = prepareData(addComponentArg);
  ctx.lineWidth = 0.5;
  if (!pieData.isHeadsVisibleToUser && !pieData.isTailsVisibleToUser) {
  } else {
    const isHeads = pieData.isHeadsVisibleToUser;
    processFace({ isHeads, action: 'fill', });
    processRimElliptic({ isHeadsVisible: isHeads, action: 'fill', });
    processFace({ isHeads, action: 'stroke', });
    processRimElliptic({ isHeadsVisible: isHeads, action: 'stroke', });
  }

  function processRimElliptic(arg   
                            
                              
   ) {
    if (!pieData.isRimVisibleToUser) {
      return;
    }
    const centerPointPropName = arg.isHeadsVisible ?
      'centerHeads' : 'centerTails';

    const sliceStartIndex = pieData.edgeLeft.sliceIndex;
    const sliceEndIndex = pieData.edgeRight.sliceIndex;
    if (sliceStartIndex === sliceEndIndex) {
      drawRightSlice();
    } else {
      drawLeftSlice();
      drawMiddleSlices();
      drawRightSlice();
    }

    function drawRightSlice() {
      const sliceEnd = pieData.slices[pieData.edgeRight.sliceIndex];
      const edgeLineStartPointPropName = arg.isHeadsVisible ?
        'pointHeads' : 'pointTails';
      const edgeLineEndPointPropName = arg.isHeadsVisible ?
        'pointTails' : 'pointHeads';

      ctx.beginPath();
      ctx.moveTo(sliceEnd.startPointHeads[0], sliceEnd.startPointHeads[1]);
      ctx.lineTo(sliceEnd.startPointTails[0], sliceEnd.startPointTails[1]);

      drawEllipse(true);
      const sliceEndLineToPointPropName = arg.isHeadsVisible ?
        'endPointHeads' : 'endPointTails';
      ctx.lineTo(pieData.edgeRight.pointHeads[0],
        pieData.edgeRight.pointHeads[1]);
      if (arg.action === 'stroke') {
        ctx.stroke();
      }

      drawEllipse(false);

      if (arg.action === 'fill') {
        ctx.fillStyle = sliceEnd.color;
        ctx.fill();
      }

      function drawEllipse(isForward         ) {
        const centerPointPropName = getCenterPOintPropName();
        const isCc =
          pieData.someEllipseMethodArgs.isCounterClockwiseOnVisibleFace;
        ctx.ellipse(
          pieData[centerPointPropName][0],
          pieData[centerPointPropName][1],
          pieData.someEllipseMethodArgs.radiusX,
          pieData.someEllipseMethodArgs.radiusY,
          pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
          isForward ? sliceEnd.startAngleOnEllipseClockwise : 0,
          !isForward ? sliceEnd.startAngleOnEllipseClockwise : 0,
          isForward ? isCc : !isCc,
        );

        function getCenterPOintPropName() {
          if (arg.isHeadsVisible) {
            return isForward ? 'centerTails' : 'centerHeads';
          } else {
            return !isForward ? 'centerHeads' : 'centerTails';
          }
        }
      }
    }

    function drawMiddleSlices() {
      const sliceStartIndex = pieData.edgeLeft.sliceIndex;
      const sliceEndIndex = pieData.edgeRight.sliceIndex;

      for (let i = sliceStartIndex + 1; i < sliceEndIndex; i++) {
        const slice = pieData.slices[i];
        ctx.beginPath();
        ctx.moveTo(slice.startPointHeads[0], slice.startPointHeads[1]);
        ctx.lineTo(slice.startPointTails[0], slice.startPointTails[1]);

        let centerPointPropName = arg.isHeadsVisible ?
          'centerTails' : 'centerHeads';
        ctx.ellipse(
          pieData[centerPointPropName][0],
          pieData[centerPointPropName][1],
          pieData.someEllipseMethodArgs.radiusX,
          pieData.someEllipseMethodArgs.radiusY,
          pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
          slice.startAngleOnEllipseClockwise,
          slice.endAngleOnEllipseClockwise,
          pieData.someEllipseMethodArgs.isCounterClockwiseOnVisibleFace,
        );
        if (arg.action === 'stroke') {
          ctx.stroke();
        }

        ctx.lineTo(slice.endPointHeads[0], slice.endPointHeads[1]);

        centerPointPropName = arg.isHeadsVisible ?
          'centerHeads' : 'centerTails';
        ctx.ellipse(
          pieData[centerPointPropName][0],
          pieData[centerPointPropName][1],
          pieData.someEllipseMethodArgs.radiusX,
          pieData.someEllipseMethodArgs.radiusY,
          pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
          slice.endAngleOnEllipseClockwise,
          slice.startAngleOnEllipseClockwise,
          !pieData.someEllipseMethodArgs.isCounterClockwiseOnVisibleFace,
        );
        ctx.closePath();

        if (arg.action === 'fill') {
          ctx.fillStyle = slice.color;
          ctx.fill();
        }
      }
    }

    function drawLeftSlice() {
      const sliceStart = pieData.slices[pieData.edgeLeft.sliceIndex];
      const edgeLineStartPointPropName = arg.isHeadsVisible ?
        'pointHeads' : 'pointTails';
      const edgeLineEndPointPropName = arg.isHeadsVisible ?
        'pointTails' : 'pointHeads';

      ctx.beginPath();
      ctx.moveTo(pieData.edgeLeft[edgeLineStartPointPropName][0],
        pieData.edgeLeft[edgeLineStartPointPropName][1]);
      ctx.lineTo(pieData.edgeLeft[edgeLineEndPointPropName][0],
        pieData.edgeLeft[edgeLineEndPointPropName][1]);

      let centerPointPropName = arg.isHeadsVisible ?
        'centerTails' : 'centerHeads';
      ctx.ellipse(
        pieData[centerPointPropName][0],
        pieData[centerPointPropName][1],
        pieData.someEllipseMethodArgs.radiusX,
        pieData.someEllipseMethodArgs.radiusY,
        pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
        Math.PI,
        sliceStart.endAngleOnEllipseClockwise,
        pieData.someEllipseMethodArgs.isCounterClockwiseOnVisibleFace,
      );
      if (arg.action === 'stroke') {
        ctx.stroke();
      }
      const sliceEndLineToPointPropName = arg.isHeadsVisible ?
        'endPointHeads' : 'endPointTails';
      ctx.lineTo(sliceStart[sliceEndLineToPointPropName][0],
        sliceStart[sliceEndLineToPointPropName][1]);

      centerPointPropName = arg.isHeadsVisible ?
        'centerHeads' : 'centerTails';
      ctx.ellipse(
        pieData[centerPointPropName][0],
        pieData[centerPointPropName][1],
        pieData.someEllipseMethodArgs.radiusX,
        pieData.someEllipseMethodArgs.radiusY,
        pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
        sliceStart.endAngleOnEllipseClockwise,
        Math.PI,
        !pieData.someEllipseMethodArgs.isCounterClockwiseOnVisibleFace,
      );

      if (arg.action === 'fill') {
        ctx.fillStyle = sliceStart.color;
        ctx.fill();
      }
    }

    function drawRimSlice(sliceIndex        , isHeadsVisible         ) {
      const slice = pieData.slices[sliceIndex];
      const {
        pointStartOnVisibleFace,
        pointStartOnInvisibleFace,
        centerPointOnVisibleFace,
        centerPointOnInvisibleFace,
        pointEndOnVisibleFace,
        pointEndOnInvisibleFace,
        startAngle,
        endAngle,
      } = getData();

      ctx.beginPath();
      ctx.moveTo(pointStartOnVisibleFace[0], pointStartOnVisibleFace[1]);
      ctx.lineTo(pointStartOnInvisibleFace[0], pointStartOnInvisibleFace[1]);
      drawEllipse(true);

      //get pointStartOnVisibleFace
      //get pointStartOnInvisibleFace
      //ellipseOnInvisibleFace
      //get pointEndOnInvisibleFace
      //get pointEndOnInvisibleFace
      //ellipseOnVisibleFace

      function drawEllipse(isForward         ) {
        const centerPointPropName = getCenterPOintPropName();
        const isCc =
          pieData.someEllipseMethodArgs.isCounterClockwiseOnVisibleFace;
        const centerPoint = isForward ?
          centerPointOnVisibleFace : centerPointOnInvisibleFace;

        //ctx.ellipse(
        //  centerPoint[0],
        //  centerPoint[1],
        //  pieData.someEllipseMethodArgs.radiusX,
        //  pieData.someEllipseMethodArgs.radiusY,
        //  pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
        //  isForward ? sliceEnd.startAngleOnEllipseClockwise : 0,
        //  !isForward ? sliceEnd.startAngleOnEllipseClockwise : 0,
        //  isForward ? isCc : !isCc,
        //);

        function getCenterPOintPropName() {
          if (arg.isHeadsVisible) {
            return isForward ? 'centerTails' : 'centerHeads';
          } else {
            return !isForward ? 'centerHeads' : 'centerTails';
          }
        }
      }

      function getData() {
        const retVal   
                                         
                                           
                                          
                                            
                                       
                                         
                             
                           
          = {
          pointStartOnVisibleFace: [0, 0, 0,],
          pointStartOnInvisibleFace: [0, 0, 0,],
          centerPointOnVisibleFace: pieData[isHeadsVisible ?
            'centerHeads' : 'centerTails'],
          centerPointOnInvisibleFace: pieData[isHeadsVisible ?
            'centerTails' : 'centerHeads'],
          pointEndOnVisibleFace: [0, 0, 0,],
          pointEndOnInvisibleFace: [0, 0, 0,],
          startAngle: 0,
          endAngle: 0,
        };
        if (sliceIndex === pieData.edgeLeft.sliceIndex) {
          retVal.pointStartOnVisibleFace = pieData.edgeLeft[isHeadsVisible ?
            'pointHeads' : 'pointTails'];
          retVal.pointStartOnInvisibleFace = pieData.edgeLeft[isHeadsVisible ?
            'pointTails' : 'pointHeads' ];
          retVal.startAngle = Math.PI;
        } else if (sliceIndex === pieData.edgeRight.sliceIndex) {
          retVal.pointStartOnVisibleFace = pieData.edgeRight[isHeadsVisible ?
            'pointHeads' : 'pointTails'];
          retVal.pointStartOnInvisibleFace = pieData.edgeRight[isHeadsVisible ?
            'pointTails' : 'pointHeads' ];
        } else {
          retVal.pointStartOnVisibleFace = slice[isHeadsVisible ?
            'startPointHeads' : 'startPointTails'];
          retVal.pointStartOnInvisibleFace = slice[isHeadsVisible ?
            'startPointTails' : 'startPointHeads'];
        }
        return retVal;

        function getEndAngle() {
          //const currentSlice = pieData.slices[sliceIndex];
          //if (currentSlice.endAngleOnEllipseClockwise > ) {
          //  retVal.endAngle = currentSlice.endAngleOnEllipseClockwise;
          //}
          //const nextSlice = pieData.slices[sliceIndex + 1];
          //if (nextSlice.startAngleOnEllipseClockwise) {
          //}
        }
      }

      function getPointStartOnVisibleFace() {
        return isHeadsVisible ? slice.startPointHeads :
          slice.startPointTails;
      }
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
