import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { getCurrentDir, toPascalCase } from "./helpers";

export default (iconNodes: object, iconPackage: string = 'react') => {
  const name = Object.keys(iconNodes)[0];
  const paths = Object.values(iconNodes)[0];

  const currentDir = getCurrentDir(import.meta.url);
  const targetDir = resolve(currentDir, `../../packages/${iconPackage}/icons`);

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir);
  }

  const template = `
  import createMeisterIcons from '../src/createMeisterIcons';

  const ${toPascalCase(name)} = createMeisterIcons("${name}", ${JSON.stringify(
    paths
  )})


  export default ${toPascalCase(name)}
  `;
  writeFileSync(join(targetDir, `${toPascalCase(name)}.ts`), template, "utf-8");
};
