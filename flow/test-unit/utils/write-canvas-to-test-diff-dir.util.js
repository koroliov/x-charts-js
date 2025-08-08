//@flow strict
import fs from 'fs';

type Arg = {
  fileNameRelative: StringSuffix<'.png'> & StringPrefix<'./test/diff/'>,
  //$FlowIgnore[unclear-type]
  canvas: any,
}

export function writeCanvasToTestDiffDir(arg: Arg) {
  arg.canvas.toBuffer((err, buffer) => {
    if (err) {
      console.error(`Failed to write file ${ arg.fileNameRelative }`);
      throw err;
    }
    fs.writeFileSync(arg.fileNameRelative, buffer);
  }, 'image/png', 1);
}
