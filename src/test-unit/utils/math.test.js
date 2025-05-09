//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { getAngleClockwise } from '../../utils/math.js';

//test data angles are measured counter clockwise
tp.test((t) => {
  //angle 0
  const actual = getAngleClockwise({
    startPoint: [1, 0, 0],
    endPoint: [1, 0, 0],
    centerPoint: [0, 0, 0],
  });
  t.equal(actual, 0);
  t.end();
});

tp.test((t) => {
  //angle 45deg
  const actual = getAngleClockwise({
    startPoint: [1, 0, 0],
    endPoint: [1, 1, 0],
    centerPoint: [0, 0, 0],
  });
  t.equal(actual, Math.PI / 4);
  t.end();
});

tp.test((t) => {
  //angle 90deg
  const actual = getAngleClockwise({
    startPoint: [1, 0, 0],
    endPoint: [0, 1, 0],
    centerPoint: [0, 0, 0],
  });
  t.equal(actual, Math.PI / 2);
  t.end();
});

tp.test((t) => {
  //angle 135deg
  const actual = getAngleClockwise({
    startPoint: [1, 0, 0],
    endPoint: [-1, 1, 0],
    centerPoint: [0, 0, 0],
  });
  t.equal(actual, 3 * Math.PI / 4);
  t.end();
});

tp.test((t) => {
  //angle 180deg
  const actual = getAngleClockwise({
    startPoint: [1, 0, 0],
    endPoint: [-1, 0, 0],
    centerPoint: [0, 0, 0],
  });
  t.equal(actual, Math.PI);
  t.end();
});

tp.test((t) => {
  //angle 225deg
  const actual = getAngleClockwise({
    startPoint: [1, 0, 0],
    endPoint: [-1, -1, 0],
    centerPoint: [0, 0, 0],
  });
  t.equal(actual, Math.PI + Math.PI / 4);
  t.end();
});

tp.test((t) => {
  //angle 270deg
  const actual = getAngleClockwise({
    startPoint: [1, 0, 0],
    endPoint: [0, -1, 0],
    centerPoint: [0, 0, 0],
  });
  t.equal(actual, Math.PI / 2 * 3);
  t.end();
});

tp.test((t) => {
  //angle 315deg
  const actual = getAngleClockwise({
    startPoint: [1, 0, 0],
    endPoint: [1, -1, 0],
    centerPoint: [0, 0, 0],
  });
  t.equal(actual, 2 * Math.PI / 8 * 7);
  t.end();
});
