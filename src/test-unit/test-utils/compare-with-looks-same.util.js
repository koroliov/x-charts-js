//@flow strict
//$FlowFixMe[cannot-resolve-module]
import looksSame from 'looks-same';
//$FlowFixMe[cannot-resolve-module]
import kleur from 'kleur';

type Arg = {
  buffer: Buffer,
  expectedFileNameRelative: string,
  highlightColor?: StringPrefix<'#'>,
  strict?: boolean,
  tolerance?: number,
  antialiasingTolerance?: number,
  ignoreAntialiasing?: boolean,
  ignoreCaret?: boolean,

  diffFileNameRelativeOnError: '' | string,
}

type ComparisonOptions = {
  ...Omit<Arg, 'buffer' | 'expectedFileNameRelative' |
    'diffFileNameRelativeOnError' >,
}

type DiffOptions = {
  current: Arg['buffer'],
  reference: Arg['expectedFileNameRelative'],
  diff: Arg['diffFileNameRelativeOnError'],
  ...ComparisonOptions,
}

export async function compareWithLooksSame(arg: Arg): Promise<boolean> {
  checkArg();
  const comparisonOptions = getComparisonOptions();
  let result = false;

  try {
    const { equal, } = await looksSame(arg.buffer, arg.expectedFileNameRelative,
      comparisonOptions);
    result = equal;
  } catch (e) {
    if (e?.nested?.code === 'ENOENT' &&
      e?.nested?.path === arg.expectedFileNameRelative) {
      const msg = `NO FILE ERROR, CHECK FILE: ${
        arg.expectedFileNameRelative } EXISTS`;
      console.log(kleur.red().bold(msg));
      throw new Error(msg);
    }
    throw e;
  }

  if (!result && arg.diffFileNameRelativeOnError) {
    await writeDiffFile();
  }
  return result;

  function checkArg() {
    checkDiffFileNameRelativeOnError();
    checkExpectedFileNameRelative();

    function checkExpectedFileNameRelative() {
      if (!arg.expectedFileNameRelative.startsWith('./test/unit-permanent/') ||
        !arg.expectedFileNameRelative.endsWith('.png')) {
        const msg = [
          `File name in expectedFileNameRelative, must start with:`,
          ` './test/unit-permanent/'`,
          `and end with: '.png'`,
          `current: ${arg.expectedFileNameRelative}`,
        ].join('\n');
        console.log(kleur.red().bold(msg));
        throw new Error(msg);
      }
    }

    function checkDiffFileNameRelativeOnError() {
      if (arg.diffFileNameRelativeOnError === '') {
        return;
      }
      if (!arg.diffFileNameRelativeOnError.startsWith('./test/diff/') ||
        !arg.diffFileNameRelativeOnError.endsWith('.png')) {
        const msg = [
          `File name in diffFileNameRelativeOnError, must start with:`,
          ` './test/diff/'`,
          `and end with: '.png'`,
          `current: ${arg.diffFileNameRelativeOnError}`,
        ].join('\n');
        console.log(kleur.red().bold(msg));
        throw new Error(msg);
      }
    }
  }

  async function writeDiffFile() {
    const diffOptions: DiffOptions = {
      ...comparisonOptions,
      reference: arg.expectedFileNameRelative,
      current: arg.buffer,
      diff: arg.diffFileNameRelativeOnError,
    };
    await looksSame.createDiff(diffOptions);
  }

  function getComparisonOptions(): ComparisonOptions {
    if (arg.strict === true && Number.isFinite(arg.tolerance)) {
      throw new Error(`Can't use strict & tolerance in compareWithLooksSame()`);
    }
    const comparisonOptions: ComparisonOptions = {
      highlightColor: arg.highlightColor || '#ff00ff' /* purple */,
      strict: arg.strict === true ? true : false,
      tolerance: getTolerance(),
      antialiasingTolerance: Number.isFinite(arg.antialiasingTolerance) ?
      arg.antialiasingTolerance : 2.5,
      ignoreAntialiasing: arg.ignoreAntialiasing === false ? false : true,
      ignoreCaret: arg.ignoreCaret === false ? false : true,
    };
    return comparisonOptions;

    function getTolerance() {
      if (arg.strict !== true) {
        return Number.isFinite(arg.tolerance) ? arg.tolerance : 2.5;
      }
      return 0;
    }
  }
}
