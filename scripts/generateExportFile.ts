import { appendFileSync } from "fs";
import { IconNode } from "../packages/react/src/createMeisterIcons";
import { getCurrentDir, toPascalCase } from "./helpers";
import { resolve } from "path";

export default (iconFile: string) => {
  const currentDir = getCurrentDir(import.meta.url);
  const targetDir = resolve(currentDir, "../../packages/vue-latest/icons");

  const importIconString = `export {default as  ${toPascalCase(
    iconFile
  )}} from './${toPascalCase(iconFile)}';\n`;

  appendFileSync(resolve(targetDir, "index.ts"), importIconString, "utf-8");
};
