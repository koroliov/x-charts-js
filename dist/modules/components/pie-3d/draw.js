//      strict
                                           

export function draw(arg   
                                
                   
 ) {
  const { pieData, ctx, } = arg;
  ctx.lineWidth = 0.5;
  if (pieData.isHeadsVisibleToUser) {
    processFace({ isHeads: true, action: 'fill', });
    if (pieData.isRimVisibleToUser) {
      processRimElliptic({ isHeadsVisible: true, action: 'fill', });
    }
    processFace({ isHeads: true, action: 'stroke', });
    if (pieData.isRimVisibleToUser) {
      processRimElliptic({ isHeadsVisible: true, action: 'stroke', });
    }
  } else if (pieData.isTailsVisibleToUser) {
    processFace({ isHeads: false, action: 'fill', });
    if (pieData.isRimVisibleToUser) {
      processRimElliptic({ isHeadsVisible: false, action: 'fill', });
    }
    processFace({ isHeads: false, action: 'stroke', });
  } else if (pieData.isRimVisibleToUser) {
    //drawRim(false);
  }

  function processRimElliptic(arg   
                            
                              
   ) {
    const centerPointPropName = arg.isHeadsVisible ?
      'centerHeads' : 'centerTails';

    const sliceStart = pieData.slices[pieData.edgeLeft.sliceIndex];
    const sliceEnd = pieData.slices[pieData.edgeRight.sliceIndex];

    const sliceStartIndex = pieData.edgeLeft.sliceIndex;
    const sliceEndIndex = pieData.edgeRight.sliceIndex;
    //console.log('AA', sliceStartIndex, sliceEndIndex);
    if (sliceStartIndex === sliceEndIndex) {
      //draw 1 single rim
      //console.log('AA');
      drawRightSlice();
    } else {
      drawLeftSlice();
      drawMiddleSlices();
      drawRightSlice();
    }
    //draw left slice
    //draw middle slices
    //draw right slice

    function drawRightSlice() {
      const edgeLineStartPointPropName = arg.isHeadsVisible ?
        'pointHeads' : 'pointTails';
      const edgeLineEndPointPropName = arg.isHeadsVisible ?
        'pointTails' : 'pointHeads';

      //console.log(edgeLineStartPointPropName, edgeLineEndPointPropName);
      ctx.beginPath();
      ctx.moveTo(sliceEnd.startPointHeads[0], sliceEnd.startPointHeads[1]);
      ctx.lineTo(sliceEnd.startPointTails[0], sliceEnd.startPointTails[1]);

      let centerPointPropName = arg.isHeadsVisible ?
        'centerTails' : 'centerHeads';
      //console.log(centerPointPropName);
      ctx.ellipse(
        pieData[centerPointPropName][0],
        pieData[centerPointPropName][1],
        pieData.someEllipseMethodArgs.radiusX,
        pieData.someEllipseMethodArgs.radiusY,
        pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
        sliceEnd.startAngleOnEllipseClockwise,
        0,
        pieData.someEllipseMethodArgs.isCounterClockwise,
      );
      const sliceEndLineToPointPropName = arg.isHeadsVisible ?
        'endPointHeads' : 'endPointTails';
      ctx.lineTo(pieData.edgeRight.pointHeads[0],
        pieData.edgeRight.pointHeads[1]);
      if (arg.action === 'stroke') {
        ctx.stroke();
      }

      centerPointPropName = arg.isHeadsVisible ?
        'centerHeads' : 'centerTails';
      ctx.ellipse(
        pieData[centerPointPropName][0],
        pieData[centerPointPropName][1],
        pieData.someEllipseMethodArgs.radiusX,
        pieData.someEllipseMethodArgs.radiusY,
        pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
        0,
        sliceEnd.startAngleOnEllipseClockwise,
        !pieData.someEllipseMethodArgs.isCounterClockwise,
      );

      if (arg.action === 'fill') {
        ctx.fillStyle = sliceEnd.color;
        //console.log('filled');
        ctx.fill();
      //} else {
      //  //console.log('stroked');
      //  ctx.stroke();
      }
    }

    function drawMiddleSlices() {
      const sliceStartIndex = pieData.edgeLeft.sliceIndex;
      const sliceEndIndex = pieData.edgeRight.sliceIndex;

      for (let i = sliceStartIndex + 1; i < sliceEndIndex; i++) {
        const slice = pieData.slices[i];
        ctx.beginPath();
        //console.log('HERE');
        ctx.moveTo(slice.startPointHeads[0], slice.startPointHeads[1]);
        ctx.lineTo(slice.startPointTails[0], slice.startPointTails[1]);

        let centerPointPropName = arg.isHeadsVisible ?
          'centerTails' : 'centerHeads';
        //console.log(centerPointPropName);
        ctx.ellipse(
          pieData[centerPointPropName][0],
          pieData[centerPointPropName][1],
          pieData.someEllipseMethodArgs.radiusX,
          pieData.someEllipseMethodArgs.radiusY,
          pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
          slice.startAngleOnEllipseClockwise,
          slice.endAngleOnEllipseClockwise,
          pieData.someEllipseMethodArgs.isCounterClockwise,
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
          !pieData.someEllipseMethodArgs.isCounterClockwise,
        );
        ctx.closePath();

        if (arg.action === 'fill') {
          ctx.fillStyle = slice.color;
          //console.log('filled');
          ctx.fill();
        //} else {
        //  //console.log('stroked');
        //  ctx.stroke();
        }
      }
    }

    function drawLeftSlice() {
      const edgeLineStartPointPropName = arg.isHeadsVisible ?
        'pointHeads' : 'pointTails';
      const edgeLineEndPointPropName = arg.isHeadsVisible ?
        'pointTails' : 'pointHeads';

      //console.log(edgeLineStartPointPropName, edgeLineEndPointPropName);
      ctx.beginPath();
      ctx.moveTo(pieData.edgeLeft[edgeLineStartPointPropName][0],
        pieData.edgeLeft[edgeLineStartPointPropName][1]);
      ctx.lineTo(pieData.edgeLeft[edgeLineEndPointPropName][0],
        pieData.edgeLeft[edgeLineEndPointPropName][1]);

      let centerPointPropName = arg.isHeadsVisible ?
        'centerTails' : 'centerHeads';
      //console.log(centerPointPropName);
      ctx.ellipse(
        pieData[centerPointPropName][0],
        pieData[centerPointPropName][1],
        pieData.someEllipseMethodArgs.radiusX,
        pieData.someEllipseMethodArgs.radiusY,
        pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
        Math.PI,
        sliceStart.endAngleOnEllipseClockwise,
        pieData.someEllipseMethodArgs.isCounterClockwise,
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
        !pieData.someEllipseMethodArgs.isCounterClockwise,
      );

      if (arg.action === 'fill') {
        ctx.fillStyle = sliceStart.color;
        //console.log('filled');
        ctx.fill();
      //} else {
      //  //console.log('stroked');
      //  ctx.stroke();
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
        pieData.someEllipseMethodArgs.isCounterClockwise,
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
