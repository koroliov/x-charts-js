//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { getAngleBetweenTwoPoints, } from '../../utils/math.js';

//clockwise angles
tp.test((t) => {
  //angle 0
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [1, 0, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: false,
  });
  t.equal(actual, 0);
  t.end();
});

tp.test((t) => {
  //angle 45deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [1, 1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: false,
  });
  t.equal(actual, Math.PI / 4);
  t.end();
});

tp.test((t) => {
  //angle 90deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [0, 1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: false,
  });
  t.equal(actual, Math.PI / 2);
  t.end();
});

tp.test((t) => {
  //angle 135deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [-1, 1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: false,
  });
  t.equal(actual, 3 * Math.PI / 4);
  t.end();
});

tp.test((t) => {
  //angle 180deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [-1, 0, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: false,
  });
  t.equal(actual, Math.PI);
  t.end();
});

tp.test((t) => {
  //angle 225deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [-1, -1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: false,
  });
  t.equal(actual, Math.PI + Math.PI / 4);
  t.end();
});

tp.test((t) => {
  //angle 270deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [0, -1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: false,
  });
  t.equal(actual, Math.PI / 2 * 3);
  t.end();
});

tp.test((t) => {
  //angle 315deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [1, -1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: false,
  });
  t.equal(actual, 2 * Math.PI / 8 * 7);
  t.end();
});

//counter clockwise angles
tp.test((t) => {
  //angle 0
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [1, 0, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: true,
  });
  t.equal(actual, 0);
  t.end();
});

tp.test((t) => {
  //angle 315deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [1, 1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: true,
  });
  t.equal(actual, 2 * Math.PI - Math.PI / 4);
  t.end();
});

tp.test((t) => {
  //angle 270deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [0, 1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: true,
  });
  t.equal(actual, 3 / 2 * Math.PI);
  t.end();
});

tp.test((t) => {
  //angle 225deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [-1, 1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: true,
  });
  t.equal(actual, 5 / 4 * Math.PI);
  t.end();
});

tp.test((t) => {
  //angle 180deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [-1, 0, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: true,
  });
  t.equal(actual, Math.PI);
  t.end();
});

tp.test((t) => {
  //angle 135deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [-1, -1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: true,
  });
  t.equal(actual, 3 / 4 * Math.PI);
  t.end();
});

tp.test((t) => {
  //angle 90deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [0, -1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: true,
  });
  t.equal(actual, Math.PI / 2);
  t.end();
});

tp.test((t) => {
  //angle 45deg
  const actual = getAngleBetweenTwoPoints({
    startPoint: [1, 0, 0],
    endPoint: [1, -1, 0],
    centerPoint: [0, 0, 0],
    isCounterClockwise: true,
  });
  t.equal(actual, 1 / 4 * Math.PI);
  t.end();
});
