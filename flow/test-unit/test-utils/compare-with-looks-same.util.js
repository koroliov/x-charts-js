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
  createDiffImage: boolean,
}

export async function compareWithLooksSame(arg: Arg): Promise<boolean> {
  checkArg();
  const comparisonOptions = getComparisonOptions();
  let result = false;

  try {
    const {
      equal,
      diffBounds,
      diffImage,
      differentPixels,
    } = await looksSame(arg.buffer,
      arg.expectedFileNameRelative, comparisonOptions);
    if (!equal && arg.diffFileNameRelativeOnError !== '') {
      showInfoMessageOnTestFailure({ diffBounds, differentPixels, });
      diffImage.save(arg.diffFileNameRelativeOnError);
    }
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

  return result;

  function showInfoMessageOnTestFailure(a: {
    //it's actuall an object, but for Flow to work, set it as string
    diffBounds: string,
    differentPixels: number,
  }) {
      console.log(
        kleur.blue().bold(`DIFF BOUNDS on image ${
          arg.diffFileNameRelativeOnError }:`),
        a.diffBounds,
        kleur.blue().bold('differentPixels:'),
        a.differentPixels
      );
  }

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

  function getComparisonOptions(): ComparisonOptions {
    if (arg.strict === true && Number.isFinite(arg.tolerance)) {
      throw new Error(`Can't use strict & tolerance in compareWithLooksSame()`);
    }
    const comparisonOptions: ComparisonOptions = {
      highlightColor: arg.highlightColor || '#ff00ff' /* purple */,
      strict: arg.strict === false ? false : true,
      antialiasingTolerance: Number.isFinite(arg.antialiasingTolerance) ?
        arg.antialiasingTolerance : 0,
      ignoreAntialiasing: arg.ignoreAntialiasing === true,
      ignoreCaret: arg.ignoreCaret === true,
      createDiffImage: arg.diffFileNameRelativeOnError !== '',
    };
    setTolerance();
    return comparisonOptions;

    function setTolerance() {
      if (comparisonOptions.strict !== true) {
        comparisonOptions.tolerance =
          Number.isFinite(arg.tolerance) ? arg.tolerance : 0;
      }
    }
  }
}
