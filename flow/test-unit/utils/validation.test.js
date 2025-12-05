//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { isObject, } from '../../src/utils/validation.js';

//isObject, true
tp.test('object literal', (t) => {
  const testVal = {};
  const actual = isObject(testVal);
  t.equal(actual, true);
  t.end();
});

tp.test('Object.create(null)', (t) => {
  const testVal = Object.create(null);
  const actual = isObject(testVal);
  t.equal(actual, true);
  t.end();
});

tp.test('wrong, but expected: proto set to null', (t) => {
  class Foo {}
  const testVal = new Foo();
  Object.setPrototypeOf(testVal, null);
  const actual = isObject(testVal);
  t.equal(actual, true);
  t.end();
});

tp.test('wrong, but expected: proto set to Object.prototype', (t) => {
  class Foo {}
  const testVal = new Foo();
  //In this case Flow doesn't allow to do it, righteously, but this is a test,
  //where I specifically want to check this case
  //$FlowFixMe[class-object-subtyping] reason for suppression
  Object.setPrototypeOf(testVal, Object.prototype);
  const actual = isObject(testVal);
  t.equal(actual, true);
  t.end();
});

//isObject, false
tp.test('primitive, string', (t) => {
  const testVal = 'foo';
  const actual = isObject(testVal);
  t.equal(actual, false);
  t.end();
});

tp.test('primitive, null', (t) => {
  const testVal = null;
  const actual = isObject(testVal);
  t.equal(actual, false);
  t.end();
});

tp.test('function', (t) => {
  const testVal = function() {};
  const actual = isObject(testVal);
  t.equal(actual, false);
  t.end();
});

tp.test('function with proto set to null', (t) => {
  const testVal = function() {};
  Object.setPrototypeOf(testVal, null);
  const actual = isObject(testVal);
  t.equal(actual, false);
  t.end();
});

tp.test('array', (t) => {
  const testVal: [] = [];
  const actual = isObject(testVal);
  t.equal(actual, false);
  t.end();
});

tp.test('array with proto set to null', (t) => {
  const testVal: [] = [];
  Object.setPrototypeOf(testVal, null);
  const actual = isObject(testVal);
  t.equal(actual, false);
  t.end();
});

tp.test('some instance', (t) => {
  class Foo {}
  const testVal = new Foo();
  const actual = isObject(testVal);
  t.equal(actual, false);
  t.end();
});
