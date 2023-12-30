import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { getCurrentDir, toPascalCase } from "./helpers";

export default (iconNodes: object, targetDir: string, ext: string) => {
  const name = Object.keys(iconNodes)[0];
  const paths = Object.values(iconNodes)[0];

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
  writeFileSync(
    join(targetDir, `${toPascalCase(name)}.${ext}`),
    template,
    "utf-8"
  );
};
