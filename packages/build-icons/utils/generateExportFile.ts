import { getCurrentDir, toPascalCase } from "@mni/build-tools";
import { appendFileSync } from "fs";
import { resolve } from "path";

export default (iconFile: string, pkg: string = 'react') => {
  const currentDir = getCurrentDir(import.meta.url);
  const targetDir = resolve(currentDir, `../../../${pkg}/icons`)

  const importIconString = `export {default as  ${toPascalCase(
    iconFile
  )}} from './${toPascalCase(iconFile)}';\n`;



  appendFileSync(resolve(targetDir, `index.ts`), importIconString, "utf-8");
};
