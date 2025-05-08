//@flow strict
//$FlowFixMe[cannot-resolve-module]
import stringifyAny from 'stringify-any';
import fs from 'fs';

type Arg = {
  //$FlowExpectedError[unclear-type] user is allowed to pass anything here
  actual: any,
  //$FlowExpectedError[unclear-type] user is allowed to pass anything here
  expected: any,
}

export function writeToTestDiffDir(arg: Arg) {
  const actStr = stringifyAny(arg.actual);
  fs.writeFileSync(`./test/diff/actual.txt`, actStr);
  const expStr = stringifyAny(arg.expected);
  fs.writeFileSync(`./test/diff/expected.txt`, expStr);
}
