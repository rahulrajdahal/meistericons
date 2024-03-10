import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { getCurrentDir, toPascalCase } from "../index";

export default (iconNodes: (string | (string | Record<string, string>)[][])[], iconPackage: string = 'react') => {
  const name = (iconNodes)[0] as string;
  const paths = (iconNodes)[1];

  const currentDir = getCurrentDir(import.meta.url);
  const targetDir = path.resolve(currentDir, `../../../${iconPackage}/icons`);

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
  writeFileSync(path.join(targetDir, `${toPascalCase(name)}.ts`), template, "utf-8");
};
