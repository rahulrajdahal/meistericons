import { appendFileSync } from "fs";
import path from "path";
import { getCurrentDir, toPascalCase } from "./helpers";

export default (iconFile: string, pkg: string = 'react') => {
  const currentDir = getCurrentDir(import.meta.url);
  const targetDir = path.resolve(currentDir, `../../${pkg}/icons`)

  const importIconString = `export {default as  ${toPascalCase(
    iconFile
  )}} from './${toPascalCase(iconFile)}';\n`;



  appendFileSync(path.resolve(targetDir, `index.ts`), importIconString, "utf-8");
};
