import { appendFileSync } from "fs";
import { resolve } from "path";
import { getCurrentDir, toPascalCase } from "./helpers";

export default (iconFile: string, iconPackage: string = 'react') => {
  const currentDir = getCurrentDir(import.meta.url);
  const targetDir = resolve(currentDir, `../../packages/${iconPackage}/icons`);

  const importIconString = `export {default as  ${toPascalCase(
    iconFile
  )}} from './${toPascalCase(iconFile)}';\n`;

  appendFileSync(resolve(targetDir, "index.ts"), importIconString, "utf-8");
};
