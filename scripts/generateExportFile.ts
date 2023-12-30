import { appendFileSync } from "fs";
import { toPascalCase } from "./helpers";
import { resolve } from "path";

export default (iconFile: string, targetDir: string, ext: string) => {
  const importIconString = `export {default as  ${toPascalCase(
    iconFile
  )}} from './${toPascalCase(iconFile)}';\n`;

  appendFileSync(resolve(targetDir, `index.${ext}`), importIconString, "utf-8");
};
